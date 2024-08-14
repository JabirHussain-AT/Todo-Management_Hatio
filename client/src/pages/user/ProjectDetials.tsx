import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/constants';
import { config } from '../../constants/config';
import TodoList from '../../components/TodoList'; 
import Loading from '../../components/Loadng';

interface IProject {
    title: string;
    description: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/project/${id}`, config);
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-400 to-purple-700 p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">{project.title}</h1>
      <p className="text-gray-200 mb-4">{project.description}</p>
      
      {/* Add the TodoList component */}
      <TodoList projectId={id!} />
    </div>
  );
};

export default ProjectDetails;
