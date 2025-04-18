// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Trash2, Edit, CheckCircle, Loader2, PlusCircle } from "lucide-react";
// import clsx from "clsx";
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
//    // Adjust this path!
//   //  import { cn } from "../../lib/utils"; 

// // Custom Button Component
// const Button = ({ variant, className, onClick, disabled, children, ...props }) => {
//   const baseClasses =
//       "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
//   const variantClasses = {
//       default: "bg-blue-500 text-white hover:bg-blue-600",
//       ghost: "text-gray-400 hover:text-blue-400 hover:bg-blue-500/20",
//       destructive: "bg-red-500 text-white hover:bg-red-600",
//       outline: "border border-gray-700 text-white hover:bg-gray-800"
//   };
//   return (
//       <button
//           onClick={onClick}
//           disabled={disabled}
//           className={clsx(baseClasses, variantClasses[variant] || variantClasses.default, className)}
//           {...props}
//       >
//           {children}
//       </button>
//   );
// };

// // Custom Input Component
// const Input = ({ className, ...props }) => {
// const baseClasses =
//   "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
//   return <input className={clsx(baseClasses, className)} {...props} />;
// };// Corrected import

// const TodoList = () => {
//   const [todos, setTodos] = useState(() => []);
//   const [newTodoText, setNewTodoText] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch todos from the backend
//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get("/api/todos");
//         setTodos(response.data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch todos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTodos();
//   }, []);

//   // Handle adding a new todo
//   const handleAddTodo = async () => {
//     if (!newTodoText.trim()) return;

//     try {
//       const response = await axios.post("/api/todos", {
//         text: newTodoText,
//         completed: false,
//       });
//       setTodos([...todos, response.data]);
//       setNewTodoText("");
//     } catch (err) {
//       setError(err.message || "Failed to add todo");
//     }
//   };

//   // Handle deleting a todo
//   const handleDeleteTodo = async (id) => {
//     try {
//       await axios.delete(`/api/todos/${id}`);
//       setTodos(todos.filter((todo) => todo._id !== id));
//     } catch (err) {
//       setError(err.message || "Failed to delete todo");
//     }
//   };

//   // Handle starting to edit a todo
//   const handleEditTodo = (todo) => {
//     setEditingId(todo._id);
//     setEditText(todo.text);
//   };

//   // Handle saving the edited todo
//   const handleSaveEdit = async (id) => {
//     try {
//       const response = await axios.patch(`/api/todos/${id}`, {
//         text: editText,
//       });
//       setTodos(
//         todos.map((todo) =>
//           todo._id === id ? { ...todo, text: response.data.text } : todo
//         )
//       );
//       setEditingId(null);
//       setEditText("");
//     } catch (err) {
//       setError(err.message || "Failed to edit todo");
//     }
//   };
//   // Handle marking a todo as complete/incomplete
//   const handleToggleComplete = async (id) => {
//     const todoToUpdate = todos.find((t) => t._id === id);
//     if (!todoToUpdate) return;
//     try {
//       const response = await axios.patch(`/api/todos/${id}`, {
//         completed: !todoToUpdate.completed,
//       });
//       setTodos(
//         todos.map((todo) =>
//           todo._id === id
//             ? { ...todo, completed: response.data.completed }
//             : todo
//         )
//       );
//     } catch (error) {
//       setError("Failed to update completion status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="animate-spin text-4xl text-gray-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64 text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen p-4 sm:p-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
//           Your Todo List
//         </h1>

//         {/* Input and Add Button */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <Input
//             type="text"
//             placeholder="Add a new todo..."
//             value={newTodoText}
//             onChange={(e) => setNewTodoText(e.target.value)}
//             className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-400"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleAddTodo();
//               }
//             }}
//           />
//           <Button
//             onClick={handleAddTodo}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
//             disabled={!newTodoText.trim()}
//           >
//             <PlusCircle className="w-5 h-5" />
//             Add Todo
//           </Button>
//         </div>

