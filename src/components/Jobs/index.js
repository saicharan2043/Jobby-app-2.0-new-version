import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const jobsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    StatusOfJobs: jobsStatus.loading,
  }

  componentDidMount() {
    this.getJobsData()
  }

  /* get job data */

  getJobsFail = () => {
    const onRetry = () => {
      this.getJobsData()
    }

    return (
      <div className="error-container-jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="img-error-jobs"
        />
        <h1 className="heading-error-jobs">Oops! Something Went Wrong</h1>
        <p className="description-error-jobs">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn" type="button" onClick={onRetry}>
          Retry
        </button>
      </div>
    )
  }

  loadingJobsData = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  NoJobView = () => (
    <div className="noJob-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="noJob-img"
        alt="no jobs"
      />
      <h1 className="heading-noJobs">No Jobs Found</h1>
      <p className="description-noJobs">
        We could not find any. Try other filters
      </p>
    </div>
  )

  JobDataSuccess = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.NoJobView()
    }
    return (
      <ul className="jobs-un-order-list">
        {jobsList.map(echValue => (
          <JobCard cardOfJob={echValue} key={echValue.id} />
        ))}
      </ul>
    )
  }

  displayJobsData = () => {
    const {StatusOfJobs} = this.state
    switch (StatusOfJobs) {
      case jobsStatus.success:
        return this.JobDataSuccess()
      case jobsStatus.failure:
        return this.getJobsFail()
      case jobsStatus.loading:
        return this.loadingJobsData()
      default:
        return null
    }
  }

  getJobsData = async () => {
    const {jobRole} = this.props
    this.setState({StatusOfJobs: jobsStatus.loading})
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${jobRole}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(echValue => ({
        companyLogoUrl: echValue.company_logo_url,
        employmentType: echValue.employment_type,
        jobDescription: echValue.job_description,
        location: echValue.location,
        packagePerAnnum: echValue.package_per_annum,
        rating: echValue.rating,
        title: echValue.title,
        id: echValue.id,
      }))
      this.setState({jobsList: updatedData, StatusOfJobs: jobsStatus.success})
    } else {
      this.setState({StatusOfJobs: jobsStatus.failure})
    }
  }

  render() {
    return (
      <>
        <div className="bg-color-jobs">
          <Header />
          {this.displayJobsData()}
        </div>
      </>
    )
  }
}

export default Jobs
