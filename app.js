const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Handle 404 respone
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route nào được định nghĩa
  // Khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

// Xác định middleware xử lý lỗi cuối cùng, sau các lời gọi app.use() và các tuyến đường khác
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung
  // Trong các đoạn code xử lý ở các route, gọi next(err) sẽ chuyển về middleware xử lý lỗi này
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

module.exports = app;
