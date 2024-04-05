import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DelistIcon from '../../assets/images/delistIcon.svg'
import { NewButton } from "../NewCustomButton";

export default function MenuCommonComponent({ threeDots, dataList, handleParentClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuClick = () => {
    handleParentClick();
    handleClose();
  }

  return (
    <div>
      <img
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        src={threeDots}
        alt="three dots"
        height="15px"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dataList?.map((obj) => (
            <React.Fragment key={obj.id}>
                <MenuItem onClick={menuClick}>
                    {obj.value}
                </MenuItem>
            </React.Fragment>
        ))}
      </Menu>
      {/* <NewButton className='admin-cue-card-edit capitalize custom-color-red flex justify-center align-center gap-5' variant={'contained'}>
         <img src={DelistIcon} height="15px" width='15px'/><span>De-list Seller</span> 
      </NewButton> */}  
    </div>
  );
}
