import React from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { isMobileView } from '../../helper/commonHelper';

function GoBack({label='', labelClassName="text-14", arrowFontSize="18", handleGoBack}) {
    return (
        <div className="flex text-B5B5B5 col-gap-10">
            <div
              className={"flex col-gap-8 cursor-pointer align-center " + (isMobileView() ? 'margin-t10' : '')}
              onClick={handleGoBack}
            >
              <ArrowBackRoundedIcon sx={{fontSize: `${arrowFontSize}px`}} />
              
              {
                label &&
                <div className={"font-500 " + (labelClassName || '')}>{label}</div>
              }
            </div>
        </div>
    )
}

export default GoBack;