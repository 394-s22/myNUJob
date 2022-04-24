import React from 'react'
import Job from './Job.js'

const JobList = ({ jobs, filterCategories, sortDirection }) => {

  switch (sortDirection) {

    case "Increasing Wage":
      jobs.sort((a, b) => { return a["PAY RATE"][0] - b["PAY RATE"][0] });
      break;

    case "Decreasing Wage":
      jobs.sort((a, b) => { return b["PAY RATE"][0] - a["PAY RATE"][0] });
      break;

    case "Alphabetical Order":
      jobs.sort((a, b) => { return a.TITLE.substring(a.TITLE.indexOf(":")+1).localeCompare(b.TITLE.substring(b.TITLE.indexOf(":")+1)); });
      break;

    default:
      jobs.sort((a, b) => { return a.TITLE.substring(a.TITLE.indexOf(":")+1).localeCompare(b.TITLE.substring(b.TITLE.indexOf(":")+1)); });
      break;
  }

  jobs = jobs.filter(j => !j.TITLE.includes("General Info"));

  // console.log(jobs[0].TITLE);

  return (
    <ul className="cards">
      {filterCategories.length === 0 ?
        Object.values(jobs).map((j) =>
          <Job job={j} key={j.ID} />) :
        jobs.filter(j => filterCategories.includes(j.CATEGORY)).map((j) =>
          <Job job={j} key={j.ID} />)
      }
    </ul>
  )
}

export default JobList;
