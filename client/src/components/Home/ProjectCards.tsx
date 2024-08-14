import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProjects } from "../../interface/home/IProjects";
import { IProject } from "../../interface/home/IProject";
import { MdEdit, MdOpenInBrowser } from "react-icons/md";

const ProjectCards: React.FC<IProjects> = ({
  projects,
  handleEditClick,
  handleDeleteProject,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Calculate the indices for the projects to display
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentProjects.map((project: IProject) => (
          <div
            key={project?._id}
            className="bg-violet-500 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{project?.title}</h2>
            </div>
            <p className="text-white text-opacity-80 mb-6">{project?.description}</p>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handleEditClick(project)}
                className="px-4 py-2 flex gap-2 items-center bg-black rounded-lg hover:bg-gray-800 transition"
              >
                <MdEdit size={20} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => navigate(`/project/${project?._id}`)}
                className="px-4 py-2 flex gap-2 items-center bg-blue-600 rounded-lg hover:bg-blue-800 transition"
              >
                <MdOpenInBrowser size={20} />
                <span>View</span>
              </button>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="px-4 py-2 flex gap-2 items-center bg-red-600 rounded-lg hover:bg-red-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-auto pb-6 mb-28">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-800"
          } text-white transition`}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-800"
          } text-white transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
