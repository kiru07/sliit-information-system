import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import '../stylesheet/common.css'
import Signup from '../components/Signup'
import App from '../App'


export default class Homepage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            buttonType:this.props.buttonType,
            user:window.sessionStorage.getItem('regNo')
        };

        this.handleNav = this.handleNav.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleNav(){
        if(this.state.buttonType == "signup") {
            return(
                <button className="btn btn-primary sign-button" type="submit" onClick={this.handleSignup}>Signup</button>
            )
        } else if(this.state.buttonType == "logout") {
            return(
                <div className="nav-row row">
                    <div className="column">
                        <p className="user-id  vertical-center">{this.state.user}</p>
                    </div>
                    <div className="column">
                        <button className="btn btn-warning logout-button" type="submit" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            )
        } else if(this.state.buttonType == "login") {
            return(
                <button className="btn btn-primary sign-button" type="submit" onClick={this.handleLogout}>Login</button>
            )
        };
    }

    handleSignup = (event) => {
        ReactDOM.render(<Signup/>, document.getElementById('root'))
    }

    handleLogout = (event) => {
        ReactDOM.render(<App/>, document.getElementById('root'))
    }

    render(){
        return(
            <BrowserRouter>
                <div className="navbar navbar-expand-lg nav-top-bar"></div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link className="navbar-brand font" to="/">COURSEWEB</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {this.handleNav()}
                        </div>
                        </nav>
                </div>

                <div className="container">
                    <Route exact path="/"/>
                </div>

            </BrowserRouter>
        )
    }
}