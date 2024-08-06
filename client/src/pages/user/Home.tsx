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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = { title, description };
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/projects`,
      newProject,
      config
    );
    setProjects([...projects, response.data.data]);
    handleCloseModal();
  };

  const handleEditClick = (project: any) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject = { title, description };
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/projects/${editingProject._id}`,
      updatedProject,
      config
    );
    console.log('response =============',response)
    const updatedProjects = projects.map((p: any) =>
      p._id === editingProject._id ? response.data.data : p
    );
    setProjects(updatedProjects);
    handleCloseModal();
  };

  const ProjectModal = ({ isEdit = false }) => {
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
  
    useEffect(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, []);
  
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
          <form onSubmit={isEdit ? handleEditSubmit : handleSubmit}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              key={project._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between ">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <div>
                  <button 
                    onClick={() => handleEditClick(project)} 
                    className="px-1 m-2 py-1 bg-blue-400 rounded-md hover:scale-90"
                  >
                    edit
                  </button>
                  <button 
                    onClick={() => navigate(`/project/${project._id}`)} 
                    className="px-1 py-1 bg-blue-400 rounded-md hover:scale-90"
                  >
                    view
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
      </div>

      {showModal && <ProjectModal />}
      {showEditModal && <ProjectModal isEdit />}
    </div>
  );
};

export default Home;