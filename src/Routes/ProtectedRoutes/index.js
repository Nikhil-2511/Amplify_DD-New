import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Services";

const ProtectedRoute = ({children, redirectPath}) => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        if (!isAuthenticated()) {
            setIsLoggedIn(false);
            return navigate(redirectPath);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;