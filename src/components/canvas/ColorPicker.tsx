import React, { useEffect, useState } from 'react';
import styles from './Canvas.module.css';

interface ColorPickerProps {
  setColor: (color: string) => void;
  setFillColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor, setFillColor }) => {
  const [borderColor, setBorderColor] = useState<string>('#ffffff'); // Default border color
  const [fillColor, setFillColorState] = useState<string>('#000000'); // Default fill color

  useEffect(() => {
    setColor(borderColor);
    setFillColor(fillColor);
  }, [borderColor, fillColor, setColor, setFillColor]);

  return (
      <div className={styles.colorPicker} style={{ bottom: '20px' }}>
      <label>
        Border Color: 
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
      </label>
      <label>
        Fill Color: 
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColorState(e.target.value)}
        />
      </label>
    </div>
  );
};

export default ColorPicker;



