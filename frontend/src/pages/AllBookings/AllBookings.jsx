import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../components/AdminNavbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../AddHouse.css'; // Assuming you have a CSS file for additional styling

class AllBookings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: [], // Store the booking details
        };
    }

    componentDidMount() {
        // Fetch all booking details when the component mounts
        this.fetchAllBookings();
    }

    // Fetch all bookings from the API
    fetchAllBookings = () => {
        axios.get('http://127.0.0.1:5000/getBookingDetails')
            .then((response) => {
                console.log('Booking details:', response.data);
                this.setState({ bookings: response.data });
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    };

    // Confirm a booking
    confirmBooking = (bookingId) => {
        axios.post(`http://127.0.0.1:5000/confirmBooking/${bookingId}`)
            .then((response) => {
                console.log('Booking confirmed:', response.data);
                this.fetchAllBookings(); // Refresh the list after action
            })
            .catch((error) => {
                console.error('Error confirming booking:', error);
            });
    };

    // Delete a booking
    deleteBooking = (bookingId) => {
        axios.delete(`http://127.0.0.1:5000/deleteBooking/${bookingId}`)
            .then((response) => {
                console.log('Booking deleted:', response.data);
                this.fetchAllBookings(); // Refresh the list after deletion
            })
            .catch((error) => {
                console.error('Error deleting booking:', error);
            });
    };

    render() {
        const { bookings } = this.state;

        return (
            <div>
                <Navbar />
                <h4 style={{ marginLeft: 15 }}>All Bookings</h4>

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
                            <th>Actions</th>
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
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => this.confirmBooking(booking.booking_id)}
                                            style={{ marginRight: '10px' }}
                                            disabled={booking.status === "Confirmed"}  // Disable if status is confirmed
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.deleteBooking(booking.booking_id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AllBookings;
