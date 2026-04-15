import React from 'react';

const Skeleton = ({ className, width, height, borderRadius = '4px', style }) => {
  return (
    <div 
      className={`skeleton ${className || ''}`}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius,
        ...style
      }}
    />
  );
};

export default Skeleton;
