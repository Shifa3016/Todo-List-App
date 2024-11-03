import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('')
  const [mytodos, setMytodos] = useState([])
  const [showFinished, setshowFinished] = useState(null)

  useEffect(() => {
   let todoString = localStorage.getItem("mytodos")
   if (todoString){
    let mytodos = JSON.parse(localStorage.getItem("mytodos"))
    setMytodos(mytodos)
   } 
  }, [])

  const savetoLS = (params) => {
    localStorage.setItem("mytodos", JSON.stringify(mytodos))
  }
  
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleSave = () => {
    setMytodos([...mytodos, {id: uuidv4(), todo, iscompleted: false}]);
    setTodo('');
    savetoLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = mytodos.filter(item=>{
      return item.id!==id
    })
    setMytodos(newTodos)
    savetoLS()
  }
  const handleEdit = (e, id) => {
    let t = mytodos.filter(item=>item.id===id)
    setTodo(t[0].todo)
    let newTodos = mytodos.filter(item=>{
      return item.id!==id
    })
    setMytodos(newTodos)
    savetoLS()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = mytodos.findIndex(item=>{
      return item.id===id
    });
    let newTodos = [...mytodos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setMytodos(newTodos)
    savetoLS()
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar/>
      <div className='container tablet:w-full laptop:w-[90%] w-[50vw] min-h-[85vh] mx-auto bg-purple-100 py-1 rounded-xl my-2'>
        <div className='flex justify-center text-xl font-bold'>
          <h1>iTask- Your Own Task Manager</h1>
        </div>
        <div className='font-bold px-5'>
          <h2>Add Todo</h2>
          <input className=' w-[85%] rounded-full px-3 py-1 font-semibold my-3' value={todo} onChange={handleChange} type="text" placeholder='Write your todos here...'/>
          <button className='bg-purple-800 text-white px-3 py-1 rounded-full mx-3 hover:bg-purple-900' onClick={handleSave}>Save</button><br/>
          <input className='my-5' onChange={toggleFinished} type="checkbox"  id="showFinished" />
          <label className='font-normal mx-4' htmlFor="showFinished">Show Finished Tasks</label>
        </div>
        <div className='w-[95%] h-[1px] bg-black mx-4'></div>
        <div className='mytodos mx-3 mt-3'>
          {mytodos.length === 0 && <div>No Todos to Display</div>}
          {mytodos.map(item=>{
            return (showFinished || !item.iscompleted) && <div key={item.id} className='each-todo flex justify-between bg-purple-200 my-2 py-2 pr-2 rounded-lg'>
              <div className='flex items-center gap-4 ml-2'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} name={item.id}/>
              <div className={item.iscompleted? "line-through" : ""} >{item.todo}</div>
              </div>
              <div className="buttons flex space-x-2">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-purple-800 text-white px-3 py-1 rounded-full font-bold hover:bg-purple-900'><FaEdit />
              </button>
              <button onClick={(e)=>handleDelete(e, item.id)} className='bg-purple-800 text-white px-3 py-1 rounded-full font-bold hover:bg-purple-900'><MdDelete /></button>
              </div>
            </div>
          })}
          
        </div>
      </div>
    </>
  )
}

export default App
