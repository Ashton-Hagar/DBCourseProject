import React, { useState } from "react";
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [customerCredentials, setCustomerCredentials] = useState({
    firstName: "",
    SSN: "",
  });
  const [employeeCredentials, setEmployeeCredentials] = useState({
    firstName: "",
    SSN: "",
  });
  const [adminCredentials, setAdminCredentials] = useState({
    firstName: ""
    //SSN: "",
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleChangeCus = (event) => {
    const { name, value } = event.target;
    setCustomerCredentials({ ...customerCredentials, [name]: value });
  };
  const handleChangeEmp = (event) => {
    const { name, value } = event.target;
    setEmployeeCredentials({ ...employeeCredentials, [name]: value });
  };

  const handleChangeAdm = (event) => {
    const { name, value } = event.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };
  const handleSubmitEmp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee",
        employeeCredentials
      );
      console.log(response.data.message);
      navigate("/EmployeeSearch");
    } catch (err) {
      alert("First name or SSN is incorrect");
      setError(err.response.data.error);
    }
  };

  const handleSubmitCus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer",
        customerCredentials
      );
      navigate("/CustomerSearch");
      console.log(response.data.message);
    } catch (err) {
      alert("First name or SSN is incorrect");
      setError(err.response.data.error);
    }
  };

  //admin login submit action
  const handleSubmitAdm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "http://localhost:5000/api/admin-login",
          adminCredentials
      );
      navigate("/AdminSearch");
      console.log(response.data.message);
    } catch (err) {
      alert("incorrect password. Please try again.");
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <form onSubmit={handleSubmitCus}>
              <h1>Customer Login </h1>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={customerCredentials.firstName}
                  onChange={handleChangeCus}
                />
              </label>
              <label>
                SSN:
                <input
                  type="text"
                  name="SSN"
                  value={customerCredentials.SSN}
                  onChange={handleChangeCus}
                />
              </label>
              <Button type="submit">Submit</Button>
            </form>
          </Col>

          <Col>
            <form onSubmit={handleSubmitEmp}>
              <h1>Employee Login</h1>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={employeeCredentials.firstName}
                  onChange={handleChangeEmp}
                />
              </label>
              <label>
                SSN:
                <input
                  type="text"
                  name="SSN"
                  value={employeeCredentials.SSN}
                  onChange={handleChangeEmp}
                />
              </label>
              <Button type="submit">Submit</Button>
            </form>
          </Col>
          <Col>
            <form onSubmit={handleSubmitAdm}>
              <h1>Admin Login</h1>
              <label>
                Password:
                <input
                  type="text"
                  name="firstName"
                  value={adminCredentials.firstName}
                  onChange={handleChangeAdm}
                />
              </label>
              <Button type="submit">Submit</Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
