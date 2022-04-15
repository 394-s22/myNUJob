import React from 'react'
import Job from './Job.js'

const JobList = ({jobs, filterCategories}) => {
  return (
    <ul className="cards">
      {filterCategories.length === 0 ? 
        jobs.map((j) => 
        <Job job={j} key={j.id}/>) :
          jobs.filter(j => filterCategories.includes(j.category)).map((j) => 
        <Job job={j} key={j.id} />)
      }
    </ul>
  )
}

export default JobList;
