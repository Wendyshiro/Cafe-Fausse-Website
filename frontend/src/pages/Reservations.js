import React, { useState } from 'react';
import '../styles/Reservations.css';

const Reservations = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    timeSlot: '',
    numberOfGuests: 1
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Reservation confirmed! Table ${result.tableNumber} has been reserved for ${formData.numberOfGuests} guests.`);
        setFormData({
          customerName: '',
          email: '',
          phoneNumber: '',
          timeSlot: '',
          numberOfGuests: 1
        });
      } else {
        setMessage(result.error || 'Unable to make reservation. Please try a different time slot.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots for the next 30 days
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip past dates
      if (date < today) continue;
      
      const dateStr = date.toISOString().split('T')[0];
      
      // Restaurant hours: Mon-Sat 5PM-11PM, Sun 5PM-9PM
      const dayOfWeek = date.getDay();
      const endHour = dayOfWeek === 0 ? 21 : 23; // Sunday ends at 9PM, others at 11PM
      
      for (let hour = 17; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const datetime = `${dateStr}T${timeStr}`;
          const displayDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          const displayTime = new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          
          slots.push({
            value: datetime,
            label: `${displayDate} at ${displayTime}`
          });
        }
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="reservations">
      <div className="reservations-hero">
        <h1>Make a Reservation</h1>
        <p>Reserve your table for an unforgettable dining experience</p>
      </div>

      <div className="reservations-container">
        <div className="reservation-info">
          <h2>Reservation Information</h2>
          <div className="info-item">
            <h3>Hours</h3>
            <p>Monday - Saturday: 5:00 PM - 11:00 PM</p>
            <p>Sunday: 5:00 PM - 9:00 PM</p>
          </div>
          <div className="info-item">
            <h3>Contact</h3>
            <p>Phone: (202) 555-4567</p>
            <p>For parties of 8 or more, please call directly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          <h2>Reservation Details</h2>
          
          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="(Optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeSlot">Date & Time *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a date and time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfGuests">Number of Guests *</label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              required
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Processing...' : 'Make Reservation'}
          </button>

          {message && (
            <div className={`message ${message.includes('confirmed') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reservations;
