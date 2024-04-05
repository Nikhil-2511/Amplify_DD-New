import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { isAuthenticated, isBuyerUser, reRouteUser } from "../../Services";
import { useSelector } from "react-redux";

const NonProtectedRoute = ({children, redirectPath}) => {

    const navigate = useNavigate();
    const [nonLoggedInUser, setNonLoggedInUser] = useState(false);
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    const checkUserToken = () => {
        if (isAuthenticated()) {
            if(isBuyerUser() && buyerVerificationState?.onboardingStage === 1) {
                navigate('/buyer/onboarding');
            }
            else {
                reRouteUser(navigate);
                return;
            }
        }
        setNonLoggedInUser(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [nonLoggedInUser]);

    return (
        <React.Fragment>
            {
                nonLoggedInUser ? children : null
            }
        </React.Fragment>
    );
}
export default NonProtectedRoute;