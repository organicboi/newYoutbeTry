const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");

const app = express();
app.use(
  cors({
    origin: ["https://new-youtbe-try-frontend-dmq82nbdv-akshays-projects-eb66eb83.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(
  "mongodb+srv://amgakshaygaddi:p1rPrIFN3f59vJoc@cluster0.jfn9wmp.mongodb.net/test?retryWrites=true&w=majority"
);


app.get("/", (req, res) => {
  res.json("Hello");
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("Already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
