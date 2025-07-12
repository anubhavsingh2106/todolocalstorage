import { useState , useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm  from './components/TodoForm'
import  TodoItem  from './components/TodoItem'

function App() {

 const [todos, setTodos] = useState([])

 const addTodo = (todo) => {
   setTodos((prev) => [{id: Date.now() , ...todo}, ...prev])
 }

 const updateTodo = (id , todo) =>{
   setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prev.Todo)))
 }
 
 const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id))
 }

 const toggleComplete = (id) => {
  setTodos((prev) => 
  prev.map((prevTodo) =>
    prevTodo.id === id ? { ...prevTodo, complete: !prevTodo.complete } : prevTodo
  ))
 }

 useEffect(() => {
  const todos = JSON.parse(localStorage.getItem('todos'))

  if(todos && todos.length > 0){
    setTodos(todos)
  }
 } , [])

 useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
 },[todos])


 return (
  <TodoProvider value={{ updateTodo, deleteTodo, addTodo, toggleComplete }}>
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg px-6 py-8 text-white relative">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl -z-10"></div>

        {/* Header */}
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-10">
          ✅ Todo Lists
        </h1>

        {/* Todo Form */}
        <div className="mb-6">
          <TodoForm />
        </div>

        {/* Todo Items List (no overflow clipping) */}
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <div key={todo.id} className="transition duration-300 hover:scale-[1.01]">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </TodoProvider>
);

};
export default App
