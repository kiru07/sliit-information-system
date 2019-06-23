import React,{Component} from 'react'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import axios from 'axios'
import '../../stylesheet/common.css'


export default class AdminView extends Component{
    constructor(props){
        super(props);
        this.state = {
            instructor:props.instructor,
           
        }

        this.deleteAdmin=this.deleteAdmin.bind(this);
        this.resetPassword=this.resetPassword.bind(this);
        this.passwordCreator = this.passwordCreator.bind(this);
    }

    deleteAdmin() {
      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;

      
      axios.delete('/instructor/delete/'+this.state.instructor._id)
        .then(res => {
          {this.props.loadAdminView()}
          console.log(res)
          alert("Deleted Successfully!")
        })

      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;


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

    resetPassword() {
        console.log(document.getElementById('delete').name)
        var regId = document.getElementById('delete').name;

        const newPassword = this.passwordCreator()
        
        const instructor = {
            "regId":this.state.instructor.regId,
            "email":this.state.instructor.email,
            "password":newPassword
        }
        console.log(instructor,this.state.instructor._id)

        axios.put("/instructor/updatePassword/"+this.state.instructor._id,instructor)
            .then(res => {
                alert("New password has been sent by email!")
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <tr>
                <td>{this.state.instructor.regId}</td>
                <td>{this.state.instructor.name}</td>
                <td>{this.state.instructor.email}</td>
                <td>{this.state.instructor.gender}</td>
                <td>{this.state.instructor.qualification}</td>
                <td>{this.state.instructor.address}</td>
                <td>{this.state.instructor.phone}</td>
                <td><NavLink to={`/admin/editInstructor/${this.state.instructor._id}`}><button type="button" class="btn btn-info" >Edit</button></NavLink></td>
                <td><button id="delete" name={this.state.instructor.regId} type="button" class="btn btn-danger" onClick={this.deleteAdmin}>Delete</button></td>
                <td><button id="reset" name={this.state.instructor.regId} type="button" class="btn btn-warning" onClick={this.resetPassword}>Reset</button></td>
            </tr>
        )
    }

}