import {Component} from 'react'
import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isLoadingTrue: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showSubmitError: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showSubmitError: false})
  }

  onSubmitSuccess = async () => {
    const {history} = this.props

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username: 'rahul', password: 'rahul@2021'}),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    Cookies.set('jwt_token', data.jwt_token, {
      expires: 30,
    })
    this.setState({isLoadingTrue: false})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg, isLoadingTrue: false})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    if (username === '' || password === '') {
      this.setState({errorMsg: 'Fill All details', showSubmitError: true})
    } else {
      this.setState({showSubmitError: false, isLoadingTrue: true})
      // const url = 'http://localhost:5000/login'
      const url = 'https://demo-hosting-su9j.onrender.com/login'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess()
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="lable" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="lable" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Your Email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg, isLoadingTrue} = this.state

    return (
      <form className="form-container-login" onSubmit={this.submitForm}>
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        <button type="submit" className="btn-login">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        {isLoadingTrue && (
          <Loader type="ThreeDots" color="#000000" height="50" width="50" />
        )}
      </form>
    )
  }
}

export default withRouter(Login)
