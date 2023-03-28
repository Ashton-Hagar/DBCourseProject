import React, { useState } from "react";
import "./CustomerSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const [loginParams, setLogin] = useState({
    firstName: "",
    SSN: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...loginParams, [name]: value });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <form>
              <label>
                First Name:
                <input
                  type="name"
                  name="firstName"
                  value={loginParams.firstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                SSN:
                <input
                  type="SSN"
                  name="SSN"
                  value={loginParams.SSN}
                  onChange={handleChange}
                />
              </label>
              <Button
                onClick={() => {
                  navigate("/EmployeeSearch");
                }}
              >
                EmployeePage
              </Button>
              <Button
                onClick={() => {
                  navigate("/CustomerSearch");
                }}
              >
                CustomerPage
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
