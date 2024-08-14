import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaGithub } from "react-icons/fa";
import { BACKEND_URL } from "../constants/constants";
import { config } from "../constants/config";
import toast from "react-hot-toast";

interface ITodo {
  _id: string;
  description: string;
  isCompleted: boolean;
}

interface TodoListProps {
  projectId: string;
}

const TodoList: React.FC<TodoListProps> = ({ projectId }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [projectId]);

  //fetching todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/project/${projectId}/todos`,
        config
      );
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  //adding todo
  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/project/${projectId}/todos`,
        { description: newTodo },
        config
      );
      setTodos([...todos, response.data.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //updating todo
  const updateTodo = async (_id: string, updates: Partial<ITodo>) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/project/${projectId}/todos/${_id}`,
        updates,
        config
      );
      fetchTodos();
      toast.success('To do item updated')
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  //deleting todo
  const deleteTodo = async (_id: string) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/project/${projectId}/todos/${_id}`,
        config
      );
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  //download
  const exportAsGist = async (projectId: string) => {
    try {
      const gistContent = JSON.stringify(todos, null, 2);
      const result = await axios.post(
        `${BACKEND_URL}/api/v1/export-gist/${projectId}`,
        { content: gistContent },
        config
      );
      console.log(result.data.gistUrl);
      toast.success("Todos exported as a Gist successfully!");

      // Fetch the raw content of the Gist
      const rawUrl =
        result.data.gistUrl.replace(
          "/gist.github.com/",
          "/gist.githubusercontent.com/"
        ) + "/raw";
      const gistResponse = await axios.get(rawUrl, { responseType: "blob" });

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([gistResponse.data]));
      link.setAttribute("download", `${projectId}-gist.md`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting as Gist:", error);
    }
  };

  //view gist
  const exportAsGistView = async (projectId: string) => {
    try {
      const gistContent = JSON.stringify(todos, null, 2);
      const result = await axios.post(
        `${BACKEND_URL}/api/v1/export-gist/${projectId}`,
        { content: gistContent },
        config
      );
      toast.success("Todos exported as a Gist successfully!");

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = result.data.gistUrl;
      link.download = "todos-gist.json";
      link.click();
    } catch (error) {
      console.error("Error exporting as Gist:", error);
    }
  };

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const pendingTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <div className="todo-list mt-8">
      <div className="flex w-full justify-between mb-8">
        <h2 className="text-xl font-bold mb-4">
          Todo Summary: {completedTodos.length}/{todos.length} completed
        </h2>
        <div className="flex gap-3 ">
          <button
            onClick={() => exportAsGist(projectId)}
            className="mt-4 bg-gray-800 text-white p-2 rounded flex items-center"
          >
            <FaGithub className="mr-2" /> Export as Gist
          </button>

          <button
            onClick={() => exportAsGistView(projectId)}
            className="mt-4 bg-gray-800 text-white p-2 rounded flex items-center"
          >
            <FaGithub className="mr-2" /> View as Gist
          </button>
        </div>
      </div>

      <div className="todo-input flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add Todo
        </button>
      </div>

      {pendingTodos.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Pending Todos</h3>
          {pendingTodos.map((todo) => (
            <div
              key={todo._id}
              className="todo-item flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
            >
              <span>{todo.description}</span>
              <div className="todo-actions space-x-2 flex items-center">
                <FaEdit
                  onClick={() => {
                    const newDescription = prompt(
                      "Edit todo:",
                      todo.description
                    );
                    if (newDescription)
                      updateTodo(todo._id, { description: newDescription });
                  }}
                  className="cursor-pointer text-blue-500"
                />
                <FaTrash
                  onClick={() => deleteTodo(todo._id)}
                  className="cursor-pointer text-red-500"
                />
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() =>
                    updateTodo(todo._id, { isCompleted: !todo.isCompleted })
                  }
                  className="cursor-pointer w-5 h-5"
                />
              </div>
            </div>
          ))}
        </>
      )}

      {completedTodos.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2">Completed Todos</h3>
          {completedTodos.map((todo) => (
            <div
              key={todo._id}
              className="todo-item flex justify-between items-center mb-2 p-2 bg-gray-200 rounded"
            >
              <span className="line-through">{todo.description}</span>
              <div className="todo-actions space-x-2 flex items-center">
                <FaTrash
                  onClick={() => deleteTodo(todo._id)}
                  className="cursor-pointer text-red-500"
                />
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() =>
                    updateTodo(todo._id, { isCompleted: !todo.isCompleted })
                  }
                  className="cursor-pointer w-5 h-5"
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TodoList;
