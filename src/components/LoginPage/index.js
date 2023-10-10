import {Component} from 'react'
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import './index.css'
import Login from '../Login'
import Register from '../Register'

class LoginForm extends Component {
  state = {isLoginTrue: true}

  clickLoginTab = () => {
    this.setState({isLoginTrue: true})
  }

  clickRegisterTab = () => {
    this.setState({isLoginTrue: false})
    console.log('hello saikks')
  }

  render() {
    const {isLoginTrue} = this.state
    const Jwt = Cookies.get('jwt_token')
    if (Jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="first-container">
        <div className="left-bg-image">
          <div className="left-bg-color">
            <h1 className="left-side-heading">Welcome back!</h1>
            <p className="left-side-paragraph">
              ""Choose a job you love, and you will
              <br />
              never have to work a day in your life.""
            </p>
          </div>
        </div>
        <div className="form-container">
          <div className="login-register-tab">
            <button
              className={`login-tab ${isLoginTrue && 'under-score'}`}
              onClick={this.clickLoginTab}
            >
              Login
            </button>
            <button
              className={`register-tab ${
                isLoginTrue === false && 'under-score'
              }`}
              onClick={this.clickRegisterTab}
            >
              Register
            </button>
          </div>
          {isLoginTrue ? <Login /> : <Register />}
        </div>
      </div>
    )
  }
}

export default LoginForm
