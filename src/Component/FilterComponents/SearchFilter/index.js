import React, { useCallback, useEffect, useState } from 'react';
import NewTextField from '../../../CommonComponent/NewTextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BlueSearchIcon from '../../../assets/images/blueSearchIcon.svg';

function SearchFilter({selectedValue='', className, parentClass, handleOnSearchChange, placeholder, themeBasedParentClass = ' bg-F2F4F7 text-98A2B3 rounded-4'}) {
    const [showDropDown, setShowDropdown] = useState(false);
    const [searchedText, setSearchedText] = useState('');

    function handleChange(value) {
        setSearchedText(value)
    }

    useEffect(() => {
            handleDefaultSearch();
    }, [selectedValue])

    const handleDefaultSearch = useCallback(() => {
        setSearchedText(selectedValue);
    }, [selectedValue])

    function handleOnClick() {
        if(searchedText) handleOnSearchChange(searchedText);
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleOnClick();
      }
    };

    return (
        <div className={'search-filter-container filter-dropdwon-container ' + (parentClass || '') + (themeBasedParentClass || '')} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <div className={'filter-label cursor-pointer padding-x8 padding-y10 ' + (className || '')}>
                <SearchOutlinedIcon sx={{color: '#BBBBBB', fontSize: '18px'}} />
            </div>
            {
                showDropDown &&
                <div className='filter-body-wrapper search-filter-body'>
                    <div className='filter-body padding-x16 padding-y12 bg-white'>
                        <div className='flex col-gap-8 justify-space-between align-center'>
                        {/* * @params {color, fontSize, fontWeight, padding, lineHeight, borderRadius, borderColor, disabledColor, backgroundColor, errorColor, typographyColor, typographySize}  */}
                            <NewTextField
                                className="rounded-8 "
                                onChange={(e) => handleChange(e.target.value)}
                                size="small"
                                fullWidth
                                autoComplete='off'
                                placeholder={placeholder}
                                value={searchedText} 
                                onKeyUp={handleKeypress}
                                color="#000"
                                fontSize="12px"
                                padding="8px 16px"
                                lineHeight="18px"
                                borderColor = "#F2F4F7"
                                disabledColor="#98A2B3"
                                backgroundColor="#F2F4F7"
                            />
                            <div className='cursor-pointer flex' onClick={handleOnClick}>
                                {/* <SearchOutlinedIcon sx={{color: '#2E90FA', fontSize: '20px', cursor: 'pointer'}} onClick={handleOnClick} /> */}
                                <img className='' src={BlueSearchIcon} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchFilter;