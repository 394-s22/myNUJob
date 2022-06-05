
import React, { useState } from 'react';
import '../styles/Job.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const openLink = (url) => {
    window.open(url)
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const Job = ({ job }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='container-fluid' >
            <div className="card">
                <div className="card-title"> {job.TITLE.substring(job.TITLE.indexOf(":")+1)}
                    <button className='apply-button'
                        onClick={handleOpen}>
                        <b>More Info</b>
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        dataTestID="mui-modal"
                    >
                        <Box sx={style}>
                            {/* {Object.entries(job).map(([key, value]) => {
                                return (
                                    <div>
                                        {key}:{value}
                                    </div>)})} */}
                            <h2>{job.TITLE.substring(job.TITLE.indexOf(":")+1)}</h2>
                            <div><b>JOB DESCRIPTION:</b> {job["JOB DESCRIPTION"]}</div>
                            <div><b>QUALIFICATIONS:</b> {job["QUALIFICATIONS"]}</div>
                            <div><b>TERM AVAILABLE:</b> {job["TERM AVAILABLE"]}</div>
                            <div><b>LOCATION:</b> {job["LOCATION"]}</div>
                            <div><b>WORK ARRANGEMENTS:</b> {job["WORK ARRANGEMENTS"]}</div>
                            <div><b>DEPARTMENT:</b> {job["DEPARTMENT"]}</div>
                            <div><b>PAY RATE:</b> {job["PAY RATE"][0]}</div>
                            <div><b>CONTACT NAME:</b> {job["CONTACT NAME"]}</div>
                            <div><b>CONTACT PHONE NUMBER:</b> {job["CONTACT PHONE NUMBER"]}</div>
                            <div><b>CONTACT EMAIL:</b> {job["CONTACT EMAIL"]}</div>
                        </Box>
                    </Modal>

                </div>
                <div className="card-category">
                    {job.DEPARTMENT}
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className='card-text col-sm'> ${job["PAY RATE"][0]}/hr </div>
                        <div className='card-text col-sm'> {job["WORK ARRANGEMENTS"]} </div>
                        <div className='card-text col-sm'> {job.LOCATION} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job