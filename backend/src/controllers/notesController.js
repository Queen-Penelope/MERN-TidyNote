import express from "express";
import Notes from "../models/notes.model.js";

//hanling getNotes:
export const getNotes = async (req, res) => { 
    try {
        const notes = await Notes.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("ERROR in getNotes",eror);
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
};

//handle getNoteById:
export const getNoteById = async (req, res) => {
    try {
        const note_id = req.params.id;
        const note = await Notes.findById(note_id);
        if(!note){
            return res.status(400).json({message: "NOTE NOT FOUND"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("ERROR in getNoteById",error);
        res.status(500).json({message: "INTERNAL SERVER ISSUES"});
    }
};


//handle addNote:
export const addNote = async (req, res) => { 
    try {
        const { title, content } = req.body;

        if( !title || !content ) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const newNote = new Notes({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.error("ERROR in addNote",error);
        res.status(500).json({messsage: "INTERNAL SERVER ISSUES"});
    }
};

//handle updateNote:
export const updateNote = async (req, res) => { 
    try {
        const { title, content } = req.body;

        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true}
        );
        if(!updatedNote) {
            return res.status(404).json({message : "404 NOTE NOT FOUND"});
        }
        res.status(200).json({message: "Note updated successfully"});

    } catch (error) {
        console.error("ERROR in updateNote", error);
        res.status(500).json({message: "INTERNAL SERVER ISSUES"});
    }
};

//handle deleteNote
export const deleteNote = async (req, res) => {  
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({message :"404 NOTE NOT FOUND"});
        }
        res.status(200).json({message: "NOTE DELETED SUCCESSFULLY"});
    } catch (error) {
        console.error("ERROR in deleteNote",error);
        res.status(500).json("INTERNAL SERVER ISSUES");
    }
};