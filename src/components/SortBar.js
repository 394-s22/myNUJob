import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import '../styles/SortBar.css'
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(theme => ({
//   basicMenu: {
//     color: "purple"
//   }
// }));

const SortBar = ({ sortDirection, setSortDirection, dataCy }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  // const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    const direction = e.target.innerText;
    if (direction) {
      setSortDirection(direction);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        data-Cy={dataCy}
      >
        Sort by
      </Button>
      <Menu
        id="basic-menu"
        // className={classes.basicMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} data-cy='increasing-wage-button'>Increasing Wage</MenuItem>
        <MenuItem onClick={handleClose} data-cy='decreasing-wage-button'>Decreasing Wage</MenuItem>
        <MenuItem onClick={handleClose} data-cy='alphabetical-order-button'>Alphabetical Order</MenuItem>
      </Menu>
    </div>
  )
}

export default SortBar