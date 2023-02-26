import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {IoMdMail} from 'react-icons/io'

import {withRouter} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {cardOfJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = cardOfJob

  const clickCard = () => {
    const {history} = props
    history.replace(`/jobs/${id}`)
  }

  return (
    <li className="card-container" onClick={clickCard}>
      <div className="logo-conatiner">
        <img src={companyLogoUrl} alt="company logo" className="logo-of-card" />
        <div className="title-conatiner">
          <h1 className="title-card">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-star" />
            <p className="rating-in-num">{rating}</p>
          </div>
        </div>
      </div>

      <div className="location-super-container">
        <div className="location-sub-container">
          <div className="icon-location-container">
            <IoLocationSharp className="icon-location" />
            <p className="lacation-text">{location}</p>
          </div>
          <div className="icon-job-container">
            <IoMdMail className="icon-job" />
            <p className="job-text">{employmentType}</p>
          </div>
        </div>

        <p className="packege-text">{packagePerAnnum}</p>
      </div>

      <hr className="hr-line" />
      <h1 className="description-heading-card">Description</h1>
      <p className="description-card">{jobDescription}</p>
    </li>
  )
}

export default withRouter(JobCard)
