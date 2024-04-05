import React, { useEffect } from 'react';
import { isAuthenticated, isBuyerUser } from '../../Services';
import { useNavigate, useParams } from 'react-router-dom';

function DealLinkContainer({}) {
    const navigate = useNavigate();
    const useParamValue = useParams();

    useEffect(() => {
        let url = 'https://www.done.deals/login';
        if(isAuthenticated()) {
            if(isBuyerUser()) {
                url = `/buyer/cue-card/${useParamValue?.uid || ''}`
            }
            else {
                url = '/deals'
            }
            navigate(url);
        }
        else {
            const link = document.createElement("a");
            link.href = url;
            link.click();
            link.remove();
        }
    }, [])

    return ''
}

export default DealLinkContainer;