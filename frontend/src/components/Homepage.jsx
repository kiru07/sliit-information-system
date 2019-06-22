import React,{Component} from 'react'
import bgImage from '../images/stu.svg'
import Login from '../components/Login'
import Nav from '../components/Nav'
import '../stylesheet/common.css'


export default class Homepage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            // click:false
        };
    }

    render(){
        return(
            <div>
            <Nav buttonType="signup"/>
                <div className="home-background">
                    <div>
                        <p className="home-text">PATHWAY TO EXCELLENCE</p>
                        <img className="home-image" src={bgImage}/>
                    </div>
                    <div className="login-form">
                        <Login />
                    </div>
                </div>             
            </div>
        )
    }
}