//         {/* Todo List */}
//         {todos.length === 0 ? (
//           <div className="text-gray-400 text-center py-8">
//             No todos yet. Add some tasks!
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {Array.isArray(todos) && todos.map((todo) => (
//               <div
//                 key={todo._id}
//                 className={clsx(
//                   "flex items-center justify-between p-4 rounded-lg border",
//                   "bg-gray-800 border-gray-700",
//                   "transition-all duration-200",
//                   "hover:shadow-md hover:border-gray-600",
//                   "focus-within:ring-2 focus-within:ring-blue-500"
//                 )}
//               >
//                 {editingId === todo._id ? (
//                   <>
//                     <Input
//                       type="text"
//                       value={editText}
//                       onChange={(e) => setEditText(e.target.value)}
//                       className="flex-1 bg-gray-700 text-white border-gray-600 mr-2"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           handleSaveEdit(todo._id);
//                         }
//                       }}
//                     />
//                     <Button
//                       onClick={() => handleSaveEdit(todo._id)}
//                       className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         setEditingId(null);
//                         setEditText("");
//                       }}
//                       className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded ml-2"
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center gap-4 flex-1">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleToggleComplete(todo._id)}
//                         className={clsx(
//                           "rounded-full w-10 h-10 transition-colors",
//                           todo.completed
//                             ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300"
//                             : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/20"
//                         )}
//                         aria-label={
//                           todo.completed
//                             ? "Mark as Incomplete"
//                             : "Mark as Complete"
//                         }
//                       >
//                         {todo.completed ? (
//                           <CheckCircle className="w-6 h-6" />
//                         ) : (
//                           <div className="w-6 h-6 rounded-full border-2 border-current" />
//                         )}
//                       </Button>
//                       <span
//                         className={clsx(
//                           "text-white",
//                           todo.completed && "line-through text-gray-400"
//                         )}
//                       >
//                         {todo.text}
//                       </span>
//                     </div>

//                     <div className="flex gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleEditTodo(todo)}
//                         className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/20"
//                         aria-label="Edit"
//                       >
//                         <Edit className="w-5 h-5" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleDeleteTodo(todo._id)}
//                         className="text-gray-400 hover:text-red-400 hover:bg-red-500/20"
//                         aria-label="Delete"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoList;


import React, { useState, useEffect } from "react";
// import axios from "axios"; // Removed axios
import { Trash2, Edit, CheckCircle, Loader2, PlusCircle } from "lucide-react";
import clsx from "clsx";
// import { Button } from "../components/ui/button"  //Removed
// import { Input } from "../components/ui/input"    //Removed
// import { cn } from "@/lib/utils";

//  Basic Button Component
const Button = ({ variant, className, onClick, disabled, children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "text-gray-400 hover:text-blue-400 hover:bg-blue-500/20",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-700 text-white hover:bg-gray-800",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variantClasses[variant] || variantClasses.default, className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Basic Input Component
const Input = ({ className, ...props }) => {
  const baseClasses =
    "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
  return <input className={clsx(baseClasses, className)} {...props} />;
};// Corrected import


const TodoList = () => {
  const [todos, setTodos] = useState(() => []);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to make API requests
  const fetchData = async (url, method = 'GET', data = null) => {
    try {
      const headers = {
        'Content-Type': 'application/json', // Ensure we're telling the server we want JSON
      };
      const config = {
        method,
        url,
        headers,
      };
      if (data) {
        config.data = JSON.stringify(data);
      }
      const response = await fetch(url, config);
      if (!response.ok) {
        // IMPORTANT:  Handle non-200 responses correctly.
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          // Attempt to get more detailed error message from the response.
          const errorText = await response.text();
          errorMessage += `, Body: ${errorText}`;
        } catch (e) {
          // If we can't get the response text, just use the basic error.
        }
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      setError(error.message || "An error occurred");
      throw error; // Re-throw to be caught in component
    }
  };

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const data = await fetchData("/api/todos");
        setTodos(data);
      } catch (err) {
        setError(err.message); // set the error message
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Handle adding a new todo
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;

    try {
      const newTodo = await fetchData("/api/todos", 'POST', {
        text: newTodoText,
        completed: false,
      });
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    } catch (err) {
      setError(err.message); // set the error message
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await fetchData(`/api/todos/${id}`, 'DELETE');
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message); // set the error message
    }
  };

  // Handle starting to edit a todo
  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  // Handle saving the edited todo
  const handleSaveEdit = async (id) => {
    try {
      const updatedTodo = await fetchData(`/api/todos/${id}`, 'PATCH', {
        text: editText,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, text: updatedTodo.text } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating todo:", err);
      setError(err.message || "Failed to update todo. Please try again.");
    }
  };
  // Handle marking a todo as complete/incomplete
  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find((t) => t._id === id);
    if (!todoToUpdate) return;
    try {
      const updatedTodo = await fetchData(`/api/todos/${id}`, 'PATCH', {
        completed: !todoToUpdate.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        )
      );
    } catch (error) {
      setError(error.message); // set the error.
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Your Todo List
        </h1>

        {/* Input and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <Button
            onClick={handleAddTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
            disabled={!newTodoText.trim()}
          >
            <PlusCircle className="w-5 h-5" />
            Add Todo
          </Button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No todos yet. Add some tasks!
          </div>
        ) : (
          <div className="space-y-4">
            {Array.isArray(todos) && todos.map((todo) => (
              <div
                key={todo._id}
                className={clsx(
                  "flex items-center justify-between p-4 rounded-lg border",
                  "bg-gray-800 border-gray-700",
                  "transition-all duration-200",
                  "hover:shadow-md hover:border-gray-600",
                  "focus-within:ring-2 focus-within:ring-blue-500"
                )}
              >
                {editingId === todo._id ? (
                  <>
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-gray-700 text-white border-gray-600 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit(todo._id);
                        }
                      }}
                    />
                    <Button
                      onClick={() => handleSaveEdit(todo._id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setEditText("");
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded ml-2"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4 flex-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleComplete(todo._id)}
                        className={clsx(
                          "rounded-full w-10 h-10 transition-colors",
                          todo.completed
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300"
                            : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/20"
                        )}
                        aria-label={
                          todo.completed
                            ? "Mark as Incomplete"
                            : "Mark as Complete"
                        }
                      >
                        {todo.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-current" />
                        )}
                      </Button>
                      <span
                        className={clsx(
                          "text-white",
                          todo.completed && "line-through text-gray-400"
                        )}
                      >
                        {todo.text}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTodo(todo)}
                        className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/20"
                        aria-label="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;


