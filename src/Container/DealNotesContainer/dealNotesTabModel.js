import PaperclipBlueIcon from '../../assets/images/paperclipBlueIcon.svg';
import PaperclipGreyIcon from '../../assets/images/paperclipGreyIcon.svg';
import ActivityBlueIcon from '../../assets/images/activityBlueIcon.svg';
import ActivityGreyIcon from '../../assets/images/activityGreyIcon.svg';

function prepareTabDefaultFilter(noteType, uid) {
    return (
        {
            noteIdType: noteType, 
            primaryid: uid
        }
    )
}

export function DealNotesTabModel() {
    return (
        [
            {
                customComponent: true,
                activeIcon: PaperclipBlueIcon,
                inActiveIcon: PaperclipGreyIcon,
                label: 'Notes',
            },
            {
                customComponent: true,
                activeIcon: ActivityBlueIcon,
                inActiveIcon: ActivityGreyIcon,
                label: 'Activity',
            }
        ]
    )
}
