import React from 'react';
import InactiveCheckbox from '../../assets/images/inactivecheckbox.svg';
import ActiveChekbox from '../../assets/images/activeCheckbox.svg';

function CustomCheckboxIcon({isActive}) {
    return (
        isActive ? <img className='checkbox-icon' src={ActiveChekbox} alt="checkbox" />
        :
        <img className='checkbox-icon' src={InactiveCheckbox} alt="checkbox" />
    )
}

export default CustomCheckboxIcon;