import { FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';
import { buildingIconWhite, calenderIconWhite, statusIconWhite } from '../../../assets/icons/svgIcons';
import CustomCheckbox from '../../../CommonComponent/CustomCheckbox';
import CustomRadio from '../../../CommonComponent/CustomRadio';
import { filters } from '../filtersObject';
import EditIcon from '@mui/icons-material/Edit';
import './style.scss';

function FiltersSection({selectedFilters, handleFilters}) {
  const [category, setCategory] = useState(filters);

  const handleChange = (e) => {
    let value = e.target.value;
  }

  function handleResetFilters() {
    setCategory(filters);
  }

  return (
    <div className='filter-section-container '>
      <div className="padding-b25 flex justify-space-between align-center">
        <span className='heading1 font-500'>Filters</span>
        <span className='cursor-pointer' onClick={handleResetFilters}>Reset</span>
      </div>
      {
        Object.keys(category).map((key, index) => {
          let obj = category[key];
          if(obj.type === 'industry') {
            return (
              <div key={index} className="padding-b25">
                <div className='filters-label'>{buildingIconWhite} <span>{obj.label}</span></div>
                <FormGroup className='form-content'>
                  {
                    obj?.data?.length > 0 &&
                    obj.data.map((filterData, i) => {
                      return (
                        <FormControlLabel 
                          key={filterData.label + i}
                          className='text-B5B5B5 form-content-padding' 
                          label={filterData.label} labelPlacement="end"
                          control={<CustomCheckbox 
                            checked={filterData.isActive} 
                            size="small"
                            sx={{color: '#B5B5B5', '&.Mui-checked': {color: '#B5B5B5'}}} 
                            onChange={(e) => handleChange(e, key, i)} />} 
                          />
                      )
                    })
                  }
                </FormGroup>
              </div>
            )

          }
          else {
            return (
              <div className="padding-b25" key={index}>
                <div className='filters-label'>{statusIconWhite} <span>{obj.label}</span></div>
                <FormGroup className='form-content'>
                  {
                    obj?.data?.length > 0 &&
                    obj.data.map((filterData, k) => {
                      return (
                            <FormControlLabel 
                              key={filterData.label + k} 
                              className='form-content-padding text-B5B5B5' 
                              control={
                                        <CustomRadio checked={filterData.isActive} value={filterData.label} onChange={(e) => handleChange(e, key, k)} 
                                        sx={{color: '#B5B5B5', '&.Mui-checked': {color: '#B5B5B5'}}} />
                                      } 
                              label={filterData.label} labelPlacement="end"/>
                            )
                    })
                  }
                </FormGroup>
              </div>
            )
          }
        })
      }
      {/* <div className='filters-date-picker-container'>
        <div className='filters-label'>{calenderIconWhite} <span>Date</span></div>
        <div>

        </div>
      </div> */}
      <div className='filers-ask-price-container'>
        <div className='filters-label'>{'₹'} <span>Ask Price</span></div>
        <div className='filter-input-container'>
          <input className='filters-input' data-filter-input="text" value={"email"} onChange={(e) => {}} size="small" placeholder="Add business email" />
          <div className='filters-edit-icon'><EditIcon sx={{fontSize: 14, color: '#B5B5B5'}} /></div>
        </div>
        <div className='filter-input-container'>
          <input className='filters-input' data-filter-input="text" value={"email"} onChange={(e) => {}} size="small" placeholder="Add business email" />
          <div className='filters-edit-icon'><EditIcon sx={{fontSize: 14, color: "#B5B5B5"}} /></div>
        </div>
      </div>
    </div>
  )
}

export default FiltersSection;