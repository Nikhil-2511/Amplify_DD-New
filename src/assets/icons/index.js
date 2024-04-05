import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import SvgIcon from '@mui/material/SvgIcon';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const CrossIcon = (props) => {
  return <CloseIcon {...props} />
}

export const CheckboxIconChecked = (props) => {
  return <CheckBoxIcon {...props} />
}

export const CheckboxIconUnchecked = (props) => {
  return <CheckBoxOutlineBlankIcon {...props} />
}

export const StepCompletedIcon = (props) => {
  return <SvgIcon {...props}>
      <circle cx="17" cy="17" r="17" transform="rotate(-90 17 17)" fill="white"/>
      <path d="M10.4062 17.0192L14.7298 21.3497C14.925 21.5452 15.2418 21.5454 15.4372 21.35L23.2598 13.5273" stroke="#3247FF" strokeWidth="3" stroke-linecap="round"/>
    </SvgIcon>
}

export const StepDefaultIcon = (props) => {
  return <SvgIcon {...props}>
      <circle cx="17" cy="17" r="14.195" transform="rotate(-90 17 17)" stroke="white" strokeWidth="5.61006"/>
    </SvgIcon>
}

export const StepActiveIcon = (props) => {
  return <SvgIcon {...props}>
      <circle cx="17" cy="17" r="14.195" transform="rotate(-90 17 17)" stroke="white" strokeWidth="5.61006"/>
      <ellipse cx="17" cy="17" rx="7" ry="7" transform="rotate(-90 17 17)" fill="white"/>
  </SvgIcon>
}

export const AdvanceFilterSvgWrraper = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 12H18M3 6H21M9 18H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  )
}

export const SearchIconSvg = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#BBBBBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  )
}

export const HelpIcon = (props) => {
  return (
    <HelpOutlineIcon {...props} />
  )
}

export const BackArrow = (props) => {
  return (
    <ArrowBackIcon {...props} />
  )
}

export const RightArrow = (props) => {
  return (
    <ArrowForwardIcon {...props} />
  )
}

// export const PencilIcon = (props) => {
//   return (
//     <SvgIcon width="18" height="17" {...props}>
//       <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M9 15.6667H16.5M12.75 1.91669C13.0815 1.58517 13.5312 1.39893 14 1.39893C14.2321 1.39893 14.462 1.44465 14.6765 1.53349C14.891 1.62233 15.0858 1.75254 15.25 1.91669C15.4142 2.08085 15.5444 2.27572 15.6332 2.4902C15.722 2.70467 15.7678 2.93455 15.7678 3.16669C15.7678 3.39884 15.722 3.62871 15.6332 3.84319C15.5444 4.05766 15.4142 4.25254 15.25 4.41669L4.83333 14.8334L1.5 15.6667L2.33333 12.3334L12.75 1.91669Z" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
//       </svg>
//     </SvgIcon>
//   )
// }