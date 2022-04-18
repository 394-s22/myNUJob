import React from 'react'
import Job from './Job.js'

const JobList = ({jobs, filterCategories, sortDirection}) => {

  switch(sortDirection){
    
    case "Increasing Wage":
      jobs.sort((a, b) => {return a.pay - b.pay});
      break;
    case "Decreasing Wage":
      jobs.sort((a, b) => {return b.pay - a.pay});
      break;
    case "A to Z":
      jobs.sort((a, b) => {return a.title < b.title ? -1 : 1});
      break;  
    default:
      break;
  }

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
