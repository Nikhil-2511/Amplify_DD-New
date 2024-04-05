import React from 'react';
import { getDate, getValueFromArr } from '../../helper/commonHelper';
import { Chip } from '@mui/material';
import { AllNotesArr } from '../../CommonModels/CommonCollection';
import './style.scss';
import NoteListItem from '../NoteListItem';

function NotesListCard({noteLists, handleRefreshApi}) {
    return (
        <div className='notes-list-container'>
            <div className='flex row-gap-24 col-gap-24 flex-wrap'>
                {
                    noteLists?.length > 0 &&
                    noteLists.map((noteListItem, index) => {
                        return (
                            <NoteListItem className={'border border-D0D5DD rounded-4 padding-24'} noteListItem={noteListItem}  key={noteListItem?.title + index} handleRefresh={handleRefreshApi} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NotesListCard;