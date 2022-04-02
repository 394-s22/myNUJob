import React, { Component } from 'react'


const openLink = (url) => {
    window.open(url)
}

const Job = ({ job }) => {
    return (
        <div className='container-fluid' onClick={() => openLink(job.link)}>
            <div className="card">
                <div className="card-title"> {job.title} </div>
                <div className="card-body">
                    <div className="row">
                        <div className='card-text col-sm'> {job.pay} </div>
                        <div className='card-text col-sm'> {job.term} </div>
                        <div className='card-text col-sm'> {job.location} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job