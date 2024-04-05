import React, { useState } from 'react';
import RecommendedModal from '../../RecommendedModal';

function RecommendedSeller({buttonLabel, ...rest}) {
    const [showActionModal, setShowActionModal] = useState(false);

    function onClose() {
        setShowActionModal(false);
    }


    return (
        <div className="">
            <div className='create-note-button padding-16' onClick={() => setShowActionModal(true)}>
                <div className='text-white'>
                    <div className='square-outline'>
                        +
                    </div>
                </div>
                <span className='margin-l12'>{buttonLabel}</span>
            </div>
            {
                showActionModal &&
                <RecommendedModal onClose={onClose} {...rest} />
            }
        </div>
    )
}

export default RecommendedSeller;