import mongoose from "mongoose";


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is Required"],
    },
    content: {
        type: String,
        required: [true, "Email is Required"],
       
    },
    userId :{

        type : mongoose.Schema.Types.ObjectId   }
       
});

const notes = mongoose.model("notes", notesSchema);
export default notes;

