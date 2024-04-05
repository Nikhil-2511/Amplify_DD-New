import styled from '@emotion/styled';
import { Avatar, Divider, IconButton, Menu, MenuItem, withStyles } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutIcon, supportIcon } from '../../assets/icons/svgIcons';
import { globalMessage, handleLogoCLick, isMobileView } from '../../helper/commonHelper';
import { loginUserSuccess, logoutUser } from '../../Redux/slice/LoginSlice';
import { isAuthenticated, isSellerUser } from '../../Services';
import { clearLocalStorage } from '../../utils';
import MainLogo from '../../assets/images/mainLogo.svg'
// Component CSS
import './style.scss';
import { handleLogoutUser } from '../../helper/actionHelper';
const StyledMenu = styled((props) => (
  <Menu {...props} />
))(() => ({
  '& .MuiMenu-paper': {
    border: '1px solid #282828',
    background: '#121212',
    color: '#fff',
    borderRadius: 13,
    top: '75px !important'
  }
}
))


function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#3247FF',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    handleLogoutUser('/login');
  };

  function redirectUser() {
    let path = handleLogoCLick();
    navigate(path);
  }

  return (
    <nav className="navbar-wrapper primary-theme">
      <div className="navbar-content flex justify-space-between container align-center container">
        <div className="logo-container cursor-pointer" onClick={redirectUser}>
            {
              isMobileView() ? 
              <img src={MainLogo} alt="brand logo"/> 
              :
              <img src="https://uploads-ssl.webflow.com/62fa353a13a89730e2603bca/62fa4daa992a3b409ed365c0_Group%2029%20(1).svg" alt="brand logo" />
            }
           
        </div>
        <div className="flex navbar-links-container align-center">
          {
            !isAuthenticated() && pathname !== '/login' &&
            <Link to="/login" className="navbar-links">Login</Link>
          }
          {
            !isAuthenticated() && pathname === '/login' &&
            <Link to="/signup" className="navbar-links">Signup</Link>
          }
          {
            isAuthenticated() &&
            <div className='relative'>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                size="small"
                onClick={handleMenu}
              >
                {/* <Avatar {...stringAvatar('Kent Dodds')} /> */}
                <Avatar src="/broken-image.jpg" />
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleLogout()}>{logoutIcon} <span className='margin-l10'>Logout</span></MenuItem>
                <Divider sx={{ background: '#282828' }} />
                <MenuItem>{supportIcon}<a href='https://www.done.deals/contact-us' className='margin-l10' target="_blank">Contact & Support</a></MenuItem>
              </StyledMenu>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Header;