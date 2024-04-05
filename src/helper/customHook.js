import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useDebounce = (func, timeout = 700) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const useLocationChange = (action) => {
  const location = useLocation();
  const previousLocation = usePrevious(location);

  useEffect(() => {
    action(location, previousLocation)
  }, [location])
}

const usePrevious = (value) => {
  const ref = useRef()
  React.useEffect(() => { ref.current = value })

  return ref.current
}

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}