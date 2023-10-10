import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {FaArrowRight} from 'react-icons/fa'
import Cookies from 'js-cookie'
import AllContext from '../../context/AllContext'

import './index.css'

const Home = props => {
  const [jobCategory, setJobCategory] = useState('')
  const changeSelectValue = e => {
    setJobCategory(e.target.value)
  }

  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <AllContext.Consumer>
      {value => {
        const {onClickJobRole} = value
        const clickArrow = () => {
          onClickJobRole(jobCategory)
        }
        return (
          <div className="bg-image-home">
            <div className="nav-bar-conatoner">
              <img
                src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1696807830/technology-brain-design-logo-with-interconnected-lines_347382-747-removebg-preview_vvvb03.png"
                className="log"
              />
              <button className="logout-btn" onClick={clickLogout}>
                Logout
              </button>
            </div>
            <div className="footer-container">
              <div className="text-container-home">
                <h1 className="heading-home">
                  Find The Job That Fits Your Life
                </h1>
                <p className="discription-home">Select your job role</p>
                <div className="input-arrow-container">
                  <select
                    className="input-of-job-role"
                    value={jobCategory}
                    onChange={changeSelectValue}
                  >
                    <option value="Devops Engineer">Devops Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="ML Engineer">ML Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                  </select>
                  <Link to="/jobs">
                    <FaArrowRight className="arrow" onClick={clickArrow} />
                  </Link>
                </div>
              </div>
              <div className="container-landing-page-side">
                <img
                  src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1696808213/portrait-young-happy-business-woman-with-laptop-with-win-gesture_231208-245-transformed_khshxt.png"
                  className="landing-page-side-image"
                />
              </div>
            </div>
          </div>
        )
      }}
    </AllContext.Consumer>
  )
}

export default withRouter(Home)
