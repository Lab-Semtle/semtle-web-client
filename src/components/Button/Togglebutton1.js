import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

function Togglebutton1({checked, onChange}) {
  return (
    <>
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={onChange}
      >
        {checked ? '기존 이미지 삭제함' : '기존 이미지 삭제 안함'}
      </ToggleButton>
     
    </>
  );
}

export default Togglebutton1;