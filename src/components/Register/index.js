import {Component} from 'react'
import {withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

class Register extends Component {
  state = {
    name: '',
    password: '',
    username: '',
    gander: 'male',
    showSubmitError: false,
    errorMsg: '',
    isLoadingTrue: false,
  }

  onChangename = e => {
    this.setState({name: e.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeGander = e => {
    this.setState({gander: e.target.value})
  }

  renderRadioField = () => {
    const {gander} = this.state

    return (
      <>
        <label className="lable" htmlFor="gander">
          Gander
        </label>
        <select
          className="input"
          onChange={this.onChangeGander}
          id="gander"
          value={gander}
        >
          <option value="male" selected>
            Male
          </option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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
          type="email"
          id="username"
          className="input"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Your Email"
        />
      </>
    )
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

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="lable" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="input"
          value={name}
          onChange={this.onChangename}
          placeholder="Enter Your Name"
        />
      </>
    )
  }

  sendTheDetails = async () => {
    this.setState({isLoadingTrue: true})
    const {name, username, password, gander} = this.state
    const {history} = this.props
    const userDetails = {
      username,
      password,
      gander,
      name,
    }

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const Response = await fetch(
      'https://demo-hosting-su9j.onrender.com/register',
      option,
    )
    const data = await Response.json()
    if (Response.ok) {
      const optionTWO = {
        method: 'POST',
        body: JSON.stringify({username: 'rahul', password: 'rahul@2021'}),
      }
      const ResponseTwo = await fetch('https://apis.ccbp.in/login', optionTWO)
      const dataTwo = await ResponseTwo.json()
      Cookies.set('jwt_token', dataTwo.jwt_token, {
        expires: 30,
      })
      history.replace('/')
    } else {
      this.setState({
        errorMsg: data.error_msg,
        showSubmitError: true,
        isLoadingTrue: false,
      })
    }
  }

  clickRegister = e => {
    e.preventDefault()
    const {username, name, password, gander} = this.state
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (username.match(validRegex) && name !== '' && password !== '') {
      this.sendTheDetails()
    } else {
      this.setState({
        errorMsg: 'Please Enter Valid Details',
        showSubmitError: true,
        isLoadingTrue: false,
      })
    }
  }

  render() {
    const {showSubmitError, errorMsg, isLoadingTrue} = this.state
    return (
      <form className="form-container-login" onSubmit={this.clickRegister}>
        {this.renderNameField()}
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        {this.renderRadioField()}
        <button type="submit" className="btn-login">
          Register
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        {isLoadingTrue && (
          <Loader type="ThreeDots" color="#000000" height="50" width="50" />
        )}
      </form>
    )
  }
}

export default withRouter(Register)
