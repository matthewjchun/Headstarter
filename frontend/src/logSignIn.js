import React, {Component} from 'react';
import './logSignIn.css';
//Nj1L6Ty8JRdhF2qL
//mongodb+srv://user:<password>@calender.tarsclc.mongodb.net/?retryWrites=true&w=majority
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
         this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e){
        e.preventDefault();
        const {email, password} = this.state;
        console.log(email, password);
        fetch("http://localhost:4000/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
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
                <div className="logIn">
                    <div className="AccountLabel">
                        <div>
                            <h1>Log In</h1>
                        </div>
                    </div>
                    <form action="" className="logInForm" onSubmit={this.handleSubmit} >
                        <div className="emailWrapper">
                            <label type="email">Email:</label>
                            <input type="email" name="email" onChange={(e) => this.setState({email: e.target.value})}></input>
                        </div>
                        <div className="passwordWrapper">
                            <label for="password">Password:</label>
                            <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value})}></input>
                        </div>

                        <button type="submit" className="btn">Submit</button>
                    </form>
                    <button onClick={() => this.props.onFormSwitch('register')}>Don't have an account? Register here,</button>
                </div>
            </div>
        )
    }
}

export default Login;