import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import './index.css'
import FormTodo from './todolist/FormTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <TodoList/> */}
      <FormTodo/>
    </>
  )
}

export default App
