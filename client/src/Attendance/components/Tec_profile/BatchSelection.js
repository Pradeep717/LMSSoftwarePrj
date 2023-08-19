import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../App';
import './BatchSelection.css';

const BatchSelection = () => {
  const classNum = [16, 17, 18, 19, 20, 21, 22, 23, 24];
  const { isDarkMode } = useContext(DarkModeContext);
    
  return (
    <div className={`batch-selection-container ${isDarkMode ? "dark-mode" : ""}`}>
      <ul className="batch-list">
        {classNum.map((item) => (
          <Link
            to={`/teacher/dashboard/subjectUpdate/${item}`}
            key={item}
            className={`batch-link ${isDarkMode ? "dark-mode" : ""}`}
          >
            <li className="batch-item">{item} Batch</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BatchSelection;

