import React from 'react';

function TrackerComponent({Component, ...rest}) {
    return <Component {...rest} />
}

export default TrackerComponent;