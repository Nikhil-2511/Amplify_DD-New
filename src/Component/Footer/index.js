import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { linkedinIcon, twitterIcon } from '../../assets/icons/svgIcons';
import  InstagramIcon  from '../../assets/images/InstagramIcon.svg';
import MainLogo from '../../assets/images/mainLogo.svg'
import './style.scss';
import { isMobileView } from '../../helper/commonHelper';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


function Footer() {
  return (
    <div className="footer-container primary-theme">
      <div className="container">
        <div className="footer-grid">
          <div className='footer-link-wrapper grid-justify-self-baseline'>
            <Link className='logo-container'>
            {
              isMobileView() ? 
              <img src={MainLogo} alt="brand logo"/> 
              :
              <img src="https://uploads-ssl.webflow.com/62fa353a13a89730e2603bca/62fa4daa992a3b409ed365c0_Group%2029%20(1).svg" alt="brand logo" />
            }
            </Link>
          </div>
          <div className='footer-link-wrapper grid-justify-self-end footer-links-grid'>
            {/* <div className='footerlink-subgrid'>
              <div className='font-600 heading2'>PRODUCTS</div>
              <a href="https://www.done.deals" target="_blank">For Founders</a>
              <a href={`${APP_BASE_URL}buyer/login`} target="_blank">For Buyers</a>
            </div> */}
            <div className='footerlink-subgrid'>
              <div className='font-600 heading2'>COMPANY</div>
              <a href="https://www.done.deals/about-us" target="_blank">About</a>
            </div>
            <div className='footerlink-subgrid'>
              <div className='font-600 heading2'>RESOURCES</div>
              <a href="https://www.done.deals/#faq-section" target="_blank">FAQ</a>
              <a href="https://www.done.deals/contact-us" target="_blank">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-compay-policy">
          <div className='grid-container'>
            <Stack direction={{ xs: 'column', sm: 'row' }}
              columnGap={{ xs: 1, sm: 2, md: 4 }}
              rowGap={{ xs: 4 }}
              className="margin-b20">
              <div>©2024 Done Deal</div>
              <a href="https://www.done.deals/privacy-policy" target="_blank">Privacy Policy</a>
              <a href="https://www.done.deals/t-c" target="_blank">Terms of Use</a>
            </Stack>
            <Stack direction={{ xs: 'row' }}
              spacing={{ xs: 2, sm: 2, md: 4 }}
              className="footer-social-links">
              <a href="https://www.linkedin.com/company/donedeals/" target="_blank">{linkedinIcon}</a>
              <a href="https://www.instagram.com/donedeal.club/" target="_blank"><img src={InstagramIcon}/></a>
              {/* <Link>{twitterIcon}</Link> */}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;