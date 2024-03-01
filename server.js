const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const nodemailer = require("nodemailer");

require("dotenv").config();

// Middleware Example: Serving static files from a directory named 'public'
app.use(express.static("public")); // Make sure this directory exists and contains your 'index.html'
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // If using express.static middleware correctly, this route can be omitted for serving 'index.html'
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("Data received");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Use the environment variable for email
      pass: process.env.PASSWORD, // Use the environment variable for password
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "websiteofbobby@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
