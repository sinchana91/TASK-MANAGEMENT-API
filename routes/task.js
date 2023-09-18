const router =require("express").Router();
const User=require("../models/User");
const Task=require("../models/Task");

//CREATE A TASK
router.post("/", async(req,res)=>
{
    const newTask=new Task(req.body);
    try{
        const savedTask=await newTask.save();
        res.status(200).json(savedTask);
    }catch(err){
        res.status(500).json(err);
    }
});
//GET TASK BY ID
router.get("/:id",async(req,res)=>{
    try{
        const task =await Task.findById(req.params.id);
        res.status(200).json(task);
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE AN EXISTING TASK
router.put("/:id",async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(task.username===req.body.username){
            try{
                 const updatedTask=await Task.findByIdAndUpdate(req.params.id,
                {
                  $set:req.body,
                },{new:true}
            );
            res.status(200).json(updatedTask);


    }catch(err){
        res.status(500).json(err);
    }
}else{
    res.status(400).json("you can only update your Task");
}
    }catch(err){
        res.status(200).json(err);
    }
});
//DELETE A TASK
router.delete("/:id",async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                await task.delete();
                res.status(200).json("Task has been Deleted");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can delete only your task");
        }
    }catch(err){
        res.status(500).json(err);
    }
});
//MARKING TASK AS COMPLETTED
router.post("/:id/complete", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (!task.completed) {
      
      task.completed = true;

      
      await task.save();

      return res.status(200).json({ message: 'Task completed', task });
    } else {
      return res.status(400).json({ error: 'Task already completed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//UPDATING DUE DATE
router.put("/:id/duedate",async(req,res)=>{
    try{
        const taskId=req.params.id;
        const newDueDate=req.body.duedate;


        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({error:'Task not found'});

        }
        task.duedate=newDueDate;
        await task.save();
        return res.status(200).json({message:'Due date updated',task});

    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error"});
    }
})


module.exports=router;