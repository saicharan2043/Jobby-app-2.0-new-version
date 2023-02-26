import {Switch, Route} from 'react-router-dom'

import JobItem from './components/JobItem'

import Jobs from './components/Jobs'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isTrue: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isTrue: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isTrue: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isTrue: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/jobs"
        component={() => (
          <Jobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        )}
      />
      <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
