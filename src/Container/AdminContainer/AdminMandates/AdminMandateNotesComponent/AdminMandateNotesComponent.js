import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NotesComponent from '../../../../Component/NotesComponent';
import { updateAppHeaderState } from '../../../../Redux/slice/AppNavigationSlice';

function AdminMandateNotesComponent(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        return () => dispatch(updateAppHeaderState(false));
    }, [])

    return (
        <NotesComponent 
            {...props}
        />

    )
}

export default AdminMandateNotesComponent;