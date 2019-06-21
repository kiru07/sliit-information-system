import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import AdminHome from '../components/admin/AdminHome'
import '../stylesheet/common.css'

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            regNo:"",
            password:""
        }

        this.onValueChange= this.onValueChange.bind(this);
        this.login= this.login.bind(this);
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login(e){
        e.preventDefault();
        const regNo = this.state.regNo;
        const password = this.state.password;

        if(regNo=='' || password==''){
            alert("Registration number or password is empty")
        } else {
            window.sessionStorage.setItem('regNo', regNo);

            // regNo begins with AD or ST or IN use particular GET to authenticate
            if(regNo.startsWith("A") || regNo.startsWith("a")){
                axios.get('http://localhost:4000/api/admin/getByReg/'+ regNo)
                    .then(resJson => {
                        console.log(resJson)
                        if(resJson.data[0].password === password) {
                            ReactDOM.render(<AdminHome/>, document.getElementById('root'));
                        } else {
                            alert("You have entered an invalid password",this.state.password)
                        }
                    })
                    .catch(err => console.log(err));
            } else if(regNo.startsWith("S") || regNo.startsWith("s")){
                console.log("Student");
            } else if(regNo.startsWith("I") || regNo.startsWith("i")){
                axios.get('http://localhost:4000/api/instructor/getByReg/'+regNo)
                    .then(resJson => {
                        if(resJson.data[0].password == password) {
                            ReactDOM.render(<AdminHome/>, document.getElementById('root'));
                        } else {
                            alert("You have entered an invalid password",this.state.password)
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                alert("Registration number is invalid")
            }
        }
    }


    render(){
        return(
            <div className="container login">
                <br/>
                <h3 className="font text-center" style={{color:"white"}}>COURSEWEB</h3>
                <br/>
                <form onSubmit={this.login}>
                    <div className="input-group mb-3">
                        <input 
                            value={this.state.regNo}
                            onChange={this.onValueChange} 
                            id="regNo" 
                            placeholder="Registration Number" 
                            className="form-control" 
                            name="regNo"/>
                    </div>
                    <br/>
                    <div className="input-group mb-3">
                        <input 
                            value={this.state.password}
                            onChange={this.onValueChange} 
                            id="password"  
                            type="password" 
                            placeholder="Password" 
                            className="form-control" 
                            name="password"/>
                    </div>
                    <br/>
                    <div className="text-center">
                        <button type="submit"  className="btn btn-outline-light font" >Login</button>
                    </div>
                    <br/>
                 </form>
            </div>
        )
    }
}