import React, { useState } from 'react';
import "../Components/Styling/admin.css";
import jsondata from "../scraped_data/db.json";






export default function AdminPage() {
  var feedback_data = jsondata.feed;
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
  
    } else if (!e.target.email.value) {
      alert("Valid email is required");

    } else if (!e.target.password.value) {
      alert("Password is required");
    
    } else if (
      e.target.email.value === "admin@gmail.com" &&
      e.target.password.value === "admin"
    ) {
      alert("Successfully logged in");
     
      e.target.email.value = "";
      e.target.password.value = "";
      //return (<UserPage/>);
      
    } else {
      alert("Wrong email or password combination");
      
    }
  }

  return (
    <div className="Login">
      
        <center>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter your password" />
            </div>
            <button className="primary">Login</button>
          </form>
          <br />
          <table className="styled-table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedback_data.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.feed}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </center>
      

    </div>
  );
}
