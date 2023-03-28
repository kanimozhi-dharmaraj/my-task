import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('tasks'));
    if (storedItems !== null) {
      setItems(storedItems);
    }
  }, []);

  const handleDelete = (name) => {
    const newArray = items.filter((item) => item.name !== name);
    setItems(newArray);
    localStorage.setItem('items', JSON.stringify(newArray));
  };

  const handleEdit = (item) => {
    navigate(`/Form?name=${item.name}`);
  };

  const sortingData = (order) => {
    let unSortedTasks = [...items];
    if (order === "asc") {
      let ascTasks = unSortedTasks.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(ascTasks);
      setItems(ascTasks);
    } else if (order === "desc") {
      let descTasks = unSortedTasks.sort((a, b) => (a.name < b.name ? 1 : -1));
      console.log(descTasks);
      setItems(descTasks);
    }
  };

  const getAllTasks = () => {
    const storedItems = JSON.parse(localStorage.getItem('tasks'));
    console.log("allTasks", storedItems);
    setItems(storedItems);
  };

  const getFilteredTasks = () => {
    const filtered = items && items.filter((item) => item.status === true);
    console.log('filtered', filtered);
    setItems(filtered || []);
    //localStorage.setItem('tasks',JSON.stringify(filtered))
  };
  
  const getClickedBox = (id) => {
    const newArray = [...items]; // create a copy of the current array
    newArray[id].status = !newArray[id].status; // toggle the isCompleted property of the clicked task
   
    setItems(newArray); // update the state with the new array
    //localStorage.setItem('tasks',JSON.stringify(newArray))
    if(newArray[id].status === false){
      const filtered = items.filter((item)=> items.filter ? item.status === true : true);
      setItems(filtered); 
    
  };
 
}
  return (
    <>
      <div>
        Task
        {items && items.map((item, index) => (
          <div key={index}>
            <b>Id :</b>{item.id}{" "}
            <b>Name : </b>
            {item.name} <b>Description :</b> {item.description}{" "}
            <b>Status :</b> {item.status ? "completed" : "notComplete"}
            <input
                type="checkbox"
                checked={item.status}
                  onChange={() => getClickedBox(item.id-1)}>
                </input>
            <button onClick={() => handleDelete(item.name)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </div>
        ))}
        <select onChange={(e) => sortingData(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
        <Link to="/Form">Go to Form</Link>
        <button onClick={getAllTasks}>All</button>
        <button onClick={getFilteredTasks}>Completed</button>
      </div>
    </>
  );
};

export default Home;
