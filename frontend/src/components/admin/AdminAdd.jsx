import React,{Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import '../../stylesheet/common.css'
import Nav from '../Nav'



export default class AdminAdd extends Component{

    constructor(props){
        super(props);
        this.state = {

          regNo:"",
          name:"",
          email:"",
          qualification:"",
          address:"",
          phone:""
        };

        this.onValueChange= this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordCreator = this.passwordCreator.bind(this);
    }

    passwordCreator = () => {
        var length           = 10;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        
        const regNo = this.state.regNo;
        const name = this.state.name;
        const email= this.state.email;
        const qualification= this.state.qualification;
        const gender = document.getElementById('gender').value;
        const address= this.state.address;
        const phone= this.state.phone;

        if(regNo == "" || name == "" || email == "" || qualification == "" || gender == "Select a gender" || address == "" || phone == "") {
            alert("Field is empty");
        } else {
            if(regNo.startsWith("ad") || regNo.startsWith("AD")){
                const password = this.passwordCreator();
                const admin = {
                    regId:regNo,
                    name:name,
                    email:email,
                    qualification:qualification,
                    gender:gender,
                    address:address,
                    phone:phone,
                    password:password
                }
                axios.post("http://localhost:4000/api/admin/add",admin)
                    .then(res => {
                        alert("Successfully added!")
                        document.getElementById('regNo').value = "";
                        document.getElementById('name').value = "";
                        document.getElementById('phone').value = "";
                        document.getElementById('qualification').value = "";
                        document.getElementById('email').value = "";
                        document.getElementById('address').value = "";
                        document.getElementById('gender').value = "Select a gender";
                    })
                    .catch(err => console.log(err))
            } else {
                alert("Registration Number for the administrator begins with 'AD' or 'ad'");                
            }
        }
    }

    render(){
        
        return(
            <div>
                <Nav buttonType="logout"/>

                <div className="container form">
                <h2 className="font text-center">Add Administrator</h2>
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
                        <div className="input-group mb-3">
                            <input 
                                id="qualification" 
                                value={this.state.qualification}
                                onChange={this.onValueChange}  
                                placeholder="Qualification" 
                                className="form-control" 
                                name="qualification"/>
                        </div>
                        <div className="input-group mb-3">
                            <select id="gender" className="form-control">
                                <option>Select a gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
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
                        <br/>
                        <div className="text-center">
                            <button type="submit"  className="btn btn-success font">Insert</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
