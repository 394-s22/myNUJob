import React from 'react'
import Job from './Job.js'

const JobList = ({jobs, filterCategories, sortDirection}) => {

  // switch(sortDirection){
    
  //   case "Increasing Wage":
  //     jobs.sort((a, b) => {return a.pay - b.pay});
  //     break;
    
  //   case "Decreasing Wage":
  //     jobs.sort((a, b) => {return b.pay - a.pay});
  //     break;
    
  //   case "Alphabetical Order":
  //     jobs.sort((a, b) => {return b.title - a.title});
  //     break;  
    
  //   default:
  //     break;
  // }

  return (
    <ul className="cards">
      {filterCategories.length === 0 ? 
        Object.keys(jobs).map((j) => 
        <Job job={jobs[j]} key={j.ID}/>) :
          jobs.filter(j => filterCategories.includes(j.CATEGORY)).map((j) => 
        <Job job={j} key={j.ID} />)
      }
    </ul>
  )
}

export default JobList;
