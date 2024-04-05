import { Button, Pagination, useTheme } from '@mui/material';
import React from 'react';
import { BackArrow, RightArrow } from '../../assets/icons';
import { isMobileView } from '../../helper/commonHelper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';

function CustomPagination({page, count, onChange, className, shape="rounded", ...rest}) {
    const theme = useTheme();
    const isMobile = isMobileView();
    return (
        <div className={'table-pagination-container ' + (className || '') }>
            <div>
                {
                    isMobile ? 
                    <IconButton aria-label="prev" fontSize="small" onClick={(e) => onChange(e, page - 1)} disabled={page === 1 ? true : false}>
                        <KeyboardArrowLeftIcon fontSize="small"/>
                    </IconButton>
                    :
                    <Button sx={{color: theme.palette?.tableGridStyling?.contrastText, border: `1px solid ${theme.palette?.tableGridStyling?.actionBorder}`, boxShadow:'0px 1px 2px 0px #1018280D', fontWeight: 500, padding: '5px 14px'}} disabled={page === 1 ? true : false} className="capitalize" size="medium" onClick={(e) => onChange(e, page - 1)} startIcon={<BackArrow />} >Previous</Button>
                }
                {/* <Button sx={{color: '#344054'}} disabled={page === 1 ? true : false} className="capitalize" size="medium" variant="outlined" onClick={() => onChange('prev')} startIcon={<BackArrow />}>Previous</Button> */}
            </div>
            <div>
                <Pagination shape={shape} count={count} hideNextButton={true} hidePrevButton={true} page={page} onChange={(event, value) => onChange(event, value)} {...rest} />
            </div>
            <div>
                {
                    isMobile ? 
                    <IconButton aria-label="next" fontSize="small" onClick={(e) => onChange(e, page + 1)} disabled={page === count ? true : false}>
                        <KeyboardArrowRightIcon fontSize="small" />
                    </IconButton>
                    :
                    <Button sx={{color: theme.palette?.tableGridStyling?.contrastText, border: `1px solid ${theme.palette?.tableGridStyling?.actionBorder}`, boxShadow:'0px 1px 2px 0px #1018280D', fontWeight: 500, padding: '5px 14px', '&..Mui-disabled': {color: theme.palette?.tableGridStyling?.contrastText}}} disabled={page === count ? true : false} className="capitalize" size="medium" onClick={(e) => onChange(e, page + 1)} endIcon={<RightArrow />}>Next</Button>
                }
            </div>
        </div>
    )
}

export default CustomPagination;