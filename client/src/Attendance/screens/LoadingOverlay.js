import React from 'react';
import { DotLoader, HashLoader } from 'react-spinners';
import './LoadingOverlay.css';

const LoadingOverlay = ({ loading }) => {
  return (
    loading && (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <HashLoader color={'#ffffff'} loading={loading} size={40} />
        </div>
      </div>
    )
  );
};

export default LoadingOverlay;
