const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// import routes
const scheduleRoutes = require("./routes/schedules");
const userRoutes = require("./routes/AuthRoutes");
const packageRoutes = require("./routes/Packages");
const productRoutes = require("./routes/Products");
const paymentRoutes = require("./routes/Payments");
const salaryRoutes = require("./routes/Salaries");
const activePackRoutes = require("./routes/ActivePack");
const TrainersRoutes = require("./routes/Trainers");
const PackPayRoutes = require("./routes/PackPayment");
//create instant and set port number
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/gym_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// User Schema and Model
const User = require("./models/User");
const schedule = require("./models/Schedule");
app.use("/api/schedules", scheduleRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/active-pack", activePackRoutes);
app.use("/api", TrainersRoutes);
app.use("/api", salaryRoutes);
app.use("/api/packpay/", PackPayRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
