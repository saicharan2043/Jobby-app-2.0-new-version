import React from 'react'

const AllContext = React.createContext({
  jobApplicationIds: [],
  onClickJobApplicationId: () => {},
  jobRole: 'Devops Engineer',
  onClickJobRole: () => {},
})

export default AllContext
