import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApiCall = () =>{
   const [userdetails, setUserdetails] = useState([]);
 
   
   useEffect(() => {
        getData();
   },[]);

   const getData = async () => {
      try{
         const API = `https://jsonplaceholder.typicode.com/users`;
         const response = await axios.get(API);
         console.log(response.data);
         setUserdetails(response.data);
      }catch(error)
      {
         console.log(error);
      }
   }
   return(
      <div>
         {userdetails.length === 0 ? (
        <p>User details fetched</p>
      ) : (
        userdetails.map((user) => (
        <div key={user.id} className="userdetails">
         <h3>{user.id}{user.name}{user.username}{user.email}{user.website}</h3>
        </div>
        ))
      )}
      </div>
   )
}
export default ApiCall;