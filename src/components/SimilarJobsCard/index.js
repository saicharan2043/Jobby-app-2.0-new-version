import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {IoMdMail} from 'react-icons/io'

import './index.css'

const SimilarJobsCard = props => {
  const {jabsCard} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jabsCard
  return (
    <li className="list-similar">
      <div className="container-of-logo">
        <img
          src={companyLogoUrl}
          className="company-logo-similar"
          alt="similar job company logo"
        />
        <div className="titile-container-similar">
          <h1 className="title-text-similar">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="description-heading">Description</h1>
      <p className="description-text">{jobDescription}</p>
      <div className="bottom-container">
        <div className="locatin-container">
          <IoLocationSharp className="locatin-icon" />
          <p className="locatin-text">{location}</p>
        </div>
        <div className="job-container">
          <IoMdMail className="locatin-icon" />
          <p className="locatin-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
