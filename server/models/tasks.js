const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    status: {type:String, required: false},
    due: { type: Date, required: false, unique: true },
    reminder: { type: Date, required: false, unique: true },
    completed: { type: Date, required: false, unique: true },
    category: { type: String, required: true, unique: false },
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"users"}
 
  });
  
  module.exports = mongoose.model("task", taskSchema);