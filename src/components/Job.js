import React, { Component } from 'react'

const Job = ({ job }) => {
    return (
        <div className='container-fluid'>
            <div className="card" >
                <div className='card-title'> {job.title} </div>
                <div className='card-text'> {job.pay} </div>
                <div> {job.term} </div>
                <div> {job.location} </div>
            </div>
        </div>
    )
}

export default Job