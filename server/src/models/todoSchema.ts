import mongoose from "mongoose";
const Schema = mongoose.Schema
const todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
},
{
        timestamps: true,
    });


const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
