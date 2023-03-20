import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const FormTask = () => {
    const[name,setName] = useState('');
    const[des,setDes] = useState('');
    const[status,setStatus] = useState(false);
    const[task,setTask] = useState([]);
    const[showErrMsg,setShowErrMsg] = useState(false);
    const navigate = useNavigate();
    const ChangeInput = (e) =>{
        console.log(e.target.value);
        if(e.target.name === 'taskName'){
            setName(e.target.value)
        }else if(e.target.name === 'description'){
            setDes(e.target.value)
        }else
        setStatus(e.target.checked)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(name,des,status);
        if(name==="" && des===""){
            setShowErrMsg(true);
        }
        const newTask = {
            name : name,
            description : des,
            status : status
        }
        console.log(newTask)
        setTask([...task,newTask]);
        console.log(task)
        
       // navigate("/Home");
    }
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(task));
        console.log(task)
    },[task])
    console.log(task)
  return (
    <div>FormTask
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task Name  : </label>
                <input name="taskName" placeholder='taskName' onChange={ChangeInput}></input>
            </div>
            {showErrMsg && name === "" && <p>name is required</p>}
            <div>
                <label>Description  : </label>
                <input name="description" placeholder='description' onChange={ChangeInput}></input>
            </div>
            {showErrMsg && des === "" && <p>description is required</p>}
            <div>
                <label>Status  : </label>
                <input type="checkbox" name="check" checked={status} onChange={ChangeInput}></input>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
       <Link to="/Home">Go to Home</Link>
    </div>
  )
}

export default FormTask