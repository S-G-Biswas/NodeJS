const express = require("express")
const {NotesModel} = require("../model/notes.model")
const bcrypt = require("bcrypt")
const notesRouter= express.Router()
const jwt = require("jsonwebtoken")
const {auth} = require("../middleware/auth")

//Adding new notes

notesRouter.post("/",auth,async(req,res)=>{
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.send({"msg":"Newnote is added"})
    } 
    catch (error) {
        res.send({"Erroe":error})
    }
})

//Getting all the notes of logged user

notesRouter.get("/",auth,async(req,res)=>{
    
    try {
         const notes = await NotesModel.find({userID:req.body.userID})
         res.send({notes})
    } 
    catch (error) {
        res.send({"error":error})
    }
})


//update notes
notesRouter.patch("/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
    try {
        const note = await NotesModel.findOne({_id:noteID})

        if(note.userID === req.body.userID){
            await NotesModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({"msg":`The Note with id ${noteID} has been updated`}) 
        }
        else{
            res.send({"msg":"you are not authorised"})
        }
           
    } 
    catch (error) {
        res.send({"Error":error})
    }
})

//delete notes
notesRouter.delete("/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
    try {
        const note = await NotesModel.findOne({_id:noteID})

        if(note.userID === req.body.userID){
            await NotesModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`The Note with id ${noteID} has been deleted`}) 
        }
        else{
            res.send({"msg":"you are not authorised"})
        }
           
    } 
    catch (error) {
        res.send({"Error":error})
    }
})



module.exports={
    notesRouter
}