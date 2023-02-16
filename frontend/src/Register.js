import React, {Component, useEffect, useState} from 'react';
import './Register.css'

export class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e){
        e.preventDefault();
        const { firstName, lastName, email, password} = this.state;
        console.log(firstName, lastName, email, password);
        fetch("http://localhost:4000/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data, "User");
        });
    }
    render(){
        return(
            <div className="wrapper">
                <div className="blurr"></div>
                <div className="register">
                    <div className="AccountLabel">
                        <div>
                            <h1>Register</h1>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} className="RegisterForm" method="POST" action="/addUser">
                        <div className="firstNameWrapper">
                            <label type="text">FirstName:</label>
                            <input type="text" 
                            name="firstName" 
                            onChange={e => this.setState({firstName:e.target.value})}
                        ></input>
                        </div>
                        <div className="lastNameWrapper">
                            <label type="text">LastName:</label>
                            <input type="text" name="lastName" 
                            onChange={e => this.setState({lastName:e.target.value})}
                            ></input>
                        </div>
                        <div className="emailWrapper">
                            <label type="email">Email:</label>
                            <input type="email" name="email" 
                            onChange={e => this.setState({email:e.target.value})}
                            ></input>
                        </div>
                        <div className="passwordWrapper">
                            <label htmlfor="password">Password:</label>
                            <input type="password" name="password" 
                            onChange={e => this.setState({password:e.target.value})}
                            ></input>
                        </div>
                        <button type="submit" className="btn">Submit</button>
                    </form>
                    
                </div>
            </div>
        )
    }

}
export default Register;