import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../constants/constants";
import axios from "axios";
import { config } from "../../constants/config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<any>([]);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/projects`,
        config
      );
      setProjects(response.data.data);
    };
    fetchProjects();
  }, []);

  const handleAddProjectClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setTitle("");
    setDescription("");
    setEditingProject(null);
  };

  const handleAddSubmit = async (e: React.FormEvent , localTitle : string , localDescription : string) => {
    e.preventDefault();
    const newProject = { title : localTitle, description  : localDescription };
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/projects`,
      newProject,
      config
    );
    setProjects(()=>{
      return [...projects ,response?.data.project]
    });
    handleCloseModal();
  };

  const handleEditClick = (project: any) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent , localTitle : string , localDescription : string) => {
    e.preventDefault();
    const updatedProject = { title : localTitle, description :  localDescription };
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/projects/${editingProject._id}`,
      updatedProject,
      config
    );
    const updatedProjects = projects.map((p: any) =>
      p._id === editingProject._id ? response.data.data : p
    );
    setProjects(updatedProjects);
    handleCloseModal();
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/projects/${projectId}`, config);
      setProjects(projects.filter((p: any) => p._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const ProjectModal = ({ isEdit = false }) => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const [localTitle, setLocalTitle] = useState(title);
    const [localDescription, setLocalDescription] = useState(description);
  
    useEffect(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
      setLocalTitle(title);
      setLocalDescription(description);
    }, [title, description]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isEdit) {
        handleEditSubmit(e, localTitle, localDescription);
      } else {
        handleAddSubmit(e, localTitle, localDescription);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Project" : "Add New Project"}</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                ref={titleInputRef}
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                ref={descriptionInputRef}
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEdit ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <button
          onClick={handleAddProjectClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.length > 0 &&
          projects.map((project: any) => (
            <div
              key={project?._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-2">{project?.title}</h2>
                <div>
                  <button 
                    onClick={() => handleEditClick(project)} 
                    className="px-1 m-2 py-1 bg-blue-400 rounded-md hover:scale-90"
                  >
                    edit
                  </button>
                  <button 
                    onClick={() => navigate(`/project/${project?._id}`)} 
                    className="px-1 py-1 bg-blue-400 rounded-md hover:scale-90"
                  >
                    view
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project._id)} 
                    className="px-1 py-1 bg-red-400 rounded-md hover:scale-90 ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{project?.description}</p>
            </div>
          ))}
      </div>

      {showModal && <ProjectModal />}
      {showEditModal && <ProjectModal isEdit />}
    </div>
  );
};

export default Home;