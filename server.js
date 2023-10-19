const express = require("express");
const userRoutes = require("./routes/UserRoutes");

const PORT = 5001;
const app = express();

// register user routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server listening at port:${PORT}`));
