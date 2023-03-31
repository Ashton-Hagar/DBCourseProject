import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function AdminSearch() {
    const [roomID, setRoomID] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [bookings, setBookings] = useState([]);

    // Load bookings data from server on component mount
    useEffect(() => {
        axios.get('/bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.log(error));
    }, []);

    // Handler for add booking form submission
    const handleAddBookingSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomID: parseInt(roomID),
                    customerID: parseInt(customerID),
                    startDate,
                    endDate
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add booking');
            }
            const newBooking = await response.json();
            setBookings([...bookings, newBooking]);
            setRoomID('');
            setCustomerID('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error(error);
            alert('Failed to add booking');
        }
    };


    // Handler for delete booking button click
    function handleDeleteBookingClick(bookingID) {
        axios.delete(`/bookings/${bookingID}`)
            .then(() => {
                setBookings(bookings.filter(booking => booking.bookingID !== bookingID));
            })
            .catch(error => console.log(error));
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                <h2>Add Booking</h2>
                <form onSubmit={handleAddBookingSubmit}>
                    <label>
                        Room ID:
                        <input type="text" value={roomID} onChange={event => setRoomID(event.target.value)} />
                    </label>
                    <label>
                        Customer ID:
                        <input type="text" value={customerID} onChange={event => setCustomerID(event.target.value)} />
                    </label>
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={event => setStartDate(event.target.value)} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={event => setEndDate(event.target.value)} />
                    </label>
                    <button type="submit">Add Booking</button>
                </form>
            </div>
            <div style={{ width: '50%' }}>
                <h2>Bookings</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Room ID</th>
                        <th>Customer ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.bookingID}>
                            <td>{booking.roomID}</td>
                            <td>{booking.customerID}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.endDate}</td>
                            <td>
                                <button onClick={() => handleDeleteBookingClick(booking.bookingID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default AdminSearch;
