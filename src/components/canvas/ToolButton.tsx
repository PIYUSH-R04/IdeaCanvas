import React from 'react';
import styles from './Canvas.module.css';

interface ToolButtonProps {
  tool: string;
  label: string;
  setTool: (tool: string) => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ tool, label, setTool }) => {
  return (
    <button className={styles.toolButton} onClick={() => setTool(tool)}>
      {label}
    </button>
  );
};

export default ToolButton;
