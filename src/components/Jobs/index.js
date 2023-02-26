import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const EmploymentTypes = props => {
  const {employmentList, checkBoxValue} = props
  const {label, employmentTypeId} = employmentList

  const changeValue = event => {
    const isChecked = event.target.checked
    checkBoxValue(employmentTypeId, isChecked)
  }

  return (
    <li className="list-of-checkbox">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypeId}
        onChange={changeValue}
      />
      <label className="label-checkbox" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

const RedioButton = props => {
  const {salaryList, radiobtnValue} = props
  const {label, salaryRangeId} = salaryList

  const valueOfRadio = () => {
    radiobtnValue(salaryRangeId)
  }

  return (
    <li className="list-of-redio" onClick={valueOfRadio}>
      <input type="radio" className="redio" id={salaryRangeId} name="salary" />
      <label className="label-redio" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

const profileStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const jobsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    searchValue: '',
    StatusOfJobs: jobsStatus.loading,
    StatusOfProfile: profileStatus.loading,
    employmentType: [],
    minimumPackage: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  /* get profile data */

  responseProfileSuccess = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="person-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  loadingProfile = () => (
    <div className="loader-container loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileFail = () => {
    const onRetry = () => {
      this.getProfileData()
    }

    return (
      <div className="profile-error-container">
        <button className="error-btn" onClick={onRetry} type="button">
          Retry
        </button>
      </div>
    )
  }

  displayProfile = () => {
    const {StatusOfProfile} = this.state
    switch (StatusOfProfile) {
      case profileStatus.success:
        return this.responseProfileSuccess()
      case profileStatus.failure:
        return this.getProfileFail()
      case profileStatus.loading:
        return this.loadingProfile()
      default:
        return null
    }
  }

  getProfileData = async () => {
    this.setState({StatusOfProfile: profileStatus.loading})

    const JwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {...data.profile_details}
      const updatedData = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileData: updatedData,
        StatusOfProfile: profileStatus.success,
      })
    } else {
      this.setState({StatusOfProfile: profileStatus.failure})
    }
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
    <div className="loader-container loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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

  JobDataSuccessInSmallDevice = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.NoJobView()
    }
    return (
      <ul className="job-list-sm">
        {jobsList.map(echValue => (
          <JobCard cardOfJob={echValue} />
        ))}
      </ul>
    )
  }

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

  displayJobsDataSmallDivce = () => {
    const {StatusOfJobs} = this.state
    switch (StatusOfJobs) {
      case jobsStatus.success:
        return this.JobDataSuccessInSmallDevice()
      case jobsStatus.failure:
        return this.getJobsFail()
      case jobsStatus.loading:
        return this.loadingJobsData()
      default:
        return null
    }
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
    this.setState({StatusOfJobs: jobsStatus.loading})
    const {searchValue, employmentType, minimumPackage} = this.state
    const assined = employmentType.join(',')
    console.log(assined)
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${assined}&minimum_package=${minimumPackage}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
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

  /* radio button click */

  radiobtnValue = id => {
    this.setState({minimumPackage: id}, this.getJobsData)
  }

  /* change search value function */

  ChangeSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  clicksearchIcon = () => {
    this.getJobsData()
  }

  checkBoxValue = (value, isChecked) => {
    if (isChecked) {
      this.setState(
        privewsValue => ({
          employmentType: [...privewsValue.employmentType, value],
        }),
        this.getJobsData,
      )
    } else {
      const {employmentType} = this.state
      const updateValue = employmentType.filter(echValue => echValue !== value)
      this.setState({employmentType: updateValue}, this.getJobsData)
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <>
        <Header />
        <div className="bg-color-jobs">
          <div className="left-side-container">
            <div className="input-sm-container">
              <input
                type="search"
                className="input-sm-divice"
                placeholder="Search"
                onChange={this.ChangeSearchValue}
              />
              <button
                className="search-icon-container-sm"
                onClick={this.clicksearchIcon}
                data-testid="searchButton"
                type="button"
              >
                <BsSearch className="search-icon-sm" />
              </button>
            </div>
            {this.displayProfile()}
            <hr className="hr" />
            <h1 className="employment-text">Type of Employment</h1>
            <ul className="checkbox-un-order-list">
              {employmentTypesList.map(echValue => (
                <EmploymentTypes
                  employmentList={echValue}
                  key={echValue.employmentTypeId}
                  checkBoxValue={this.checkBoxValue}
                />
              ))}
            </ul>
            <hr className="hr" />
            <h1 className="salary-text">Salary Range</h1>
            <ul className="redio-un-order-list">
              {salaryRangesList.map(echValue => (
                <RedioButton
                  salaryList={echValue}
                  key={echValue.salaryRangeId}
                  radiobtnValue={this.radiobtnValue}
                />
              ))}
            </ul>

            <div className="dispay-container">
              {this.displayJobsDataSmallDivce()}
            </div>
          </div>

          <div className="right-side-container">
            <div className="input-container">
              <input
                type="search"
                className="input-divice"
                placeholder="Search"
                onChange={this.ChangeSearchValue}
              />
              <button
                className="search-icon-container"
                onClick={this.clicksearchIcon}
                type="button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.displayJobsData()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
