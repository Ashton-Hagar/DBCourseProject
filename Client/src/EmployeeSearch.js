import React, { useState } from "react";
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Alert } from "bootstrap";

const EmployeeSearch = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    chainName: "",
    hotelCategory: "",
    numRooms: "",
    price: "",
  });

  const [bookingParams, setbookingParams] = useState({
    roomID: "",
    firstName: "",
    lastName: "",
    customerID: "",
    bookingID: "",
  });

  const [hotelroomList, setHotelRoomList] = useState([]);

  const [CustomerID, setCustomerID] = useState([]);
  const [bookingID, setBookingID] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleChangeBooking = (event) => {
    const { name, value } = event.target;
    setbookingParams({ ...bookingParams, [name]: value });
  };

  const findBooking = async (e) => {
    e.preventDefault();
    const firstName = bookingParams.firstName;
    const lastName = bookingParams.lastName;

    axios
      .get("http://localhost:5000/api/customer", {
        params: {
          firstName,
          lastName,
        },
      })
      .then((response) => {
        setCustomerID(response.data);
      });

    axios.get("http://localhost:5000/api/bookingss", {}).then((response) => {
      setBookingID(response.data);
    });
  };

  const createBooking = async (e) => {
    e.preventDefault();
    const startD = searchParams.startDate;
    const endD = searchParams.endDate;
    const roomID = bookingParams.roomID;
    const customerID = bookingParams.customerID;
    const bookingID = bookingParams.bookingID;
    axios
      .post("http://localhost:5000/api/bookings", {
        startD: startD,
        endD: endD,
        roomID: parseInt(roomID),
        customerID: parseInt(customerID),
        bookingID: parseInt(bookingID),
      })
      .then(() => {
        console.log("success");
      });
  };

  const getHotelrooms = async (e) => {
    e.preventDefault();
    const capacity = searchParams.capacity;
    const price = searchParams.price;
    const roomCount = searchParams.numRooms;
    const chainName = searchParams.chainName;
    const startD = searchParams.startDate;
    const endD = searchParams.endDate;
    const rating = searchParams.hotelCategory;
    const area = searchParams.area;
    axios
      .get("http://localhost:5000/api/hotels", {
        params: {
          capacity,
          price,
          roomCount,
          chainName,
          startD,
          endD,
          rating,
          area,
        },
      })
      .then((response) => {
        setHotelRoomList(response.data);
      });
  };

  return (
    <div className="CustomerSearchPage">
      <Container>
        <Row>
          <Col>
            <form onSubmit={getHotelrooms}>
              <h2>Search Rooms</h2>
              <label>
                Start Date:
                <input
                  format="dd-mm-yyyy"
                  type="date"
                  name="startDate"
                  value={searchParams.startDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                End Date:
                <input
                  format="dd-mm-yyyy"
                  type="date"
                  name="endDate"
                  value={searchParams.endDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Capacity:
                <input
                  type="number"
                  name="capacity"
                  value={searchParams.capacity}
                  onChange={handleChange}
                />
              </label>
              <label>
                Area:
                <select
                  name="area"
                  value={searchParams.area}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="Downtown">Downtown</option>
                  <option value="Centretown">Centretown</option>
                  <option value="Little Poland">Little Poland</option>
                  <option value="Western Acres">Western Acres</option>
                </select>
              </label>
              <label>
                Hotel Chain:
                <select
                  name="chainName"
                  value={searchParams.chainName}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="Chez Avion">Chez Avion</option>
                  <option value="Joe's Hotel">Joe's Hotel</option>
                  <option value="Shack-up">Shack-up</option>
                  <option value="Polish Lodging">Polish Lodging</option>
                  <option value="Wayne Gretzky Lodge">
                    Wayne Gretzky Lodge
                  </option>
                </select>
              </label>
              <label>
                Hotel Category:
                <input
                  type="number"
                  name="hotelCategory"
                  value={searchParams.hotelCategory}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Rooms:
                <input
                  type="number"
                  name="numRooms"
                  value={searchParams.numRooms}
                  onChange={handleChange}
                />
              </label>
              <label>
                Max Price:
                <input
                  type="number"
                  name="price"
                  value={searchParams.price}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Search</button>
            </form>
            <form onSubmit={createBooking}>
              <h2>Create Booking:</h2>
              <label>
                Room ID:
                <input
                  type="number"
                  name="roomID"
                  value={bookingParams.roomID}
                  onChange={handleChangeBooking}
                />
              </label>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={bookingParams.firstName}
                  onChange={handleChangeBooking}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={bookingParams.lastName}
                  onChange={handleChangeBooking}
                />
              </label>
              <button onClick={findBooking}>Find Customer ID</button>
              <p>
                CID:
                {CustomerID.map((val, key) => {
                  return <div>{val.customerID}</div>;
                })}
                <break> </break>
                BookingID:
                {bookingID.map((val, key) => {
                  return <div>{val.max_value + 1}</div>;
                })}
              </p>
              <label>
                Customer ID
                <input
                  type="text"
                  name="customerID"
                  value={bookingParams.customerID}
                  onChange={handleChangeBooking}
                />
              </label>
              <label>
                BookingID
                <input
                  type="text"
                  name="bookingID"
                  value={bookingParams.bookingID}
                  onChange={handleChangeBooking}
                />
              </label>
              <button type="submit">Create Booking</button>
            </form>
          </Col>
          <Col className="CustomerResults">
            <table>
              <thead>
                <tr>
                  <th>RoomID</th>
                  <th>RoomCount</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Chain Name</th>
                  <th>Rating</th>
                  <th>Area</th>
                </tr>
              </thead>
              <tbody>
                {hotelroomList.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.roomID}</td>
                      <td>{val.roomCount}</td>
                      <td>{val.capacity}</td>
                      <td>{val.price}</td>
                      <td>{val.chainName}</td>
                      <td>{val.rating}</td>
                      <td>{val.area}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployeeSearch;
