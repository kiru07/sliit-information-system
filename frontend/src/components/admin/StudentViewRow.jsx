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
        
    }

    deleteAdmin() {
      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;

      
      axios.delete('/student/delete/'+this.state.instructor.regNumber)
        .then(res => {
          {this.props.loadAdminView()}
          console.log(res)
          alert("Deleted Successfully!")
        })

      console.log(document.getElementById('delete').name)
      var regId = document.getElementById('delete').name;


    }   

    render(){
        return(
            <tr>
                <td>{this.state.instructor.regNumber}</td>
                <td>{this.state.instructor.name}</td>
                <td>{this.state.instructor.email}</td>
                <td>{this.state.instructor.year}</td>
                <td>{this.state.instructor.semester}</td>
                <td>{this.state.instructor.address}</td>
                <td>{this.state.instructor.phone}</td>
                <td><button id="delete" name={this.state.instructor.regId} type="button" class="btn btn-danger" onClick={this.deleteAdmin}>Delete</button></td>
            </tr>
        )
    }

}