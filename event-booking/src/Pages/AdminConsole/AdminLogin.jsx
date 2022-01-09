import React from 'react';
import "../../Components/Styling/AdminConsole/login.css";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
    let history = useHistory();
    const log = () => {
        const e = document.getElementById("email").value;
        const p = document.getElementById("password").value;
        if(e==="admin@gmail.com" && p==="admin"){
            alert("Successful Login");
            history.push('/admin-main');
        }
        else{
            alert("Unsuccessful Login");
        }
    }
    return (
        <div>
            <div class="login-form">
                <form>
                    <h1>Login</h1>
                    <div class="content">
                        <div class="input-field">
                            <input type="email" placeholder="Email" id="email" name="email"/>
                        </div>
                        <div class="input-field">
                            <input type="password" placeholder="Password" id="password" id="password"/>
                        </div>
                    </div>
                    <div class="action">
                        <button onClick={log}>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

