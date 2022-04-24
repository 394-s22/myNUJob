
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
                <div className="card-title"> {job.TITLE}

                    <button className='apply-button'
                        onClick={handleOpen}>
                        <b>More Info</b>
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            {Object.entries(job).map(([key, value]) => {
                                return (
                                    <div>
                                        {key}:{value}
                                    </div>)})}
                        </Box>
                    </Modal>

                </div>
                <div className="card-category">
                    {job.DEPARTMENT}
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className='card-text col-sm'> ${job["PAY RATE"][0]}/hr </div>
                        <div className='card-text col-sm'> {job["TERM AVAILABLE"]} </div>
                        <div className='card-text col-sm'> {job.LOCATION} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job