import React from 'react';
import './Titleheading.css';

const Titleheading = ({title}) => {
    return (
        <div className='titleheading'>
           <h4 style={{fontSize:"23px",textAlign:"center"}}>{title}</h4>
      </div>
    );
};

export default Titleheading;