from app import db
from datetime import datetime

class Customer(db.Model):
    __tablename__ = 'customers'
    
    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    email_address = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    newsletter_signup = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with reservations
    reservations = db.relationship('Reservation', backref='customer', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'customer_id': self.customer_id,
            'customer_name': self.customer_name,
            'email_address': self.email_address,
            'phone_number': self.phone_number,
            'newsletter_signup': self.newsletter_signup,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Reservation(db.Model):
    __tablename__ = 'reservations'
    
    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='confirmed')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Add constraints
    __table_args__ = (
        db.CheckConstraint('table_number >= 1 AND table_number <= 30', name='check_table_number'),
        db.CheckConstraint('number_of_guests > 0', name='check_number_of_guests'),
    )
    
    def to_dict(self):
        return {
            'reservation_id': self.reservation_id,
            'customer_id': self.customer_id,
            'time_slot': self.time_slot.isoformat() if self.time_slot else None,
            'table_number': self.table_number,
            'number_of_guests': self.number_of_guests,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
