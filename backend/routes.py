from flask import request, jsonify
from app import app, db
from models import Customer, Reservation
from datetime import datetime
import random
import re

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def get_available_table(time_slot):
    """Find an available table for the given time slot"""
    # Get all reserved tables for the time slot
    reserved_tables = db.session.query(Reservation.table_number).filter(
        Reservation.time_slot == time_slot,
        Reservation.status == 'confirmed'
    ).all()
    
    reserved_table_numbers = [table[0] for table in reserved_tables]
    
    # Find available tables (1-30)
    all_tables = list(range(1, 31))
    available_tables = [table for table in all_tables if table not in reserved_table_numbers]
    
    if available_tables:
        return random.choice(available_tables)
    return None

@app.route('/api/newsletter', methods=['POST'])
def newsletter_signup():
    """Handle newsletter signup"""
    try:
        data = request.get_json()
        
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        email = data['email'].strip().lower()
        
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if customer already exists
        existing_customer = Customer.query.filter_by(email_address=email).first()
        
        if existing_customer:
            # Update newsletter signup status
            existing_customer.newsletter_signup = True
            db.session.commit()
            return jsonify({'message': 'Successfully subscribed to newsletter'}), 200
        else:
            # Create new customer for newsletter
            new_customer = Customer(
                customer_name='Newsletter Subscriber',
                email_address=email,
                newsletter_signup=True
            )
            db.session.add(new_customer)
            db.session.commit()
            return jsonify({'message': 'Successfully subscribed to newsletter'}), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/reservations', methods=['POST'])
def make_reservation():
    """Handle reservation requests"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['customerName', 'email', 'timeSlot', 'numberOfGuests']
        for field in required_fields:
            if not data or field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        customer_name = data['customerName'].strip()
        email = data['email'].strip().lower()
        time_slot_str = data['timeSlot']
        number_of_guests = int(data['numberOfGuests'])
        phone_number = data.get('phoneNumber', '').strip()
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate number of guests
        if number_of_guests < 1 or number_of_guests > 8:
            return jsonify({'error': 'Number of guests must be between 1 and 8'}), 400
        
        # Parse time slot
        try:
            time_slot = datetime.fromisoformat(time_slot_str.replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'error': 'Invalid time slot format'}), 400
        
        # Check if time slot is in the past
        if time_slot < datetime.now():
            return jsonify({'error': 'Cannot make reservations for past dates'}), 400
        
        # Find available table
        available_table = get_available_table(time_slot)
        if not available_table:
            return jsonify({'error': 'No tables available for the selected time slot'}), 400
        
        # Check if customer exists, create if not
        customer = Customer.query.filter_by(email_address=email).first()
        if not customer:
            customer = Customer(
                customer_name=customer_name,
                email_address=email,
                phone_number=phone_number if phone_number else None,
                newsletter_signup=False
            )
            db.session.add(customer)
            db.session.flush()  # Get the customer_id
        else:
            # Update customer info if provided
            customer.customer_name = customer_name
            if phone_number:
                customer.phone_number = phone_number
        
        # Create reservation
        reservation = Reservation(
            customer_id=customer.customer_id,
            time_slot=time_slot,
            table_number=available_table,
            number_of_guests=number_of_guests,
            status='confirmed'
        )
        
        db.session.add(reservation)
        db.session.commit()
        
        return jsonify({
            'message': 'Reservation confirmed successfully',
            'reservationId': reservation.reservation_id,
            'tableNumber': available_table,
            'timeSlot': time_slot.isoformat(),
            'numberOfGuests': number_of_guests
        }), 201
        
    except ValueError as e:
        return jsonify({'error': 'Invalid input data'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    """Get reservation details"""
    try:
        reservation = Reservation.query.get(reservation_id)
        if not reservation:
            return jsonify({'error': 'Reservation not found'}), 404
        
        return jsonify(reservation.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Cafe Fausse API is running'}), 200
