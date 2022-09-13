import express from "express";
const router = express.Router();
import {doNote,editNote,getNotes,deleteNotes} from "../Controllers/NoteController.js"


router.post('/createNotes',doNote);
router.get('/getNotes',getNotes)
router.post('/editNotes',editNote)
router.post('/deleteNotes',deleteNotes)

export default router;