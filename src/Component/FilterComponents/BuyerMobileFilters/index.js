import React, { useEffect, useState } from "react";
import FilterDropdown from "../FilterDropdown";
import {
  RANGE_KEY,
  DROPDOWN,
  ARRAY,
  MULTISELECT,
  SEARCH_KEY,
  REJECTED_SELLERS,
  SELLER_STATUS,
  RUPEE_SYMBOL,
} from "../../../constants";
import { useDispatch } from "react-redux";
import { updateSelectedFilter } from "../../../Redux/slice/FilterSlice";
import MultiSelectFilter from "../MultiSelectFilter";
import {
  deepClone,
  getDate,
  getValueFromArr,
} from "../../../helper/commonHelper";
import "../style.scss";
import PreferenceFilter from "../PreferenceFilter";
import SearchFilter from "../SearchFilter";
import TextSearchFilter from "../TextSearchFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Chip, Drawer } from "@mui/material";
import CustomRangeSlider from "../../../CommonComponent/CustomRangeSlider";
import CloseIcon from "@mui/icons-material/Close";

function BuyerMobileFilters({
  filterModel,
  defaultValue = {},
  filterUpdateCallback,
  onFilterClicked,
  tabLabel,
  handleCloseModal,
}) {
  const [selectedFilters, setSelectedFilters] = useState(defaultValue);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    setSelectedFilters(defaultValue);    
  }, [defaultValue]);

  function handleSelect(selectedValue, type) {
    let filters = { ...selectedFilters };
    filters[type] = selectedValue.key;
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }
  const handleChangeCalender = (dates, key) => {
    let filters = { ...selectedFilters };
    let [startDate, endDate] = dates;
    let dateRangeInMillSec = [];
    if (startDate) {
      dateRangeInMillSec.push(startDate.getTime());
    }
    if (endDate) {
      dateRangeInMillSec.push(endDate.getTime());
    }
    setDateRange(dateRangeInMillSec);
    filters[key] = dateRangeInMillSec;
    setSelectedFilters(filters);

    if (onFilterClicked) onFilterClicked();
  };

  function handleMultiSelect(selectedValue, key) {
    let filters = { ...selectedFilters },
      index = -1,
      selectedKeyData = deepClone(filters[key] || []);
    index = selectedKeyData?.findIndex(
      (element) => element === selectedValue.key
    );
    if (index > -1) {
      selectedKeyData.splice(index, 1);
    } else {
      selectedKeyData.push(selectedValue.key);
    }
    filters[key] = selectedKeyData;
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleEditPreference(selectedValue, type) {
    let filters = deepClone(selectedFilters);
    filters[type] = selectedValue;
    setSelectedFilters(filters);    
    if (onFilterClicked) onFilterClicked();
  }

  function handleRangeFilter(value, key) {
    let filters = deepClone(selectedFilters);
    filters[key] = { value, type: "range" };
    filters[key] = {
      ...filters[key],
      hasChanged: true,
    };
    setSelectedFilters(filters);
  }

  function handleApplyFilters(selectedFilter) {
    filterUpdateCallback(selectedFilter);
  }

  function handleResetFilters() {
    setSelectedFilters({});
    handleApplyFilters({});
    setDateRange([null, null]);
    if (onFilterClicked) onFilterClicked();
  }

  function handleMultiDelete(index, type) {
    let filters = deepClone(selectedFilters),
      selectedType = filters[type];
    selectedType.splice(index, 1);
    filters[type] = selectedType;
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleDelete(key) {
    let filters = deepClone(selectedFilters);
    filters[key] = "";
    dispatch(updateSelectedFilter(filters));
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();    
  }

  function handleRangeDelete(key) {
    let filters = deepClone(selectedFilters);
    filters[key] = {};
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleRangeCalenderDelete(key) {
    let filters = deepClone(selectedFilters);
    delete filters[key];
    setSelectedFilters(filters);
    setDateRange([null, null]);
    if (onFilterClicked) onFilterClicked();
  }

  function handleOnSearchChange(selectedValue, type) {
    let filters = { ...selectedFilters };
    filters[type] = selectedValue;
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function renderFilters(modelFieldData, key) {
    switch (modelFieldData.fieldType) {
      case DROPDOWN:
        return renderDropdown(modelFieldData, key);
      case MULTISELECT:
        return renderMultiSelect(modelFieldData, key);
      case RANGE_KEY:
        return revenueRangeFilter(modelFieldData, key);
      case "preferences.sector":
        return renderPreferenceFilter(modelFieldData, key);
      case SEARCH_KEY:
        return renderSearchFilter(modelFieldData, key);
      case "textSearch":
        return renderTextSearch(modelFieldData, key);
      case "rangeCalender":
        return renderRangeCalender(modelFieldData, key);
      default:
        return "";
    }
  }

  function renderRangeCalender(modelFieldData, key) {
    return (
      <div className="flex col-gap-10">
        <DatePicker
          selectsRange={true}
          startDate={handleCalenderDate(startDate)}
          endDate={handleCalenderDate(endDate)}
          onChange={(update) => {
            handleChangeCalender(update, key);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText={modelFieldData?.placeholder}
        />
      </div>
    );
  }

  function handleCalenderDate(timeMilliSec) {
    if (timeMilliSec) return new Date(timeMilliSec);
    return null;
  }

  function renderSearchFilter(modelFieldData, key) {
    return (
      <SearchFilter
        placeholder={modelFieldData?.placeholder || "Search data"}
        parentClass={"bg-F2F4F7 text-9BA2B3"}
        handleOnSearchChange={(value) => handleOnSearchChange(value, key)}
        selectedValue={selectedFilters[key]}
      />
    );
  }

  function renderTextSearch(modelFieldData, key) {
    return (
      <TextSearchFilter
        modelData={modelFieldData}
        parentClass={"bg-F2F4F7 text-9BA2B3 min-width160"}
        placeholder={modelFieldData?.placeholder || "Search data"}
        handleOnSearchChange={(value) => handleOnSearchChange(value, key)}
        selectedValue={selectedFilters[key]}
      />
    );
  }

  function renderPreferenceFilter(modelFieldData, key) {
    return (
      <PreferenceFilter
        sectorOptions={modelFieldData?.sectorOptions}
        subSectorOptions={modelFieldData?.subSectorOptions}
        handleUpdate={(selectedData) => handleEditPreference(selectedData, key)}
        selectedValue={selectedFilters[key]}
        isMobileView={true}
      />
    );
  }

  function renderMultiSelect(modelFieldData, key) {
    return (
      <MultiSelectFilter
        label={modelFieldData?.placeholder || "Select Field"}
        options={modelFieldData?.optionsData}
        parentClass={"bg-F2F4F7 text-9BA2B3 min-width160"}
        handleSelect={(value) => handleMultiSelect(value, key)}
        selectedValue={selectedFilters[key]}
      />
    );
  }

  function revenueRangeFilter(modelFieldData, key) {
    return (
      <div className="filter-body-wrapper slider-filter">
        <div className="filter-body padding-y12 bg-white">
          <div className='form-label margin-t10 margin-b25'>
						<div className="padding-b15">Revenue Range(₹ crores)</div>
					</div>
          <div className="padding-x10">
            <CustomRangeSlider
              rangeSliderValue={selectedFilters[key]?.value}
              min={modelFieldData?.minRange}
              max={modelFieldData?.maxRange}
              onChange={(value) => handleRangeFilter(value, key)}
              step={modelFieldData?.step}
              valueLabelDisplay="on"
              disableSwap
            />
          </div>
        </div>
      </div>
    );
  }

  function renderDropdown(modelFieldData, key) {
    return (
      <FilterDropdown
        label={modelFieldData?.placeholder || "Select Field"}
        parentClass={"bg-F2F4F7 text-9BA2B3 min-width160 margin-b20"}
        options={modelFieldData?.optionsData}
        handleSelect={(value) => handleSelect(value, key)}
        selectedValue={selectedFilters[key]}
      />
    );
  }

  function handleSubsectorDelete(index, type, sectorValue) {
    let filters = deepClone(selectedFilters),
      selectedType = filters[type],
      newListData = [],
      prefIndex = -1;
    if (selectedType?.length) {
      newListData = selectedType.map((preferenceList, i) => {
        if (preferenceList?.sector === sectorValue) {
          preferenceList.subsectorList?.splice(index, 1);
          if (preferenceList?.subsectorList?.length === 0) {
            prefIndex = i;
          }
        }
        return preferenceList;
      });
    }
    if (prefIndex > -1) {
      newListData.splice(prefIndex, 1);
    }
    filters[type] = newListData;
    setSelectedFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  return (
    <Drawer
      anchor={"bottom"}
      open={true}
      onClose={handleCloseModal}
      sx={{
        height: "70%",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
    >
      <Box sx={{ width: "100%", padding: "20px" }} role="presentation">
        <div className="heading-part flex justify-space-between align-center margin-b10">
          <span></span>
          <span className="text-16 font-500">Filters</span>
          <CloseIcon className="cursor-pointer" onClick={handleCloseModal} />
        </div>
        {filterModel && (
          <div className="filter-component-container">
            <div className="rounded-4 margin-b16">
              <div className="">
                {Object.keys(filterModel)?.length > 0 &&
                  Object.keys(filterModel).map((modelKey, index) => {
                    let modelFieldData = filterModel[modelKey];
                    return (
                      <React.Fragment key={modelKey + index}>
                        {renderFilters(modelFieldData, modelKey)}
                      </React.Fragment>
                    );
                  })}
              </div>
              <div className="action-section flex align-center justify-space-between margin-t25">
                <div
                  className="text-667085 text-12 cursor-pointer margin-l8 margin-r8"
                  onClick={handleResetFilters}
                >
                  Reset
                </div>
                <div
                  className="apply-btn cursor-pointer text-white bg-black padding-y8 padding-x10 rounded-4 relative"
                  onClick={() => handleApplyFilters(selectedFilters)}
                >
                  Apply
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Drawer>
  );
}

export default BuyerMobileFilters;
