import React from 'react';
import NewInformationIcon from '../../assets/images/newInformationIcon.svg';

function InformationStrip({icon, description, parentClassName='', descriptionClassName='', imageClassName=''}) {
    return (
        <div className={'flex align-center ' + (parentClassName)}>
            <div className={'' + (imageClassName)}>
                <img src={(icon ||NewInformationIcon)} alt="" />
            </div>
            <div className={'' + (descriptionClassName)}>
                {description}
            </div>
        </div>
    )
}

export default InformationStrip