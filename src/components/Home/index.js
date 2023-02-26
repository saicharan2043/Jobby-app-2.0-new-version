import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'

const Home = props => (
  <div className="bg-image-home">
    <Header />
    <div className="text-container-home">
      <h1 className="heading-home">Find The Job That Fits Your Life</h1>
      <p className="discription-home">
        Millions of people are searching for jobs, salary information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="link" to="/jobs">
        <button className="button-home" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
