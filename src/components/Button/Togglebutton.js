import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './Togglebutton.css'; // 커스텀 CSS 파일을 불러오기

function Togglebutton() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '이미지 삭제후 추가', value: '1', className: 'custom-green-300' },
    { name: '기존 이미지에 추가', value: '2', className: 'custom-green-400' },
    { name: '기존이미지 삭제', value: '3', className: 'custom-green-500' },
  ];

  return (
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            className={radio.className} // 커스텀 클래스 적용
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
  );
}

export default Togglebutton;