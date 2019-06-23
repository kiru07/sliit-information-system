import React,{Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import '../../stylesheet/common.css'
import Nav from '../Nav'



export default class AdminEdit extends Component{

    constructor(props){
        super(props);
        this.state = {
          adminId: this.props.match.params.id,  
          regNo:"",
          name:"",
          email:"",
          qualification:"",
          address:"",
          phone:"",
          password:""
        };

        this.onValueChange= this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount(){
        console.log(this.state.adminId)
        axios.get('/admin/get/'+this.state.adminId)
            .then(res => {
                console.log(res)
                document.getElementById('regNo').value = res.data.regId;
                document.getElementById('name').value = res.data.name;
                document.getElementById('phone').value = res.data.phone;
                document.getElementById('qualification').value = res.data.qualification;
                document.getElementById('email').value = res.data.email;
                document.getElementById('address').value = res.data.address;
                document.getElementById('gender').value = res.data.gender;

                this.state.regNo = res.data.regId;
                this.state.name = res.data.name;
                this.state.email = res.data.email;
                this.state.qualification= res.data.qualification;
                this.state.address= res.data.address;
                this.state.phone= res.data.phone;
                this.state.password = res.data.password;
            })
            .catch(err => console.log(err))
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
        } else if(isNaN(phone) || phone.length > 12) {
            alert("Invalid Phone Number");
        } else {
            if(regNo.startsWith("ad") || regNo.startsWith("AD")){
                const admin = {
                    regId:regNo,
                    name:name,
                    email:email,
                    qualification:qualification,
                    gender:gender,
                    address:address,
                    phone:phone
                }
                console.log(this.state.adminId)
                axios.put("/admin/update/"+this.state.adminId,admin)
                    .then(res => {
                        alert("Successfully edited!")
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
                {/* <Nav buttonType="logout"/> */}

                <div className="container form">
                <h2 className="font text-center">Edit Administrator</h2>
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
                            <button type="submit"  className="btn btn-success font">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
