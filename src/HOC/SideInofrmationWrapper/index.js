import React from 'react';

function SideInformationWrapper({OriginalComponent, className, cardData={}, cardModel, title, description, icon, descriptionClass='text-475467', hideIconContainer, iconClass='max-w20px'}) {
    function newComponent (props) {
        return (
            <div className={'box-shadow-type1 padding-16 rounded-8 ' + (className || '')}>
                <div className='flex col-gap-20 align-center'>
                    <div className={'flex flex-center ' + (hideIconContainer ? '' : 'bg-F5FBEE rounded-8 h-64px max-w64px w-full')}>
                        {
                            icon &&
                            <img className={'' + (iconClass)} src={icon} alt=""/>
                        }
                    </div>
                    <div>
                        <h6 className={'text-18 margin-0 ' + (hideIconContainer ? '' : 'padding-b10')}>{title}</h6>
                        { description && <p className={'text-14 margin-t0 ' + (descriptionClass)}>{description}</p>}
                    </div>
                </div>
                <OriginalComponent {...props} />
            </div>
        )
    }

    return newComponent;
}

export default SideInformationWrapper;