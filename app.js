require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const { router } = require("./routes/todos");
const authRoutes = require("./routes/auth");
const healthRoute = require("./routes/health");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/todos", router);
app.use("/auth", authRoutes);
app.use("/health", healthRoute);

connectDB();

app.listen(port, () => {
  console.log("Server is listening at http://localhost:", port);
});
