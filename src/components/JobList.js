import React from 'react'
import Job from './Job.js'

const JobList = ({jobs, filterCategories}) => {
  return (
    <div className="cards">
      {filterCategories.length === 0 ? 
        jobs.map((j) => 
        <Job job={j} />) :
        jobs.filter(j => filterCategories.includes(j.category)).map((j) => 
        <Job job={j} />)
      }
    </div>
  )
}

export default JobList;
