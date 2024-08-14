import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/constants";
import axios from "axios";
import { config } from "../../constants/config";
import toast from "react-hot-toast";
import ProjectModal from "../../components/Home/ProjectModal";
import Loading from "../../components/Loadng";
import ProjectCards from "../../components/Home/ProjectCards";
import { IProject } from "../../interface/home/IProject";
import Greeting from "../../components/Greeting";
import bg from "../../assets/bg-1.jfif";

const Home = () => {
  const [loading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<any>([]);
  const [editingProject, setEditingProject] = useState<any>(null);

  //loading
  useEffect(() => {
    setIsLoading(true);
    const fetchProjects = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/projects`,
        config
      );
      setProjects(response.data.data);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const handleAddProjectClick = () => {
    setShowModal(true);
  };

  //closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setTitle("");
    setDescription("");
    setEditingProject(null);
  };

  //handling submit
  const handleAddSubmit = async (
    e: React.FormEvent,
    localTitle: string,
    localDescription: string
  ) => {
    setIsLoading(true);
    e.preventDefault();
    const newProject = { title: localTitle, description: localDescription };
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/projects`,
      newProject,
      config
    );
    setProjects(() => {
      return [...projects, response?.data.project];
    });
    setIsLoading(false);
    toast.success("Project Added Successfullyy");
    handleCloseModal();
  };

  //handle project edit
  const handleEditClick = (project: IProject) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (
    e: React.FormEvent,
    localTitle: string,
    localDescription: string
  ) => {
    e.preventDefault();

    setIsLoading(true);
    const updatedProject = { title: localTitle, description: localDescription };
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/projects/${editingProject._id}`,
      updatedProject,
      config
    );

    //success message
    toast.success(" updated successfully ");

    const updatedProjects = projects.map((p: any) =>
      p._id === editingProject._id ? response.data.data : p
    );

    setProjects(updatedProjects);
    setIsLoading(false);
    handleCloseModal();
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/projects/${projectId}`, config);
      toast.success("deleted successfully ");
      setProjects(projects.filter((p: any) => p._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className="absolute inset-0 bg-cover bg-center p-10"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div
        className=""
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <Greeting />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <button
          onClick={handleAddProjectClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Project
        </button>
      </div>

      <ProjectCards
        projects={projects}
        handleDeleteProject={(data: string) => handleDeleteProject(data)}
        handleEditClick={(data: IProject) => handleEditClick(data)}
      />

      {showModal && (
        <ProjectModal
          handleAddSubmit={handleAddSubmit}
          handleEditSubmit={handleEditSubmit}
          handleCloseModal={handleCloseModal}
          title={title}
          description={description}
        />
      )}
      {showEditModal && (
        <ProjectModal
          isEdit
          handleAddSubmit={handleAddSubmit}
          handleEditSubmit={handleEditSubmit}
          handleCloseModal={handleCloseModal}
          title={title}
          description={description}
        />
      )}
    </div>
  );
};

export default Home;
