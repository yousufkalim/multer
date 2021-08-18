const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route
app.post("/", upload.single("image"), (req, res) => {
  console.log("Request ---------> ", req.body);
  res.json({ ...req.body, image: req.file.path });
});

app.listen(4000, () => console.log("Server is running"));
