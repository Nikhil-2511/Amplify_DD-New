import React from 'react';

function TitleBox({title, desc, className, descClassName}) {
    return (
        <div>
            <h2 className={' ' + (className || '')}>{title}</h2>
            <p className={'' + (descClassName || '')}>{desc}</p>
        </div>
    )
}

export default TitleBox;