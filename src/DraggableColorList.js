import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.id}
          color={color.color}
          name={color.name}
          removeColor={removeColor}
          id={color.id}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
