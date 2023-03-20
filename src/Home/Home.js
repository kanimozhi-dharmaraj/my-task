import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const userDetails = JSON.parse(localStorage.getItem('tasks'));
    console.log(userDetails);
  return (
    <div>Task
    {userDetails.map((item,index)=>
    (
        <div key={index}>
            <b>Name : </b>{item.name} {' '}
            <b>Description :</b> {item.description}{' '}
            <b>Status :</b> {item.status ? 'completed' : 'notComplete'}
        </div>
    ))}
    <Link to ="/Form">Go to Form</Link>
</div>
  )
}

export default Home