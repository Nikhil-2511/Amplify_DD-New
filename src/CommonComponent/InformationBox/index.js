import React, { useEffect, useRef, useState } from 'react';
import { CrossIcon } from '../../assets/icons';
import informationIcon from '../../assets/icons/ellipseIcon.svg';
import './style.scss';
import useOutsideClick from '../../helper/useDetectClickOutside';

function InformationBox ({content, bodyPosition, iconClass='', reset}) {
  const [toggleInformation, setToggleInformation] = useState(false);
  const dropdownRef = useRef();

  useOutsideClick(dropdownRef, () => setToggleInformation(false));

  return (
    <div className='relative information-box-container' ref={dropdownRef}>
      <div className='information-box-icon cursor-pointer' onClick={() => setToggleInformation(!toggleInformation)}><img className={'' + (iconClass)} src={informationIcon} /></div>
      {
        toggleInformation &&
        <div className={'information-box-body ' + (bodyPosition ? bodyPosition : 'default-position')}>
          <CrossIcon sx={{position: 'absolute', right: 5, top: 5, fontSize: 16, cursor: 'pointer'}} onClick={() => setToggleInformation(false)}/>
          {content}
        </div>
      }
    </div>
  )
}

export default InformationBox;