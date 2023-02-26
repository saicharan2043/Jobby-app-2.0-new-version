import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {IoMdMail} from 'react-icons/io'

import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const displayStatus = {
  success: 'SUCCESS',
  Failure: 'FAILURE',
  loading: 'LOADING',
}

const Skills = props => {
  const {skillsList} = props
  return (
    <li className="list-container-of-skill">
      <img
        src={skillsList.image_url}
        className="icon-of-skill"
        alt={skillsList.name}
      />
      <p className="skill-name">{skillsList.name}</p>
    </li>
  )
}

class JobItem extends Component {
  state = {
    jobDetailsList: [],
    similarJobsList: [],
    Status: displayStatus.loading,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    this.setState({Status: displayStatus.loading})

    const JwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(echValue => ({
        companyLogoUrl: echValue.company_logo_url,
        employmentType: echValue.employment_type,
        jobDescription: echValue.job_description,
        location: echValue.location,
        packagePerAnnum: echValue.package_per_annum,
        rating: echValue.rating,
        title: echValue.title,
        id: echValue.id,
      }))
      this.setState({
        jobDetailsList: jobDetails,
        similarJobsList: similarJobs,
        Status: displayStatus.success,
      })
    } else {
      this.setState({Status: displayStatus.Failure})
    }
  }

  responseSuccess = () => {
    const {jobDetailsList, similarJobsList} = this.state
    console.log(similarJobsList)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      id,
      lifeAtCompany,
    } = jobDetailsList

    return (
      <>
        <div className="item-container">
          <div className="logo-conatiner">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo-of-item"
            />
            <div className="title-conatiner-item">
              <h1 className="title-item">{title}</h1>
              <div className="rating-container-item">
                <AiFillStar className="rating-star-item" />
                <p className="rating-in-num-item">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-super-container-item">
            <div className="location-sub-container-item">
              <div className="icon-location-container-item">
                <IoLocationSharp className="icon-location-item" />
                <p className="lacation-text-item">{location}</p>
              </div>
              <div className="icon-job-container-item">
                <IoMdMail className="icon-job-item" />
                <p className="job-text-item">{employmentType}</p>
              </div>
            </div>

            <p className="packege-text-item">{packagePerAnnum}</p>
          </div>

          <hr className="hr-line-item" />
          <div className="container-description">
            <h1 className="description-heading-item">Description</h1>
            <a href={companyWebsiteUrl} className="visit-container">
              <p className="visit-link">Visit</p>
              <BiLinkExternal className="visit-logo" />
            </a>
          </div>
          <p className="description-item">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="un-order-skill-container">
            {skills.map(echValue => (
              <Skills skillsList={echValue} key={echValue.name} />
            ))}
          </ul>
          <div className="life-at-super-container">
            <div className="life-at-sub-container">
              <h1 className="life-at-text">Life at Company</h1>
              <p className="description-life-at">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              className="img-life-at"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="un-order-similarJobs">
          {similarJobsList.map(echValue => (
            <SimilarJobsCard jabsCard={echValue} key={echValue.id} />
          ))}
        </ul>
      </>
    )
  }

  loading = () => (
    <div className="loader-container loding-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  clickRetry = () => {
    this.getJobItemData()
  }

  responseFailure = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="img-error"
      />
      <h1 className="heading-error">Oops! Something Went Wrong</h1>
      <p className="description-error">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  displayCode = () => {
    const {Status} = this.state
    switch (Status) {
      case displayStatus.success:
        return this.responseSuccess()
      case displayStatus.Failure:
        return this.responseFailure()
      case displayStatus.loading:
        return this.loading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-color-jobItem">{this.displayCode()}</div>
      </>
    )
  }
}

export default JobItem
