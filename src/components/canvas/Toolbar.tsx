import React from 'react';
import styles from './Canvas.module.css';
import ToolButton from './ToolButton';

interface ToolbarProps {
  setTool: (tool: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ setTool }) => {
  return (
    <div className={styles.toolbar}>
      <ToolButton tool="pen" label="Pen" setTool={setTool} />
      <ToolButton tool="brush" label="Brush" setTool={setTool} />
      <ToolButton tool="rectangle" label="Rectangle" setTool={setTool} />
      <ToolButton tool="circle" label="Circle" setTool={setTool} />
      <ToolButton tool="line" label="Line" setTool={setTool} />
      <ToolButton tool="diamond" label="Diamond" setTool={setTool} />
      <ToolButton tool="drag" label="Drag" setTool={setTool} />
      <ToolButton tool="delete" label="Delete" setTool={setTool} />
    </div>
  );
};

export default Toolbar;



