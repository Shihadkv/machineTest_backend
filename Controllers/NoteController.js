import mongoose from "mongoose";
import notes from "../Models/Notes.js";

export const doNote = async (req, res, next) => {
  try {
    console.log(req.body);
    const newNote = new notes({
      title: req.body.title,
      content: req.body.content,
      userId :req.body.userData
    });

    await newNote.save();
    res.status(200).json("tile and head are created");
  } catch (err) {
    next(err);
  }
};

export const getNotes = async (req, res, next) => {
  try {
   const userId = req.query.userId
   console.log(userId);
    const notesData = await notes.find({userId:userId});
    res.status(200).json(notesData);
  } catch (err) {
    next(err);
  }
};

export const editNote = async (req, res, next) => {
  try {
    console.log(req.body);
   const id=  mongoose.Types.ObjectId(req.body.id)

    const notesData = await notes.findByIdAndUpdate(
      { _id: id },
      { title: req.body.title, content: req.body.content }
    );
    res.status(200).json(notesData);
  } catch (err) {
    next(err);
  }
};

export const deleteNotes = async(req,res,next) =>{
    try {
        const notesId = mongoose.Types.ObjectId(req.body.Id)
        const notesData  = await notes.findByIdAndDelete(notesId)
        res.status(200).json(notesData);
    } catch (err) {
        console.log(err);
        next(err)
    }
};

