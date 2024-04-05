import React, { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import {
  RANGE_KEY,
  DROPDOWN,
  ARRAY,
  MULTISELECT,
  SEARCH_KEY,
  REJECTED_SELLERS,
  SELLER_STATUS,
} from "../../constants";
import { useDispatch } from "react-redux";
import { updateSelectedFilter } from "../../Redux/slice/FilterSlice";
import MultiSelectFilter from "./MultiSelectFilter";
import { deepClone, getDate, getValueFromArr } from "../../helper/commonHelper";
import "./style.scss";
import RangeFilter from "./RangeFilter";
import CustomChip from "../../CommonComponent/CommonChip";
import PreferenceFilter from "./PreferenceFilter";
import SearchFilter from "./SearchFilter";
import TextSearchFilter from "./TextSearchFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterComponent({
  filterModel,
  defaultValue = {},
  filterUpdateCallback,
  onFilterClicked,
  tabLabel
}) {
  const [selectedFilters, setSelectedFilters] = useState(defaultValue);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    setSelectedFilters(defaultValue);
    // getBuyerFilters()
  }, [defaultValue]);

  function handleSelect(selectedValue, type) {
    let filters = { ...selectedFilters };
    filters[type] = selectedValue.key;
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }
  const handleChangeCalender = (dates, key) => {
    let filters = { ...selectedFilters };
    let [startDate, endDate ] = dates;
    let dateRangeInMillSec = [] ;
    if(startDate) {
      dateRangeInMillSec.push(startDate.getTime());
    }
    if(endDate) {
      dateRangeInMillSec.push(endDate.getTime());
    }
    setDateRange(dateRangeInMillSec);
      filters[key] = dateRangeInMillSec;
      setSelectedFilters(filters);
      handleApplyFilters(filters);
  
      if (onFilterClicked) onFilterClicked();
    // }
   

   
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
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleEditPreference(selectedValue, type) {
    let filters = deepClone(selectedFilters);
    filters[type] = selectedValue;
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleRangeFilter(value, key) {
    let filters = deepClone(selectedFilters);
    filters[key] = { value, type: "range" };
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
    handleApplyFilters(filters);
  }

  function handleRangeDelete(key) {
    let filters = deepClone(selectedFilters);
    filters[key] = {};
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleRangeCalenderDelete(key){
    let filters = deepClone(selectedFilters);
    delete filters[key];
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    setDateRange([null, null]);
    if (onFilterClicked) onFilterClicked();
  }

  function handleSetRange(key) {
    let filters = deepClone(selectedFilters);
    filters[key] = {
      ...filters[key],
      hasChanged: true,
    };
    setSelectedFilters(filters);
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function handleOnSearchChange(selectedValue, type) {
    let filters = { ...selectedFilters };
    filters[type] = selectedValue;
    setSelectedFilters(filters);
    handleApplyFilters(filters);
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
      <div className="flex col-gap-10 border border-F2F4F7 rounded-4 px-[5px] py-[8px]">
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
    if(timeMilliSec) return new Date(timeMilliSec);
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
      <RangeFilter
        label={modelFieldData?.placeholder || "Select Range"}
        parentClass={"bg-F2F4F7 text-9BA2B3 min-width160"}
        onChange={(value) => handleRangeFilter(value, key)}
        handleSetRange={() => handleSetRange(key)}
        maxRange={modelFieldData?.maxRange}
        minRange={modelFieldData?.minRange}
        step={modelFieldData?.step}
        hasChanged={selectedFilters[key]?.hasChanged}
        selectedValue={selectedFilters[key]?.value}
      />
    );
  }

  function renderDropdown(modelFieldData, key) {
    return (
      <FilterDropdown
        label={modelFieldData?.placeholder || "Select Field"}
        parentClass={"bg-F2F4F7 text-9BA2B3 min-width160"}
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
    handleApplyFilters(filters);
    if (onFilterClicked) onFilterClicked();
  }

  function renderChipLabel(selectedFilters, key) {
    if (!selectedFilters) return "";
    if (filterModel[key]?.type === "range") {
      if (selectedFilters?.value && selectedFilters?.hasChanged)
        return (
          <CustomChip
            label={`${filterModel[key]?.chipPlaceholder}: ${selectedFilters.value[0]} CR -  ${selectedFilters.value[1]} CR`}
            handleDelete={() => handleRangeDelete(key)}
          />
        );
    } else if (filterModel[key]?.fieldType === "preferences.sector") {
      if (selectedFilters?.length) {
        return (
          <React.Fragment>
            {selectedFilters.map((arrayFieldKey, index) => {
              if (arrayFieldKey?.subsectorList?.length) {
                return (
                  <React.Fragment key={arrayFieldKey?.sector + index}>
                    {arrayFieldKey?.subsectorList.map((subSector, j) => {
                      return (
                        <CustomChip
                          key={subSector + j}
                          label={`${
                            filterModel[key]?.chipPlaceholder
                          }: ${getValueFromArr(
                            arrayFieldKey?.sector,
                            filterModel[key].sectorOptions
                          )} > ${getValueFromArr(
                            subSector,
                            filterModel[key]?.subSectorOptions[
                              arrayFieldKey?.sector
                            ]
                          )}`}
                          handleDelete={() =>
                            handleSubsectorDelete(j, key, arrayFieldKey?.sector)
                          }
                        />
                      );
                    })}
                  </React.Fragment>
                );
              } else {
                return (
                  <CustomChip
                    key={arrayFieldKey.sector + index}
                    label={`${
                      filterModel[key]?.chipPlaceholder
                    }: ${getValueFromArr(
                      arrayFieldKey.sector,
                      filterModel[key].sectorOptions
                    )}`}
                    handleDelete={() => handleMultiDelete(index, key)}
                  />
                );
              }
            })}
          </React.Fragment>
        );
      }
    }else if (filterModel[key]?.fieldType === "rangeCalender"){
      return (
        <CustomChip
          label={`${filterModel[key]?.chipPlaceholder}: ${getDate(selectedFilters[0])} ${selectedFilters[1] ? ` - ${getDate(selectedFilters[1])}` : ''}`}
          handleDelete={() => handleRangeCalenderDelete(key)}
        />
      );
    }
     else if (filterModel[key]?.type === ARRAY) {
      if (selectedFilters?.length) {
        return (
          <React.Fragment>
            {selectedFilters.map((arrayFieldKey, index) => {
              return (
                <CustomChip
                  key={arrayFieldKey + index}
                  label={`${
                    filterModel[key]?.chipPlaceholder
                  }: ${getValueFromArr(
                    arrayFieldKey,
                    filterModel[key]?.optionsData
                  )}`}
                  handleDelete={() => handleMultiDelete(index, key)}
                />
              );
            })}
          </React.Fragment>
        );
      }
    } else if (
      filterModel[key]?.fieldType === SEARCH_KEY ||
      filterModel[key]?.fieldType === "textSearch"
    ) {
      return (
        <CustomChip
          label={`${filterModel[key]?.chipPlaceholder}: ${selectedFilters}`}
          handleDelete={() => handleDelete(key)}
        />
      );
    } else {
      return (
        <CustomChip
          label={`${filterModel[key]?.chipPlaceholder}: ${getValueFromArr(
            selectedFilters,
            filterModel[key]?.optionsData
          )}`}
          handleDelete={() => handleDelete(key)}
        />
      );
    }
  }

  return (
    <React.Fragment>
      {filterModel && (
        <div className="filter-component-container">
          <div className="fliters-container rounded-4 margin-b16">
            <div className="flex col-gap-8 align-center">
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
            <div className="action-section flex align-center col-gap-15">
              {/* <div className='text-2E90FA text-12 font-500 cursor-pointer' onClick={() => handleApplyFilters(selectedFilters)}>Apply Filters</div> */}
              <div
                className="text-667085 text-12 cursor-pointer margin-l8 margin-r8"
                onClick={handleResetFilters}
              >
                Reset
              </div>
            </div>
          </div>
          <div
            className="flex flex-wrap col-gap-8 row-gap-8 align-center "
            id="selected-filter-chip"
          >
            {Object.keys(selectedFilters)?.length > 0 &&
              Object.keys(selectedFilters)?.map((key, index) => {
                return (
                  <React.Fragment key={key + index}>
                    {renderChipLabel(selectedFilters[key], key)}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default FilterComponent;
