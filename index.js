import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./Routes/UserRoutes.js";
import NotesRoutes from "./Routes/ContentRoutes.js"
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(express.json());


dotenv.config()
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/",(req,res)=>res.send("api is working"))
app.use("/api/auth", authRoute);
app.use("/api/notes", NotesRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

mongoose
  .connect("mongodb+srv://Shihadbh:Shihadbh964527@cluster0.uwsu7nh.mongodb.net/stickyNotes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connection Successful");
  })
  .catch((err) => {
    console.log(err.message, "DataBase Connection Failed");
  });

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


app.use((err,req,res,next)=>{
    res.status(500).json(err)
})

