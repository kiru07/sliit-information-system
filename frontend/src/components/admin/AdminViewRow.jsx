import React,{Component} from 'react'
import axios from 'axios'
import '../../stylesheet/common.css'


export default class AdminView extends Component{
    constructor(props){
        super(props);
        this.state = {
            admin:props.admin
        }
    }

    openModel(){
        console.log("hihihih");
        return(
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        )
    }

    render(){
        return(
            <tr>
                <td>{this.state.admin.regId}</td>
                <td>{this.state.admin.name}</td>
                <td>{this.state.admin.email}</td>
                <td>{this.state.admin.gender}</td>
                <td>{this.state.admin.qualification}</td>
                <td>{this.state.admin.address}</td>
                <td>{this.state.admin.phone}</td>
                <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={this.openModel}>Edit</button></td>
                <td><button type="button" class="btn btn-danger" >Delete</button></td>
            </tr>
        )
    }

}