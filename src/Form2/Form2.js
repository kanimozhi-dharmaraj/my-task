import React, { useEffect, useState, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { stateContext } from "../context/StateContext";

const FormTask = () => {
    const [params] = useSearchParams();
    console.log(params.get("name"));
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [status, setStatus] = useState(false);
    const [showErrMsg, setShowErrMsg] = useState(false);
    const { state, dispatch } = useContext(stateContext); //state reducer
    //const[task,setTask] = useState([]);
  
    console.log("state", state.tasks, dispatch);
  
    useEffect(() => {
        if (params.get("name") !== null) {
          const temp = state.tasks;
          const obj = temp.find((item) => item.name === params.get("name"));
          console.log(obj)
            setId(obj.id);
            setName(obj.name);
            setDes(obj.description);
            setStatus(obj.status);
        
        }
      }, [params,state.tasks]);
      
    
  
    const ChangeInput = (e) => {
      console.log(e.target.value);
      if (e.target.name === 'id') {
        setId(e.target.value)
      }
      else if (e.target.name === 'taskName') {
        setName(e.target.value)
      } else if (e.target.name === 'description') {
        setDes(e.target.value)
      } else
        setStatus(e.target.checked)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(id, name, des, status);
      if (name === "" && des === "") {
        setShowErrMsg(true);
      } 
      else if (params.get("name") !== null) {
        const updatedTask = {
          id : id,
          name: name,
          description: des,
          status: status
        };
        const updatedTasks = state.tasks.map((t) =>
          t.name === params.get("name") ? updatedTask : t
        );
        dispatch({ type: 'UPDATE_TASK', payload: updatedTasks });
      }else {
        const newTask = {
          id: id,
          name: name,
          description: des,
          status: status
        };
        //setTask([...task, newTask]);
        dispatch({ type: 'ADD_TASK', payload: [...state.tasks,newTask] });
      }
      setId("");
      setName("");
      setDes("");
      setStatus(false);
    };
  
    useEffect(() => {
      dispatch({ type: 'ADD_TASK', payload: state.tasks} );
    }, [dispatch,state.tasks]);
  
    console.log(state.tasks)  
    console.log("state.tasks type:", typeof state.tasks);

  return (
    <div>FormTask
        <form onSubmit={handleSubmit}>
        <div>
                <label>Id : </label>
                <input name="id" placeholder='id' value={id} onChange={ChangeInput}></input>
            </div>
            <div>
                <label>Task Name  : </label>
                <input name="taskName" placeholder='taskName' value={name} onChange={ChangeInput}></input>
            </div>
            {showErrMsg && name === "" && <p>name is required</p>}
            <div>
                <label>Description  : </label>
                <input name="description" placeholder='description' value={des} onChange={ChangeInput}></input>
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
       <Link to="/Home2">Go to Home</Link>
    </div>
  )
}

export default FormTask
