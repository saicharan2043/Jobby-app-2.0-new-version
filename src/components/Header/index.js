import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiOutlineHome, AiOutlineMail} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
    console.log('hello')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="log-header"
          alt=""
        />
      </Link>
      <div className="home-jobs-container">
        <Link to="/" className="link">
          <p className="home-text">Home</p>
        </Link>
        <Link to="/jobs" className="link">
          <p className="jobs-text">Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button">
        Logout
      </button>
      <div className="icon-container">
        <Link to="/" className="link">
          <AiOutlineHome className="icon" />
        </Link>
        <Link to="/jobs" className="link">
          <AiOutlineMail className="icon" />
        </Link>

        <FiLogOut className="icon" onClick={clickLogout} />
      </div>
    </nav>
  )
}

export default withRouter(Header)
