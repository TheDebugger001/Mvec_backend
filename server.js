const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./src/routes/auth.routes");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));

app.get("/", (req, res) => {
  res.json({
    message: "Multi-Vendor E-Commerce API is working!",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});