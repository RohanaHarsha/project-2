import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../components/commen/navbar';
import Table from 'react-bootstrap/Table';
import '../AddHouse.css'; // Assuming you have a CSS file for additional styling

class MyBookings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: [], // Store the booking details
        };
    }

    componentDidMount() {
        // Get the user ID from localStorage and fetch booking details
            const sessionUserId = sessionStorage.getItem('userId');
            console.log("sessionUserId",sessionUserId)
        if (sessionUserId) {
            this.fetchBookings(sessionUserId);
        } else {
            console.error('User ID not found in localStorage.');
        }
    }

    fetchBookings = (sessionUserId) => {
        axios.get(`http://127.0.0.1:5000/getBookingDetailsByUser/${sessionUserId}`)
            .then((response) => {
                console.log('Booking details:', response.data);
                this.setState({ bookings: response.data });
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    };

    render() {
        const { bookings } = this.state;

        return (
            <div>
                <Navbar />
                <h4 style={{ marginLeft: 15 }}>My Bookings</h4>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booking ID</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>House Type</th>
                            <th>Key Word</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <tr key={booking.booking_id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.booking_id}</td>
                                    <td>{booking.booking_date}</td>
                                    <td>{booking.booking_time}</td>
                                    <td>{booking.houseType}</td>
                                    <td>{booking.keyWord}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MyBookings;
