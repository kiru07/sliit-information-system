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
        const password = this.state.password;
        const cPassword= this.state.cPassword;
    }

    render(){
        
        return(
            <div>
                <Nav buttonType="login"/>

                <div className="container form">
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
