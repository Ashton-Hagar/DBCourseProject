import React, { useState } from "react";
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
const CustomerSearch = () => {
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    hotelChain: "",
    hotelCategory: "",
    numberOfRooms: "",
    maxPrice: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = (event) => {};

  return (
    <div className="CustomerSearchPage">
      <Container>
        <Row>
          <Col>
            <form onSubmit={handleSubmit}>
              <h2>Search Rooms</h2>
              <label>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={searchParams.startDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                End Date:
                <input
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
                <input
                  type="text"
                  name="hotelChain"
                  value={searchParams.hotelChain}
                  onChange={handleChange}
                />
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
                  value={searchParams.numberOfRooms}
                  onChange={handleChange}
                />
              </label>
              <label>
                Max Price:
                <input
                  type="number"
                  name="maxPrice"
                  value={searchParams.maxPrice}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Search</button>
            </form>
            {/* Render search results here */}
          </Col>
          <Col>
            <Table striped bordered hover className="TableOfHotels">
              <tr>
                <th>c1</th>
                <th>c2</th>
                <th>c3</th>
                <th>c4</th>
                <th>c5</th>
              </tr>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerSearch;
