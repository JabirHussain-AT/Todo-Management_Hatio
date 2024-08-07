import { NextFunction, Request, Response } from "express";
import Project from "../models/projectSchema";
import createGist from "../utils/createGist";
import { convertToMarkdown } from "../utils/convertToMarkdown";
import Todo from '../models/todoSchema'

//project controller

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    await Project.create({
      title: title,
      description: description,
    });
    res.status(201).json({ message: "Project saved", success: true });
  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in saving new project, try again later " });
  }
};


export const editProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id
    await Project.updateOne({_id : id },{$set:{
        title : title ,
        description : description
    }});
    const project = await Project.findOne({_id : id})
    res.status(201).json({ message: "Project updated", success: true , data : project });
  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in updating project, try again later " });
  }
};



export const fetchProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
    res.status(201).json({ message: "Project fetched", success: true , data : projects });
  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in fetching all projects, try again later " });
  }
};


export const fetchProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const project = await Project.findOne({_id : id})
    res.status(201).json({ message: "Project fetched", success: true , data : project });
  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in fetching  project, try again later " });
  }
};



export const fetchTodos = async (req: Request, res: Response) => {
  try {
    //fetching todos based on project
    const projectId = req.params.projectId
    const Todos = await Todo.find({projectId: projectId})
    res.status(201).json({ message: "Todos fetched", success: true , data : Todos });

  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in fetching Todos, try again later " });
  }
};



export const addTodo = async (req: Request, res: Response) => {
  try {
    //adding todos based on project
    const projectId = req.params.projectId
    const  description  = req.body.description

    const Todos = await Todo.create({
      description : description,
      projectId: projectId
    })

    res.status(201).json({ message: "Todos added", success: true , data : Todos });

  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in fetching Todos, try again later " });
  }
};



export const updateTodo = async (req: Request, res: Response) => {
  try {
    //updating todos based on project
    // const projectId = req.params.projectId
    const toDoId = req.params.todoId
    const description = req.body.description
    const isCompleted = req.body.isCompleted

    if( isCompleted ){
      const todoUpdate = await Todo.updateOne({_id : toDoId},{$set : { isCompleted : isCompleted   }})
    }else{
      const todoUpdate = await Todo.updateOne({_id : toDoId},{$set : { description : description  }})
    }

    res.status(201).json({ message: "Todos updated", success: true });

  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in updating Todos, try again later " });
  }
};



export const deleteTodo = async (req: Request, res: Response) => {
  try {
    //delete todos based on project
   
    const toDoId = req.params.todoId
    const todoUpdate = await Todo.deleteOne({_id : toDoId })

    res.status(201).json({ message: "Todos deleted", success: true  , data : todoUpdate });

  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in deleting Todos, try again later " });
  }
};


//export gist 
export const exportGist = async (req: Request, res: Response) => {
  try {
    //export gist todos based on project
  
    const projectId = req.params.projectId;
    const todos = await Todo.find({projectId : projectId})
    const project = await Project.findOne({ _id : projectId})
    const mdContent = convertToMarkdown(todos, project?.description);
    const gistUrl = await createGist(mdContent);

    res.json({ success: true, gistUrl });


    // res.status(201).json({ message: "Todos exported", success: true  });

  } catch (err: unknown) {
    console.log("Error in the project controller :", err);
    res
      .status(500)
      .json({ message: "error in deleting Todos, try again later " });
  }
};



