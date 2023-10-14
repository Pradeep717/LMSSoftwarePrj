import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNoticeAction } from '../../actions/admin_action';
import Titleheading from '../../components/Titleheading';
import './ViewNotice.css';
import { DarkModeContext } from '../../../App';

const ViewNotice = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    dispatch(getAllNoticeAction());
  }, []);

  const { allnotices } = useSelector((state) => state.getAllNoticeReducer);

  // Reverse the array to display the latest notices at the top
  const reversedNotices = allnotices && allnotices.posts && allnotices.posts.slice().reverse();

  return (
    <div div className={`studentreg ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className=''>
        <Titleheading title='All Notices' />
      </div>

      {reversedNotices &&
        reversedNotices.map((item) => (
          <div key={item._id} className='notices' style={{ marginBottom: '20px' }}>
            <h6>
              <b>{item.title}</b>
            </h6>
            <p style={{ fontSize: '15px', textAlign: 'justify', padding: '10px' }}>{item.content}</p>
          </div>
        ))}
    </div>
  );
};

export default ViewNotice;