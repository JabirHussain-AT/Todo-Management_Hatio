import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description :{
        type : String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});
export default mongoose.model('Project', projectSchema);
