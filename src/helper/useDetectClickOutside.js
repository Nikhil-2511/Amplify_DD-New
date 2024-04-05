import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (evt) => {
            if (ref.current && !ref.current.contains(evt.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};

export default useOutsideClick;

/* Usage 

useOutsideClick(impactRef, () => setimpactDropDown(false));

    return (
        <div ref={impactRef} className="wrapper"></div>
    );
*/