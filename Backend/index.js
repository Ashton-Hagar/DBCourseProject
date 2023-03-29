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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
