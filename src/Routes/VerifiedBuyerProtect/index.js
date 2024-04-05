import React, { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Services";
import { useSelector } from "react-redux";

const VerifiedBuyerProtect = ({children, redirectPath, protectedRedirection}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isBuyerVerified, setIsBuyerVerified] = useState(false);
    const buyerVerificationStore = useSelector((state => state.buyerVerificationStore ))

    const checkUserToken = () => {
        if(isAuthenticated()) {
            if(!buyerVerificationStore.isLoading){
                if(buyerVerificationStore && buyerVerificationStore?.buyerVerificationState && buyerVerificationStore?.buyerVerificationState?.status) {
                    if(!buyerVerificationStore?.buyerVerificationState?.tncCompleted && buyerVerificationStore?.buyerVerificationState?.primaryMember) {
                        setIsBuyerVerified(false);
                        return navigate('/buyer/profile');
                    }
                    if(buyerVerificationStore?.buyerVerificationState?.status !== 'verified') {
                        setIsBuyerVerified(false);
                        return navigate(protectedRedirection);
                    }
                    setIsBuyerVerified(true);
                }
            }
        }
        else {
            navigate(redirectPath);
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isBuyerVerified, buyerVerificationStore]);

    return (
        <React.Fragment>
            {
                isBuyerVerified ? children : null
            }
        </React.Fragment>
    );
}
export default VerifiedBuyerProtect;