import React, { useEffect, useState } from 'react';
import { API_SUCCESS_CODE } from '../../constants';
import EditCuecard from '../EditCuecard';
import ModalWrapper from '../../ModalWrapper';
import { getCueCardDetails } from '../../helper/commonHelper';
import { ENDPOINT } from '../../config/endpoint';

const styles = {
    maxWidth: 800,
    height: '90vh',
    overflowY: 'auto'
}

function EditCuecardModal(props) {

    return (
        <div className='edit-cuecard-modal'>
            <EditCuecard {...props}/>
        </div>
    )
}

export default ModalWrapper(EditCuecardModal, 'Cue card edit', false, styles);