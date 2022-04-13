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

const SortBar = ({sortDirection, setSortDirection}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl;
    // const classes = useStyles()

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
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
          <MenuItem onClick={handleClose}>Increasing wage</MenuItem>
          <MenuItem onClick={handleClose}>Decreasing wage</MenuItem>
        </Menu>
      </div>
    )
}

export default SortBar