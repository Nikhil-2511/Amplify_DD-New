import React, { useEffect, useState } from 'react';
import EditCuecardModal from '../../Component/EditCuecardModal';
import { getCueCardDetails } from '../../helper/commonHelper';
import { API_SUCCESS_CODE } from '../../constants';

function EditCueCardContainer({companyId, ...rest}) {
    const [showModal, setShowModal] = useState(false);
    const [cueCardData ,setCueCardData] = useState({});

    useEffect(() => {
        fetchData(companyId);
    }, [])

    function fetchData(companyId) {
        getCueCardDetails(companyId, handleCallback);
    }

    function handleCallback(res) {
        if(res.status === API_SUCCESS_CODE) {
            setCueCardData(res?.data);
            setShowModal(true);
        }
    }
    return (
        <React.Fragment>
            {
                showModal &&
                <EditCuecardModal cueCardData={cueCardData} {...rest} />
            }
        </React.Fragment>
    )
}

export default EditCueCardContainer;