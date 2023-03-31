const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors()); // To enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());
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

//Customer Search required params: These criteria should be:
//the dates (start, end) of booking or renting, the room capacity, the area, the hotel chain, the
//category of the hotel, the total number of rooms in the hotel, the price of the rooms
app.get("/api/hotels", (req, res) => {
  const { capacity, price, chainName, startD, endD, area, rating, roomCount } =
    req.query;

  const conditions = [];
  const values = [];

  if (startD & endD) {
    conditions.push(
      "NOT roomID = (SELECT roomID FROM hotels.bookings WHERE (hotels.bookings.startDate < startD = ? < hotels.bookings.endDate) OR (hotels.bookings.endDate > endD = ? > hotels.bookings.startDate)) AND (SELECT roomID FROM hotels.rentings WHERE (hotels.rentings.startDate < startD = ? < hotels.rentings.endDate) OR (hotels.rentings.endDate > endD = ? > hotels.rentings.startDate))"
    );
    values.push(startD);
    values.push(endD);
  }

  if (capacity) {
    conditions.push("capacity = ?");
    values.push(capacity);
  }
  if (price) {
    conditions.push("(SELECT CAST(? AS DECIMAL(10,2)) AS price) >= price");
    values.push(price);
  }
  if (area) {
    conditions.push("area = ?");
    values.push(area);
  }
  if (rating) {
    conditions.push("rating = ?");
    values.push(rating);
  }
  if (roomCount) {
    conditions.push("roomCount = ?");
    values.push(roomCount);
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

app.get("/api/getbookings", (req, res) => {
  const query = "SELECT * FROM bookings";
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

//Getting CustomerID
app.get("/api/customer", (req, res) => {
  const { firstName, lastName } = req.query;
  const query = "SELECT * FROM customer WHERE firstName = ? AND lastName = ?";
  connection.query(query, [firstName, lastName], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/bookingss", (req, res) => {
  const query = "SELECT MAX(bookingID) as max_value FROM bookings";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/bookings", (req, res) => {
  const startD = req.body.startD;
  const roomID = req.body.roomID;
  const customerID = req.body.customerID;
  const endD = req.body.endD;
  const bookingID = req.body.bookingID;

  connection.query(
    "INSERT INTO bookings (roomID,customerID,startDate,endDate,bookingID) VALUES (?,?,?,?,?)",
    [roomID, customerID, startD, endD, bookingID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
