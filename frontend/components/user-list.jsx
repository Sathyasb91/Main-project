import axios from "axios";
import React, { useEffect, useState } from "react"
import NavbarDashboard from "./navbar-dashboard";
import { useNavigate } from "react-router-dom";
import "./user-list.css";


export default function UserList() {
    const [userlist, setUserlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    axios.get("http://127.0.0.1:3000/userslist").then((result4) => {
        console.log(result4.data);
        setUserlist(result4.data)
        })
        .catch((err) =>{
            setUserlist([]);
        })
    },[]);

    const handleEdit = (id) =>{
    navigate(`/editusers/${id}`);
  };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete this user details");
        if(confirmDelete) {
            try{
                await axios.delete(`http://127.0.0.1:3000/deleteusers/${id}`);
                alert("User details deleted successfully");
                setUserlist(userlist.filter(user._id != id));
            } catch(err) {
                alert("Error in deleting user");
                console.error(err);
            }
        }
    };

    return(
        <div>
     
         <NavbarDashboard />
        <div className="user-list-cont">
            <div className="list">
                <h2>User's List</h2>
            </div>
                <div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone no</th>
                            <th>Address</th>
                            <th>Manage</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {userlist.map((entry) =>(
                        <tr key={entry._id}>
                          <td>{entry.username}</td>
                          <td>{entry.gender}</td>
                          <td>{entry.email}</td>
                          <td>{entry.password}</td>
                          <td>{entry.phoneno}</td>
                          <td>{entry.address}</td>
                          
                          <td>
                            <button onClick={() => handleEdit(entry._id)}>Edit</button>
                            <button onClick={() => handleDelete(entry._id)}>Delete</button>
                          </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
      </div>
    )

}
