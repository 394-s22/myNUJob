import React from 'react'
import '../styles/Job.css'

const openLink = (url) => {
    window.open(url)
}

const Job = ({ job }) => {
    return (
        <div className='container-fluid' >
            <div className="card">
                <div className="card-title"> {job.title} 
                    <button className='apply-button'
                        onClick={() => openLink(job.link)}>
                        <b>Apply</b>
                    </button>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className='card-text col-sm'> ${job.pay}/hr </div>
                        <div className='card-text col-sm'> {job.term} </div>
                        <div className='card-text col-sm'> {job.location} </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job