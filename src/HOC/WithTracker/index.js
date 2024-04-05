import React, { useEffect } from 'react';
import { DefaultPageMeta } from '../../helper/PageMeta';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router-dom';

function WithTracker({children, metaData={}, options={}}) {
    const location = useLocation();
    const trackPage = page => {
        ReactGA.send({ hitType: "pageview", page , title: "Custom Title" });
        
      };

    useEffect(() => {
        updateDocumentTitle();
    }, [])

    useEffect(() => {
        // ReactGA.pageview(location.pathname)
        trackPage(location.pathname);
    }, [location])

    function updateDocumentTitle() {
        document.title = metaData?.title || DefaultPageMeta.title;
    }
    
      return children;
}

export default WithTracker;