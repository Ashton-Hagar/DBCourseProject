import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminSearch() {
    const [bookings, setBookings] = useState([]);
    const [roomID, setRoomID] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        axios.get("localhost:5000/api/adminbookings")
            .then((res) => {
            setBookings(res.data);
        });
    }, []);

    const addBooking = () => {
        axios.post("localhost:5000/api/adminbookings", { roomID, customerID, startDate, endDate})
            .then((res) => {
                setBookings([...bookings, res.data]);
        });
    };

    const deleteBooking = (id) => {
        axios.delete(`localhost:5000/api/adminbookings/${id}`)
            .then(() => {
            setBookings(bookings.filter((booking) => booking.bookingID !== id));
        });
    };

    const refreshBooking = () => {
        axios
            .get("localhost:5000/api/adminbookings")
            .then((res) => {
            setBookings(res.data);
        });
    }

    return (
        <div>
            <h1>Bookings</h1>
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
                {bookings.map((booking) => (
                    <tr key={booking.bookingID}>
                        <td>{booking.roomID}</td>
                        <td>{booking.customerID}</td>
                        <td>{booking.startDate}</td>
                        <td>{booking.endDate}</td>
                        <td>
                            <button onClick={() => deleteBooking(booking.bookingID)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                    <button onClick={() => refreshBooking()}>
                        Refresh Bookings
                    </button>
                </tbody>
            </table>
            <h2>Add Booking</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Room ID:
                    <input
                        type="text"
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                </label>
                <label>
                    Customer ID:
                    <input
                        type="text"
                        value={customerID}
                        onChange={(e) => setCustomerID(e.target.value)}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={addBooking}>Add Booking</button>
            </form>
        </div>
    );
}

export default AdminSearch;
