import ReactGA from "react-ga4";

export const trackGA4Event = (eventName, otherProp={}) => {
    ReactGA.event({
        category: eventName,  // Custom event name
        ...otherProp  // Additional parameters
    });
  };

export const setUserTypeProperty = (value) => {
    ReactGA.gtag("set", "user_properties", {
        userType: value,
    });
};