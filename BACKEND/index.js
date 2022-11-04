//PRESENTED BY EMEKA

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const Database = require("./database");
const app = express();

const salt = bcrypt.genSaltSync();
const port = process.env.PORT || 6060;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

const secretKey = process.env.SECRET_KEY;

//PRESENTED BY CAESAR

function createUserHandler(req, res) {
  const newUser = req.body;

  const { email, password } = newUser;
  if (email == "" || password == "") {
    res.status(401).json({
      success: false,
      message: "All fields are required",
    });
    return;
  }

  const userEmail = Database.users.filter(
    (user) => newUser.email === user.email
  );

  if (userEmail.length !== 0) {
    res.status(409).json({
      message: "This email is already registered!",
      success: false,
    });
  } else {
    const password = newUser.password;
    const hash = bcrypt.hashSync(password, salt);
    newUser.password = hash;
    Database.users.push(newUser);
    res.status(201).json({
      message: `Congrats ${newUser.firstName}, kindly proceed to login`,
      success: true,
    });
  }
}

//PRESENTED BY ISRAEL

let userLogin = (req, res) => {
  let { email, password } = req.body;
  if (email == "" || password == "") {
    res.status(401).json({
      success: false,
      message: "Email or Password cannot be empty!",
    });
  } else {
    let userExist = Database.users.find((user) => user.email === email);
    if (!userExist) {
      res.status(404).json({
        success: false,
        message: "Enter a valid Email or Password",
      });
    } else {
      // console.log(userExist);
      if (bcrypt.compareSync(password, userExist.password)) {
        const token = jwt.sign(
          {
            email,
          },
          secretKey,
          {
            expiresIn: "4d",
          }
        );

        res.status(200).json({
          success: true,
          message: `Welcome back ${userExist.firstName}`,
          token,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Enter a valid Email or Password",
        });
      }
    }
  }
};

//PRESENTED BY OKECHUKWU

function authMiddleWare(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secretKey);
    // console.log(decoded.email);
    // attaches the email to res object
    res.locals.email = decoded.email;
    // moves the request to the next middleware in line
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
}

//PRESENTED BY RUEBY

const getUser = (req, res) => {
  // gets the email from locals
  const email = res.locals.email;

  // gets the user from the database
  const usersData = Database.users.find((res) => res.email === email);

  if (usersData) {
    // console.log(Database.users);
    res.status(200).json({
      message: "User detail retrieved successfully",
      data: usersData,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found in the system",
    });
  }
};

app.get("/user", authMiddleWare, getUser);

app.post("/auth/signup", createUserHandler);

app.post("/auth/login", userLogin);

app.listen(port, () => console.log("Server started on port", port));
