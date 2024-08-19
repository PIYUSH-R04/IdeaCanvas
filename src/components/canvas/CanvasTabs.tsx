import React from 'react';
import styles from './Canvas.module.css';

interface CanvasTabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const CanvasTabs: React.FC<CanvasTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = Array(5).fill('Canvas'); // Example with 5 tabs

  return (
    <div className={styles.canvasTabs}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={index === activeTab ? styles.activeTab : ''}
          onClick={() => setActiveTab(index)}
        >
          {tab} {index + 1}
        </button>
      ))}
    </div>
  );
};

export default CanvasTabs;
