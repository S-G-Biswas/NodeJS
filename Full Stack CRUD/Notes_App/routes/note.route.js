const express = require("express")
const {NotesModel} = require("../model/notes.model")
const bcrypt = require("bcrypt")
const notesRouter= express.Router()
const jwt = require("jsonwebtoken")

//Adding new notes

notesRouter.post("/notes",async(req,res)=>{
  
})

//Getting all the notes

notesRouter.get("/notes",async(req,res)=>{
   
})



module.exports={
    userRouter
}