import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import JobItem from './components/JobItem'

import Jobs from './components/Jobs'
import Home from './components/Home'
import LoginForm from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import AllContext from './context/AllContext'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
// const employmentTypesList = [
//   {
//     label: 'Full Time',
//     employmentTypeId: 'FULLTIME',
//     isTrue: false,
//   },
//   {
//     label: 'Part Time',
//     employmentTypeId: 'PARTTIME',
//     isTrue: false,
//   },
//   {
//     label: 'Freelance',
//     employmentTypeId: 'FREELANCE',
//     isTrue: false,
//   },
//   {
//     label: 'Internship',
//     employmentTypeId: 'INTERNSHIP',
//     isTrue: false,
//   },
// ]

// const salaryRangesList = [
//   {
//     salaryRangeId: '1000000',
//     label: '10 LPA and above',
//   },
//   {
//     salaryRangeId: '2000000',
//     label: '20 LPA and above',
//   },
//   {
//     salaryRangeId: '3000000',
//     label: '30 LPA and above',
//   },
//   {
//     salaryRangeId: '4000000',
//     label: '40 LPA and above',
//   },
// ]

// Replace your code here
class App extends Component {
  state = {jobApplicationIds: [], jobRole: 'Devops Engineer'}

  onClickJobApplicationId = id => {
    this.setState(previous => ({
      jobApplicationIds: [...previous.jobApplicationIds, id],
    }))
    console.log(id)
  }

  onClickJobRole = string => {
    this.setState({jobRole: string})
  }

  render() {
    const {jobApplicationIds, jobRole} = this.state
    return (
      <AllContext.Provider
        value={{
          jobApplicationIds,
          jobRole,
          onClickJobApplicationId: this.onClickJobApplicationId,
          onClickJobRole: this.onClickJobRole,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/jobs"
              component={() => <Jobs jobRole={jobRole} />}
            />
            <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
            <Route component={NotFound} />
          </Switch>
        </>
      </AllContext.Provider>
    )
  }
}

export default App
