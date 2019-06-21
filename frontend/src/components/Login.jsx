import React,{Component} from 'react'
import '../stylesheet/admin.css'
import axios from 'axios'

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    login=() => {
        const regNo = this.refs.regNo.value;
        const password = this.refs.password.value;

        if(regNo=='' || password==''){
            alert("Registration number or password is empty")
        } else {
            // regNo begins with AD or ST or IN use particular GET to authenticate
            if(regNo.startsWith("A") || regNo.startsWith("a")){
                axios.get('http://localhost:4000/api/admin/get/',)
                .then(response => this.setState({ todos: response.data }))
                .catch(err => console.log(err))
            } else if(regNo.startsWith("S") || regNo.startsWith("s")){
                console.log("Student");
            } else if(regNo.startsWith("I") || regNo.startsWith("i")){
                console.log("Student");
            }
        }
    }


    render(){
        return(
            <div className="container">
                <h3 className="font text-center">Login</h3>
                <form>
                    <div className="input-group mb-3">
                        <input id="regNo" placeholder="Registration Number" className="form-control" ref="regNo"/>
                    </div>
                    <div className="input-group mb-3">
                        <input id="password"  type="password" placeholder="Password" className="form-control" ref="password"/>
                    </div>
                    <div className="text-center">
                        <button type="submit"  className="btn btn-primary button" onClick={this.login}>Login</button>
                    </div>
                 </form>
            </div>
        )
    }
}