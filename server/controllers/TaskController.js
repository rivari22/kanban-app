const {User, Task, Category, Organization} = require('../models/index');

class TaskController {
    static async getAllTasks(req, res, next){
        try {
            const task = await Task.findAll({
                include: Category
            })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }  
    }

    static async addTask(req, res, next){
        try {
            const dataTask = {
                title: req.body.title,
                CategoryId: req.body.CategoryId
            }
            const task = await Task.create(dataTask, {returning: true})
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }
    
    static async editTask(req, res, next){
        try {
            const taskId = +req.params.id
            const dataTask = req.body
            const task = await Task.update(dataTask, {
                where: {
                    id: taskId
                },
                returning: true
            })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

    static async updateCategory(req, res, next){
        try {
            const taskId = +req.params.id
            const dataTask = req.body
            const task = await Task.update(dataTask, {
                where: {
                    id: taskId
                },
                returning: true
            })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next){
        try {
            const taskId = +req.params.id
            const task = await Task.destroy({
                where: {
                    id: taskId
                }
            }) 
            res.status(200).json({msg: `Successfully delete task with id: ${taskId}`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController