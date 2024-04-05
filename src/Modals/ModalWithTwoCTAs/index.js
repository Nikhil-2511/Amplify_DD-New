import { Button, Modal } from "@mui/material";
import React from "react";
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import ModalWrapper from "../../ModalWrapper";
import { NewButton } from "../../CommonComponent/NewCustomButton";

const styles = {
    maxWidth: 400
}

function ModalWithTwoCTAs({children, cancelLabel='cancel', confirmLabel='Yes, abort', handleConfirm, handleCancel}) {
    return (
        <React.Fragment>
            <div className=''>{children}</div>
            <div className='margin-t20 flex col-gap-12 '>
                <Button
                    className="capitalize"
                    fullWidth
                    sx={{ color: "#1D2939", fontWeight: 500 }}
                    variant="text"
                    onClick={handleCancel}
                >
                {cancelLabel}
                </Button>
                <NewButton
                    fullWidth
                    className={`capitalize`}
                    sx={{ fontWeight: 500, background: '#D92D20', '&:hover': {background: '#D92D20' }}}
                    variant="contained"
                    onClick={handleConfirm}
                    >
                    {confirmLabel}
                </NewButton>
            </div>
        </React.Fragment>
    )
}

export default ModalWrapper(ModalWithTwoCTAs, 'Abort Sending Interest?', WarningCircularIcon, styles);