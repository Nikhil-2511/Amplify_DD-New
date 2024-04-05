import { Checkbox } from '@mui/material';
import {styled} from '@mui/material/styles';
import React from 'react';
import { CheckboxIconChecked, CheckboxIconUnchecked } from '../../assets/icons';
import { checkboxCheckedIcon } from '../../assets/icons/svgIcons';

const styles = {
  width: 24,
  height: 24,
  borderRadius: 4
}

const CheckboxWithGreenCheck = styled(Checkbox)({
  root: {
    color: '#3247FF',
  },

  checked: {
    svg: {
      width: 24,
      height: 24
    }
  }
});

function CustomCheckbox({className, uncheckedIcon, checkedIcon, ...rest}) {

  function renderUncheckedIcon() {
    return (uncheckedIcon || <CheckboxIconUnchecked sx={{color: '#fff'}}/>)
  }

  return (
    <CheckboxWithGreenCheck className={'custom-checkbox ' + (className? className : '')} icon={renderUncheckedIcon()} checkedIcon={(checkedIcon || checkboxCheckedIcon)} {...rest} />
  )
}

export default CustomCheckbox;