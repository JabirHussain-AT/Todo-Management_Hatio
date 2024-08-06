import { NextFunction, Request, Response } from "express";
import Project from "../models/projectSchema";

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
