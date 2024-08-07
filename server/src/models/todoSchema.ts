import mongoose from "mongoose";
const Schema = mongoose.Schema
const todoSchema = new Schema({
    description: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: 'false'
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


export default mongoose.model('Todo', todoSchema);

