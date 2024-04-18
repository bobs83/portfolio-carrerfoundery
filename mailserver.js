var express = require("express");
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

var cors = require("cors");
var app = express();
var server = http.Server(app);
var port = 800;

require("dotenv").config();
app.use(cors());
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static()); // Serve files from the root directory

//Routing
app.get("/", function (req, res) {
  res.sendFile(path.join("index.html")); // Send index.html file
  console.log("Sent index.html");
});

app.post("/send_email", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "websiteofbobby@gmail.com",
      pass: "yltz hyus whbg ossp",
      // user: process.env.EMAIL, // Use the environment variable for email
      // pass: process.env.PASSWORD, // Use the environment variable for password
    },
  });

  const mailOptions = {
    from: email,
    to: "websiteofbobby@gmail.com",
    subject: `Message from ${name}: ${subject}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent");
    }
  });
});

server.listen(port, function () {
  console.log("Server is running on port " + port);
});
