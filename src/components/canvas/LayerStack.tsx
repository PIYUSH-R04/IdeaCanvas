import React from 'react';
import styles from './Canvas.module.css';

interface LayerStackProps {
  shapes: any[];
  setShapes: (shapes: any[]) => void;
}

const LayerStack: React.FC<LayerStackProps> = ({ shapes, setShapes }) => {
  const moveLayer = (index: number, direction: 'up' | 'down') => {
    const newShapes = [...shapes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newShapes.length) return;
    [newShapes[index], newShapes[targetIndex]] = [newShapes[targetIndex], newShapes[index]];
    setShapes(newShapes);
  };

  return (
    <div className={styles.layerStack}>
      <h3>Layers</h3>
      {shapes.length === 0 ? (
        <p>No layers to display</p>
      ) : (
        shapes.map((shape, index) => (
          <div key={index} className={styles.layerItem}>
            <span className={styles.layerType}>{shape.type}</span>
            <div className={styles.buttonGroup}>
              <button className={styles.moveButton} onClick={() => moveLayer(index, 'up')}>Up</button>
              <button className={styles.moveButton} onClick={() => moveLayer(index, 'down')}>Down</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LayerStack;




