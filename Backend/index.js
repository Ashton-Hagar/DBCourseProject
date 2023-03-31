const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // To enable CORS (Cross-Origin Resource Sharing)

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DBProject",
  database: "hotels",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

//For Employee login authentication
app.post("/api/employee", (req, res) => {
  const { firstName, SSN } = req.body;
  const query = "SELECT * FROM employee WHERE firstName = ? AND SSN = ?";
  connection.query(query, [firstName, SSN], (error, results) => {
    if (error) {
      console.log("error");
      res.status(500).json({ error: "An error occurred while logging in." });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful." });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  });
});

//For Customer login auth
app.post("/api/customer", (req, res) => {
  const { firstName, SSN } = req.body;
  const query = "SELECT * FROM customer WHERE firstName = ? AND SSN = ?";
  connection.query(query, [firstName, SSN], (error, results) => {
    if (error) {
      console.log("error");
      res.status(500).json({ error: "An error occurred while logging in." });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful." });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  });
});

app.post("/api/admin-login", (req, res) => {
  const { firstName } = req.body;
  const password = "password";

  //password functionality temporarily disabled. Log in with any password.

  if (firstName === password) {
    res.status(200).json({ message: "Login successful." });
  } else {
    res.status(401).json({ error: "Invalid username or password." });
  }
});

app.get("/api/hotels", (req, res) => {
  const { capacity, price, roomNumber, chainName, startD, endD } = req.query;

  const conditions = [];
  const values = [];

  if (startD & endD) {
    conditions.push(
      "NOT roomID = (SELECT roomID FROM hotels.bookings WHERE (hotels.bookings.startDate < startD = ? < hotels.bookings.endDate) OR (hotels.bookings.endDate > endD = ? > hotels.bookings.startDate)) AND (SELECT roomID FROM hotels.rentings WHERE (hotels.rentings.startDate < startD = ? < hotels.rentings.endDate) OR (hotels.rentings.endDate > endD = ? > hotels.rentings.startDate))"
    );
  }

  if (capacity) {
    conditions.push("capacity = ?");
    values.push(capacity);
  }
  if (price) {
    conditions.push("price = ?");
    values.push(price);
  }
  if (roomNumber) {
    conditions.push("roomNumber = ?");
    values.push(roomNumber);
  }
  if (chainName) {
    conditions.push("chainName = ?");
    values.push(chainName);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  const query = `SELECT * FROM hotels.hotelRoom RIGHT JOIN hotels.hotel ON hotels.hotelRoom.addy=hotels.hotel.addy ${whereClause}`;
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
