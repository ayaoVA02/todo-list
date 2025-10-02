import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  CheckCircle2,
  Circle,
  Edit2,
  Save,
  X,
  Filter,
} from "lucide-react";

import Navbar from "./Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editTaskDescription, setEditNewTaskDescription] = useState("");


  useEffect(() => {
    const savedTasks = localStorage.getItem("todolist-tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority: newTaskPriority,
        description: newTaskDescription,
        createdAt: new Date(),
      };

      setTasks([...tasks, task]);
      setNewTask("");
      setNewTaskPriority("medium");
      setNewTaskDescription("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    console.log(task);
    setEditingTask(task.id);
    setEditText(task.text);
    setEditNewTaskDescription(task.description);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editText.trim() } : task
        )
      );
    }

    setEditingTask(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText("");
    setEditNewTaskDescription("");
  };

  const filteredTasks = tasks.filter((task) => {
    // console.log("task", filter  )
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });


  // console.log("filteredTasks", filteredTasks)


  const sortedTasks = filteredTasks.sort((a, b) => {

    const priorityOrder = { high: 3, medium: 2, low: 1 };

    // a.completed = true and b.completed = false
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; //return 1 → b goes before a
    }


    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });



  console.log("sortedTasks", sortedTasks)

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <Navbar />
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-blue-600">My Tasks</h1>
              <p className="text-gray-500 mt-1">
                {totalCount === 0
                  ? "No tasks yet"
                  : `${completedCount} of ${totalCount} completed`}
              </p>
            </div>
            <Link
              to="/"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100"
            >
              Home
            </Link>
          </div>

          {/* Add Task Form */}
          <div className="shadow-lg rounded-lg shadow-blue-100 border border-gray-200 bg-white">
            <div className="p-4 border-b border-blue-200">
              <h2 className="text-xl font-bold text-blue-600">Add New Task</h2>
              <p className="text-gray-500">
                What would you like to accomplish today?
              </p>
            </div>
            <div className="p-4">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Task title + priority + button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Task title */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm  border-gray-200  focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm  border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Add button */}
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={!newTask.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter task details..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 text-sm  border-gray-200 focus:outline-none focus:ouline-none focus:border-blue-500"
                  />
                </div>
              </form>

            </div>
          </div>

          {/* Filter */}
          {tasks.length > 0 && (
            <div className="shadow-sm rounded-lg border border-gray-200 bg-white p-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded-md text-sm ${filter === "all"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-3 py-1 rounded-md text-sm ${filter === "pending"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  Pending ({totalCount - completedCount})
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 rounded-md text-sm ${filter === "completed"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  Completed ({completedCount})
                </button>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-3">
            {sortedTasks.length === 0 ? (
              <div className="shadow-sm rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-500">
                <Circle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">
                  {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
                </p>
                <p className="text-sm">
                  {filter === "all"
                    ? "Add your first task above to get started!"
                    : `Switch to "All" to see other tasks`}
                </p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`shadow-sm rounded-lg border border-gray-200 bg-white p-4 flex items-center gap-3 ${task.completed ? "opacity-75" : ""
                    }`}
                >
                  {/* Toggle */}
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    {editingTask === task.id ? (
                      <div className="bg-white p-4 rounded-xl space-y-4">

                        {/* Task title edit */}
                        <div className="flex items-center gap-2">
                          <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2 text-sm border-gray-200 focus:outline-none  focus:border-blue-500"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(task.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                            placeholder="Edit task title..."
                          />

                          {/* Save button */}
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition "
                          >
                            <Save className="w-4 h-4" />
                          </button>

                          {/* Cancel button */}
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition "
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Task description edit */}
                        <div>
                          <textarea
                            placeholder="Edit task details..."
                            value={editTaskDescription}
                            onChange={(e) => setEditNewTaskDescription(e.target.value)}
                            rows={4}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // allow Shift+Enter for new line
                                saveEdit(task.id);
                              }
                              if (e.key === "Escape") cancelEdit();
                            }}
                            className="w-full border rounded-lg px-3 py-2 text-sm  border-gray-200 focus:outline-none  focus:border-blue-500"
                          />
                        </div>
                      </div>

                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-sm font-medium ${task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                              }`}
                          >
                            {task.text}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Added {task.createdAt.toLocaleDateString()} at{" "}
                          {task.createdAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="mt-2 text-gray-400">{task.description}</p>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  {editingTask !== task.id && (
                    <>
                      <button
                        onClick={() => startEditing(task)}
                        className="text-gray-500 hover:text-blue-600 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          {tasks.length > 0 && (
            <div className="shadow-sm rounded-lg border border-gray-200  bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-800">
                  {completedCount}/{totalCount} tasks completed
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                  style={{
                    width:
                      totalCount > 0
                        ? `${(completedCount / totalCount) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
