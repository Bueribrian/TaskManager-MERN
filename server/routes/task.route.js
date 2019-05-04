const express = require('express')
const Router = express.Router()
const Task = require('../models/task')

Router.route('/')
    .get((req,res)=>{
        Task.find((err,tasks)=>{
            if(err) throw err
            res.json({msg:'Tareas', tasks})
        })
        
    })
    .post((req,res)=>{
        let { title, description } = req.body
        let newTaks = new Task({ title, description })

        newTaks.save((err, task)=>{
            if(err) throw err

            res.json({msg:'Tarea salvada con exito', task})
        })
    })

Router.route('/:_id')
    .put((req, res)=>{
        let _id = req.params._id
        let { title, description } = req.body
        let taskUpdated = { title, description }

        Task.findByOneAndUpdate({_id},taskUpdated,(err,oldTask)=>{
            if(err) throw err

            res.json({msg:'Tarea actualizada con exito',msg2:"Tarea vieja", oldTask})
        })
    })
    .delete((req,res)=>{
        let _id = req.params._id
        Task.findByIdAndDelete({_id},(err,taskDeleted)=>{
            if(err) throw err
            res.json({msg:'Tarea borrada con exito',msg2:"Tarea eliminada", taskDeleted})
        })
    })


module.exports = Router