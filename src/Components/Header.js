import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            userName: undefined,
            createAccountModalIsOpen:false,
            loginCredentailsModalIsOpen:false,
            email:undefined,
            password:undefined

        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }
    handleEmail=(state,event)=>{
        this.setState({ [state]: event.target.value });
    }
    handleLogin=(event)=>{
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:4567/login',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations })
            })
            .catch()
    }
    handleSignUp=(event)=>{
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:4567/signup',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations })
            })
            .catch()
    }

    render() {
          const { loginModalIsOpen, isLoggedIn, userName , createAccountModalIsOpen,loginCredentailsModalIsOpen} = this.state;
         return (
            <div>
                <div className='header'>
                    <div className="header-logo" onClick={this.handleNavigate}>
                        <p>e!</p>
                    </div>
                    {isLoggedIn ? <div className="header-user">
                        <div className="login">{userName}</div>
                        <div className="signup" onClick={this.handleLogout}>Logout</div>
                    </div> :
                        <div className="header-user">
                            <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div className="signup" onClick={() => this.handleModal('createAccountModalIsOpen',true)}>Create an account</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <button className='btn btn-primary' style={{marginTop: '25px',width: '182px'}} onClick={() => this.handleModal('loginCredentailsModalIsOpen',true)}>Login with Credentails</button>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <div style={{marginTop: '10px'}}>
                            <GoogleLogin
                                clientId="131303037139-3ekm5rpaneta4v5kd1q39djih0jvbbep.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={loginCredentailsModalIsOpen}
                    style={customStyles}
                >
                 <div>
                 <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => {
                                this.handleModal('loginModalIsOpen', false); 
                                this.handleModal('loginCredentailsModalIsOpen', false);
                                  
                            }}>
                                {/*user*/}
                            </div>
                 <form style={{margin: '34px'}}>           
                   <label class="form-label" onChange={(event)=>this.handleEmail('email',event)}>Enter User name</label>
                   <input  style={{width: '310px'}}  type="text" class="form-control"></input>

                    <label class="form-label">Enter Password</label>
                    <input style={{width: '310px'}} type="text" class="form-control"></input>
                    <button class="btn btn-primary" style={{marginTop: '21px ' ,width: ' 199px' ,marginLeft: '49px'}}onClick={this.handleLogin} >Login</button>
                </form>

                 </div>
                </Modal>

                <Modal
                    isOpen={createAccountModalIsOpen}
                    style={customStyles}
                >
                 <div>
                 <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('createAccountModalIsOpen', false)}></div>
                <form style={{margin: '34px'}}>
                  <label class="form-label">Enter mobileNo</label>
                  <input  style={{width: '310px'}} type="text" class="form-control"></input>
                  <label class="form-label">Enter email</label>
                  <input  style={{width: '310px'}}type="text" class="form-control"></input>
                  <label class="form-label">Enter password</label>
                  <input  style={{width: '310px'}}type="text" class="form-control"></input>
                  <label class="form-label">Confirm password</label>
                  <input  style={{width: '310px'}}type="text" class="form-control"></input>
                  <button class="btn btn-primary"style={{marginTop: '21px ' ,width: ' 199px' ,marginLeft: '49px'}}onClick={this.handleSignUp}>Login</button>
                </form>

                 </div>
                </Modal>
            </div>
        
        )
    }
}

export default withRouter(Header);