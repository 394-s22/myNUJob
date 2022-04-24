import React from 'react'
import '../styles/Job.css'

const openLink = (url) => {
    window.open(url)
}

const Job = ({ job }) => {
    return (
        <div className='container-fluid' >
            <div className="card">
                <div className="card-title"> {job.TITLE.substring(job.TITLE.indexOf(":")+1)}
                    <button className='apply-button'
                        onClick={() => openLink(job.URL)}>
                        <b>More Info</b>
                    </button>
                </div>
                <div className="card-category">
                    {job.DEPARTMENT}
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className='card-text col-sm'> ${job["PAY RATE"]}/hr </div>
                        <div className='card-text col-sm'> {job["TERM AVAILABLE"]} </div>
                        <div className='card-text col-sm'> {job.LOCATION} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job