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
            const task = await Tasks.findOne({_id:task_id});
            res.send(task);
        }
        catch(e){
            res.send({e})
        }

    }

    async insert (req, res) {
        const task = req.body;
        console.log(task);
        try{
            const done = await Tasks.create(task);
            res.send(done)
        }
        catch(e){
            res.send({e})
        }
    }

    async delete (req, res){
        let { taskId } = req.body;
        
        try{
            const removed = await Tasks.deleteOne({ _id: taskId });
            
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