import { useEffect, useRef, useState  }  from "react";
import { IProjectModal } from "../../interface/IProjectModal";

const ProjectModal: React.FC < IProjectModal >  = ({ isEdit = false , title , description , handleEditSubmit , handleAddSubmit , handleCloseModal }) => {
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
      if (isEdit && handleEditSubmit ) {
        handleEditSubmit(e, localTitle, localDescription);
      } else {
        if( handleAddSubmit ) handleAddSubmit(e, localTitle, localDescription);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Project" : "Add New Project"}</h2>
            <button
              onClick={ handleCloseModal }
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

  export default ProjectModal