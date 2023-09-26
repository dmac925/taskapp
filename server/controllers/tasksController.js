const Tasks = require('../models/tasks');

class tasksController {

    async findAll(req, res){
        try{
            const tasks = await Tasks.find({});
            res.send(tasks);
        }
        catch(e){
            res.send({e})
        }
    }

    async findOne(req ,res){
        let { task_id} = req.params;
        try{
            const task = await tasks.findOne({_id:task_id});
            res.send(task);
        }
        catch(e){
            res.send({e})
        }

    }

    async insert (req, res) {
        let { task } = req.body;
        try{
            const done = await Tasks.create({task});
            res.send(done)
        }
        catch(e){
            res.send({e})
        }
    }

    async delete (req, res){
        console.log('delete!!!')
        let { taskID } = req.body;
        try{
            const removed = await tasks.deleteOne({ _id: taskId });
            res.send({removed});
        }
        catch(error){
            res.send({error});
        };
    }

    async update (req, res){
        let { taskId, title, description, status, category }  = req.body;
        try{
            const updated = await Tasks.updateOne(
                { _id: taskId },
                { $set: { title, description, status, category } } 
            );
            res.send({updated});
        }
        catch(error){
            res.send({error});
        };
    }


};
module.exports = new tasksController();