const express = require("express")
const {NotesModel} = require("../model/notes.model")
const bcrypt = require("bcrypt")
const notesRouter= express.Router()
const jwt = require("jsonwebtoken")
const {auth} = require("../middleware/auth")

/**
 * @swagger
 * components:
 *  schemas:
 *    Notes:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: This is a unique id generated by mongo
 *        title:
 *          type: string
 *          description: The title of notes
 *        body:
 *          type: string
 *          description: The body of notes
 */



/**
 * @swagger
 * /notes:
 *    get:
 *      summary: Get all notes
 *      tags: [Notes]
 *      responses:
 *       200:
 *         description: A list of notes is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notes'
 *       400:
 *         description: Some Error occured
 */

notesRouter.get("/",auth,async(req,res)=>{
    
    try {
         const notes = await NotesModel.find({userID:req.body.userID})
         res.send({notes})
    } 
    catch (error) {
        res.send({"error":error})
    }
})




/**
 * @swagger
 * /notes:
 *    post:
 *      summary: For adding new note
 *      tags: [Notes]
 *      requestBody:
 *                required: true
 *                content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *         description: A new note has been added
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Some Error occured
 */
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


/**
 * @swagger
 * /notes/{id}:
 *    patch:
 *      summary: For updating the notes
 *      tags: [Notes]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: The note id
 *      requestBody:
 *                required: true
 *                content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *         description: The note has been updated
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Some Error occured
 */


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


/**
 * @swagger
 * /notes/{id}:
 *    delete:
 *      summary: For deleting the note
 *      tags: [Notes]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: The note id
 * 
 *      responses:
 *       200:
 *         description: The note has been updated
 *       400:
 *         description: Some Error occured
 */

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