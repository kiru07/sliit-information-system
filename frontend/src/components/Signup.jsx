import React,{Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import '../stylesheet/common.css'
import Nav from '../components/Nav'
import App from '../App'

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";


export default class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
          startDate: new Date(),

          regNo:"",
          name:"",
          email:"",
          address:"",
          phone:"",
          password:"",
          cPassword:""
        };

        this.onValueChange= this.onValueChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
    }    

    handleLogin = (event) => {
        ReactDOM.render(<App/>, document.getElementById('root'))
    }

    handleSubmit(e){
        e.preventDefault();
        const regNo = this.state.regNo;
        const name = this.state.name;
        const email= this.state.email;
        const address= this.state.address;
        const phone= this.state.phone;
        const year = document.getElementById('year').value;
        const semester = document.getElementById('semester').value;
        const password = this.state.password;
        const cPassword= this.state.cPassword;

        if(regNo == "" || name == "" || email == "" || password == "" || cPassword == "" || year == "Select a year" || semester == "Select a semester" || address == "" || phone == "") {
            alert("Field is empty");
        } else if(isNaN(phone) || phone.length > 12) {
            alert("Invalid Phone Number");
        }  else if(password != cPassword) {
            alert("Password is not matching");
        } else {
            if(regNo.startsWith("sd") || regNo.startsWith("SD") || regNo.startsWith("sD") || regNo.startsWith("Sd")){
                
                const student = {
                    regNumber:regNo.toUpperCase(),
                    name:name,
                    email:email,
                    year:year,
                    semester:semester,
                    address:address,
                    phone:phone,
                    password:password
                }

                axios.post("/student/add",student)
                    .then(res => {
                        alert("Successfully added!")
                        document.getElementById('regNo').value = "";
                        document.getElementById('name').value = "";
                        document.getElementById('phone').value = "";
                        document.getElementById('password').value = "";
                        document.getElementById('cPassword').value = "";
                        document.getElementById('email').value = "";
                        document.getElementById('address').value = "";
                        document.getElementById('year').value = "Select a year";
                        document.getElementById('semester').value = "Select a semester";
                    })
                    .catch(err => console.log(err))
            } else {
                alert("Registration Number for the student begins with 'SD' or 'sd' or 'sD' or 'Sd'");                
            }
        }
    }

    render(){
        
        return(
            <div>
                <Nav buttonType="login"/>

                <div className="container signup-form">
                <h2 className="font text-center">Signup for Students</h2>
                    <br/>
                    <br/>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <input 
                                id="regNo"
                                value={this.state.regNo}
                                onChange={this.onValueChange}  
                                placeholder="Registration Number" 
                                className="form-control" 
                                name="regNo"/>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                id="name" 
                                value={this.state.name}
                                onChange={this.onValueChange}  
                                placeholder="Name" 
                                className="form-control" 
                                name="name"/>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                id="email" 
                                type="email"
                                value={this.state.email}
                                onChange={this.onValueChange}  
                                placeholder="Email" 
                                className="form-control" 
                                name="email"/>
                        </div>
                        {/* <div className="input-group mb-3">
                            <label for="dob">Date Of Birth</label>
                            <br/>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                className="form-control font"
                                id="dob"
                            />
                        </div> */}
                        <div className="input-group mb-3">
                            <input 
                                id="address" 
                                value={this.state.address}
                                onChange={this.onValueChange}  
                                placeholder="Address" 
                                className="form-control" 
                                name="address"/>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                id="phone" 
                                value={this.state.phone}
                                onChange={this.onValueChange}  
                                placeholder="Contact Number" 
                                className="form-control" 
                                name="phone"/>
                        </div>
                        <div className="input-group mb-3">
                            <select id="year" className="form-control">
                                <option>Select a year</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <select id="semester" className="form-control">
                                <option>Select a semester</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                id="password"  
                                value={this.state.password}
                                onChange={this.onValueChange}  
                                type="password" 
                                placeholder="Password" 
                                className="form-control" 
                                name="password"/>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                id="cPassword"  
                                value={this.state.cPassword}
                                onChange={this.onValueChange}  
                                type="password" 
                                placeholder="Confirm Password" 
                                className="form-control" 
                                name="cPassword"/>
                        </div>
                        <br/>
                        <div className="text-center">
                            <button type="submit"  className="btn btn-success font">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
