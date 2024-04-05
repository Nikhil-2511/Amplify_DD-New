import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./Styles/main-style.scss";
import { Provider } from "react-redux";
import store from "./Redux";
import { GA_ID, TEST_ENVIRONMENT } from "./config";
import ReactGA from "react-ga4";
import posthog from "posthog-js";
import { PostHogProvider} from 'posthog-js/react'

const root = ReactDOM.createRoot(document.getElementById("root"));
if (GA_ID) {
  ReactGA.initialize(GA_ID, {
    debug: TEST_ENVIRONMENT,
  });
}

if(process.env.REACT_APP_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true
});
}

root.render(
  <PostHogProvider client={posthog}>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  </PostHogProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();