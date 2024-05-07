
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE, DELETE, UPDATE } from './reducer/type'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import Modal from './components/Modal/Modal'

function App() {
const todo = useSelector(state => state.todo)
const dispatch = useDispatch(todo)

const [modal, setModal] = useState(false)
const [updateId, setUpdateId] = useState(null)
const [update, setUpdate] = useState("")

const handleFormTodo = (evt) => {
  evt.preventDefault()
  const data = {
    id: (todo.length ? parseInt(todo[todo.length - 1].id + 1 ).toString() : "1"),
    value :evt.target.todo.value
  }
  evt.target.reset()
  dispatch({type:CREATE, payload:data})
  toast.success("Muvaffaqiyatli qo'shildi!")
}

const handleDelete = (evt) => {
  const clickID = evt.target.id
  dispatch({type:DELETE, id:clickID})
  toast.success("Muvaffaqiyatli o'chirildi!")
}

const handleUpdate = (id, value) => {
  setModal(true)
  setUpdate(value)
  setUpdateId(id)
}

const handleUpdateForm = (evt) => {
  evt.preventDefault()
  const data = {
    id: updateId,
    updateData: {
      value: update
    }
  }
  dispatch({type:UPDATE, payload:data})
  setModal(false)
  toast.success("Ma'lumot yangilandi!")
}

  return (
    <>
    <div className='w-[50%] mt-10 mx-auto'>
      <Toaster position="top-center" reverseOrder={false}/>
    <form onSubmit={handleFormTodo} className=' w-[100%] bg-slate-200 rounded-md p-5 '>
      <h1 className='mb-[30px] text-[35px] leading-[40px] text-center font-bold'>Create your todo!</h1>
  
        <label className='w-full flex items-center justify-between'>
          <input className='p-3 w-[77%] outline-none focus:shadow-md focus:shadow-blue-500  rounded-md' type="text" name="todo" required autoComplete='off' placeholder='Enter your ToDo'/>
        <button className='p-2 w-[20%] rounded-md text-[24px] bg-blue-500 text-white font-bold'>+ Add</button>
        </label>
    </form>
    <ul className='mt-10 space-y-[12px]'>
           {todo.length > 0 &&
             todo.map(item => (
              <li key={item.id} className='flex items-center justify-between p-3 bg-slate-300 rounded-md'>
                <span className='text-[20px] font-medium'>{item.value}</span>
                <div className='flex items-center space-x-5'>
                  <button onClick={() => handleUpdate(item.id, item.value)} className='bg-blue-500 text-[20px] p-2 rounded-md text-white font-bold'>Update</button>
                  <button id={item.id} onClick={handleDelete} className='bg-red-500 text-[20px] p-2 rounded-md text-white font-bold'>Delete</button>
                </div>
              </li>
             ))
           } 
    </ul>
    </div>


    <Modal modal={modal} setModal={setModal}>
        <form onSubmit={handleUpdateForm} className="p-5 rounded-lg mx-auto flex flex-col justify-center items-center" >
          <div className="flex items-end justify-between w-full">
            <label className="w-full flex flex-col gap-[10px] items-start">
              <span className="font-semibold text-[20px]">Enter your updated todo</span>
              <input value={update} onChange={evt => setUpdate(evt.target.value)} className="w-[90%] p-2 rounded-md" name="todoName" placeholder="Enter your updated todo" type="text" autoComplete="off" />
            </label>
            <button type="submit" className="p-2 mt-5 transition hover:scale-110 rounded-md w-[25%] bg-blue-500 text-white text-center text-[20px]">Save</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default App
