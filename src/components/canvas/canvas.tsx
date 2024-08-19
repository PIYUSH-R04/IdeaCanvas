// import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
// import React from 'react';

// interface CanvasProps {
//     dirDetails: File | Folder | workspace;
//     fileId: string;
//     dirType: 'workspace' | 'folder' | 'file';
//   }
  
//   const Canvas: React.FC<CanvasProps> = ({
//     dirDetails,
//     dirType,
//     fileId,
//   }) => {
//   return (
//     <div className="canvas">
//       {/* Canvas implementation */}
//       <h2>Canvas</h2>
//       <p>File ID: {fileId}</p>
//       <p>Data: {dirDetails.data}</p>
//     </div>
//   );
// };

// export default Canvas;



/////////////////////


import React, { useRef, useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import ColorPicker from './ColorPicker';
import LayerStack from './LayerStack';
import styles from './Canvas.module.css';

interface CanvasProps {
  dirDetails: any;
  fileId: string;
  dirType: 'workspace' | 'folder' | 'file';
}

const Canvas: React.FC<CanvasProps> = ({ dirDetails, fileId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#000000');
  const [fillColor, setFillColor] = useState<string>('#ffffff');
  const [tool, setTool] = useState<string>('pen');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [shapes, setShapes] = useState<any[]>([]);
  const [currentShape, setCurrentShape] = useState<any>(null);
  const [draggingShape, setDraggingShape] = useState<any>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState<number | null>(null);

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e);
    if (tool === 'drag' || tool === 'delete') {
      handleCanvasClick(x, y);
      return;
    }
    setIsDrawing(true);
    const newShape = {
      type: tool,
      startX: x,
      startY: y,
      color,
      fillColor,
    };
    setCurrentShape(newShape);
  };

  const draw = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e);

    if (isDrawing && currentShape) {
      const updatedShape = {
        ...currentShape,
        endX: x,
        endY: y,
      };
      setCurrentShape(updatedShape);
      redrawCanvas([...shapes, updatedShape]);
    } else if (draggingShape) {
      const dx = x - (dragStartX ?? 0);
      const dy = y - (dragStartY ?? 0);

      const updatedShapes = shapes.map(shape =>
        shape === draggingShape
          ? {
              ...shape,
              startX: shape.startX + dx,
              startY: shape.startY + dy,
              endX: shape.endX + dx,
              endY: shape.endY + dy,
            }
          : shape
      );
      setShapes(updatedShapes);
      setDraggingShape({
        ...draggingShape,
        startX: draggingShape.startX + dx,
        startY: draggingShape.startY + dy,
        endX: draggingShape.endX + dx,
        endY: draggingShape.endY + dy,
      });
      setDragStartX(x);
      setDragStartY(y);
      redrawCanvas(updatedShapes); // Ensure canvas is updated
    }
  };

  const stopDrawing = () => {
    if (tool === 'drag' || tool === 'delete') return;

    if (currentShape) {
      setShapes(prevShapes => [...prevShapes, currentShape]);
      setCurrentShape(null);
    }
    setIsDrawing(false);
    setDraggingShape(null);
    setDragStartX(null);
    setDragStartY(null);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (tool === 'delete') {
      const newShapes = shapes.filter(shape => !isInsideShape(x, y, shape));
      setShapes(newShapes);
    } else if (tool === 'drag') {
      const shapeToDrag = shapes.find(shape => isInsideShape(x, y, shape));
      if (shapeToDrag) {
        setDraggingShape(shapeToDrag);
        setDragStartX(x);
        setDragStartY(y);
        setDragOffsetX(x - shapeToDrag.startX);
        setDragOffsetY(y - shapeToDrag.startY);
      }
    }
  };

  const isInsideShape = (x: number, y: number, shape: any) => {
    switch (shape.type) {
      case 'rectangle':
        return x >= shape.startX && x <= shape.endX && y >= shape.startY && y <= shape.endY;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
        );
        return Math.sqrt(Math.pow(x - shape.startX, 2) + Math.pow(y - shape.startY, 2)) <= radius;
      case 'line':
        return isPointOnLine(x, y, shape);
      case 'pen':
      case 'brush':
        return isPointOnLine(x, y, shape);
      case 'arrow':
        return isPointOnLine(x, y, shape);
      case 'diamond':
        return isPointInDiamond(x, y, shape);
      default:
        return false;
    }
  };

  const isPointOnLine = (x: number, y: number, shape: any) => {
    const { startX, startY, endX, endY } = shape;
    const lineWidth = 5;
    const distance = Math.abs((endY - startY) * x - (endX - startX) * y + endX * startY - endY * startX) /
      Math.sqrt(Math.pow(endY - startY, 2) + Math.pow(endX - startX, 2));
    return distance <= lineWidth;
  };

  const isPointInDiamond = (x: number, y: number, shape: any) => {
    const { startX, startY, endX, endY } = shape;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = Math.abs(x - midX);
    const dy = Math.abs(y - midY);
    return dx + dy <= Math.abs(endX - startX) / 2;
  };

  const redrawCanvas = (allShapes: any[]) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    allShapes.forEach(shape => drawShape(context, shape));
  };

  const drawShape = (context: CanvasRenderingContext2D, shape: any) => {
    context.strokeStyle = shape.color;
    context.fillStyle = shape.fillColor;

    switch (shape.type) {
      case 'pen':
      case 'brush':
        context.lineWidth = shape.type === 'pen' ? 2 : 5;
        context.beginPath();
        context.moveTo(shape.startX, shape.startY);
        context.lineTo(shape.endX, shape.endY);
        context.stroke();
        break;
      case 'rectangle':
        context.beginPath();
        context.rect(
          shape.startX,
          shape.startY,
          shape.endX - shape.startX,
          shape.endY - shape.startY
        );
        context.fill();
        context.stroke();
        break;
      case 'circle':
        context.beginPath();
        const radius = Math.sqrt(
          Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
        );
        context.arc(shape.startX, shape.startY, radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        break;
      case 'line':
        context.beginPath();
        context.moveTo(shape.startX, shape.startY);
        context.lineTo(shape.endX, shape.endY);
        context.stroke();
        break;
      case 'arrow':
        drawArrow(context, shape);
        break;
      case 'diamond':
        drawDiamond(context, shape);
        break;
      default:
        break;
    }
  };

  const drawArrow = (context: CanvasRenderingContext2D, shape: any) => {
    const { startX, startY, endX, endY } = shape;
    const headLength = 10;

    const angle = Math.atan2(endY - startY, endX - startX);

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY - headLength * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
  };

  const drawDiamond = (context: CanvasRenderingContext2D, shape: any) => {
    const { startX, startY, endX, endY } = shape;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    context.beginPath();
    context.moveTo(midX, startY);
    context.lineTo(endX, midY);
    context.lineTo(midX, endY);
    context.lineTo(startX, midY);
    context.closePath();
    context.fill();
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth - 100; // Adjust as needed
      canvas.height = window.innerHeight - 100;
      redrawCanvas(shapes);
    }
  }, [shapes]);

  return (
    <div className={styles.canvasWrapper}>
      <Toolbar setTool={setTool} />
      <ColorPicker setColor={setColor} setFillColor={setFillColor} />
      <LayerStack shapes={shapes} setShapes={setShapes} />
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;


