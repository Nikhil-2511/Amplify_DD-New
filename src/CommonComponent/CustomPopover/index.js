import React, { useState } from 'react';
import './style.scss';

function CustomPopover({title, placement='bottom', children}) {
    const [tooltip, setTooltip] = useState(false);
    return (
        <div className='custom-popover-container' onMouseEnter={() => setTooltip(true)} onMouseLeave={()=> setTooltip(false)}>
            {tooltip && <div className={'custom-popover-content ' + (placement)}>{title}</div>}
            {children}
        </div>
    )
}

export default CustomPopover;