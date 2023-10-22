const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// configure .env file
dotenv.config();

// connect to the databse
connectDB();

const PORT = 5001;
const app = express();

// allow us pass json data through the body
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// register user routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server listening at port:${PORT}`));
