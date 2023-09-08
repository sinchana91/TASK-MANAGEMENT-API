const mongoose = require("mongoose");



const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,

        },
        desc: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps:true}
)
module.exports=mongoose.model("Task",TaskSchema)

