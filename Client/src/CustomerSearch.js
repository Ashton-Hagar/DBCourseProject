import React, { useState } from "react";
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerSearch = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    chainName: "",
    hotelCategory: "",
    roomNumber: "",
    price: "",
  });

  const [hotelroomList, setHotelRoomList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const getHotelrooms = async (e) => {
    e.preventDefault();
    const capacity = searchParams.capacity;
    const price = searchParams.price;
    const roomNumber = searchParams.roomNumber;
    const chainName = searchParams.chainName;
    const startD = searchParams.startDate;
    const endD = searchParams.endDate;
    alert(
      roomNumber +
        "\n" +
        price +
        "\n" +
        capacity +
        "\n" +
        chainName +
        "\n" +
        startD +
        "\n" +
        endD
    );
    axios
      .get("http://localhost:5000/api/hotels", {
        params: { capacity, price, roomNumber, chainName, startD, endD },
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
                <input
                  type="text"
                  name="area"
                  value={searchParams.area}
                  onChange={handleChange}
                />
              </label>
              <label>
                Hotel Chain:
                <select
                  name="chainName"
                  value={searchParams.chainName}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="David's Place">David's Place</option>
                  <option value="Smiley's Place">Smiley's Place</option>
                  <option value="Chez Avion">Chez Avion</option>
                  <option value="Ashton's Crib">Ashton's Crib</option>
                  <option value="Esquire Inn">Esquire Inn</option>
                  <option value="Ray's">Ray's</option>
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
                  name="numberOfRooms"
                  value={searchParams.roomNumber}
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
            {/* Render search results here */}
          </Col>
          <Col className="CustomerResults">
            <table>
              <thead>
              <tr>
                <th>RoomID</th>
                <th>RoomNumber</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Chain Name</th>
              </tr>
              </thead>
              <tbody>
              {hotelroomList.map((val, key) => {
                return (
                    <tr key={key}>
                      <td>{val.roomID}</td>
                      <td>{val.roomNumber}</td>
                      <td>{val.capacity}</td>
                      <td>{val.price}</td>
                      <td>{val.chainName}</td>
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

export default CustomerSearch;
