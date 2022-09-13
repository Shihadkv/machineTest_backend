import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Users from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const Max_Age = 3 * 24 * 60 * 60;
const createTocken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Max_Age,
  });
};

// error handling middleware

const handleErrors = (err) => {

  let errors = { name: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is Already Registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//---- User Login ---- //
// @route POST -> /api/login
export const doLogin = async (req, res,next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    console.log(user,"userrr");
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("bcrypt");
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    //creating jwt token

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    const { password, ...otherDetails } = user._doc;
    console.log(password);

    console.log(otherDetails, "otherDetails");

    res
      .cookie("acces_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
};

//--User Registration--//
// @route POST -> /api/register
export const register = async (req, res, next) => {
  try {
    console.log(req.body);

    console.log("hssasasa");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Users({
      name: req.body.name,
    
      password: hash,
      
      email: req.body.email,
      
    });
    const userEmail = await Users.findOne({ email: req.body.email });
    console.log(userEmail);
    if (userEmail) {
      return res.status(400).json("email already exists");
    } else {
      console.log("saved");
      await newUser.save();
    }

    res.status(201).json("user is created");
  } catch (err) {
    next(err);
  }
};

export const CheckEmail = async (req, res, next) => {
  console.log("checkinggg");
  try {
    const Email = await Users.findOne({ email: req.body.email });
    if (Email) {
      return res.status(400).json("email already exists");
    }
  } catch (err) {
    next(err);
  }
};
