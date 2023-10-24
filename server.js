const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

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

// for deployment
if (process.env.NODE_ENV === "production") {
  // set build folder to static
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // point any route to index.html in static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, () => console.log(`Server listening at port:${PORT}`));
