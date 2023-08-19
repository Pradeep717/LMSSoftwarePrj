// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllNoticeAction } from "../../actions/admin_action"
// import Titleheading from "../../components/Titleheading"
// import './ViewNotice.css'

// const ViewNotice = () => {
//   const dispatch = useDispatch();
//   const [selectedNotice, setSelectedNotice] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [batchFilter, setBatchFilter] = useState('');
//   const [moduleFilter, setModuleFilter] = useState('');

//   useEffect(() => {
//     dispatch(getAllNoticeAction())
//   }, [])

//   const { allnotices } = useSelector(state => state.getAllNoticeReducer);
//   console.log(allnotices)

//   const filteredNotices = allnotices && allnotices.posts && allnotices.posts.filter(item => {
//     if (filter === 'all') {
//       return true;
//     }
//     if (filter === 'batch' && item.target === 'batch' && item.batch === batchFilter) {
//       return true;
//     }
//     if (filter === 'module' && item.target === 'module' && item.module === moduleFilter) {
//       return true;
//     }
//     if (filter === 'teachers' && item.target === 'teachers') {
//       return true;
//     }
//     return false;
//   });

//   return (
//     <div className='main'>
//       <div className=''>
//         <Titleheading title="All Notices" />
//       </div>

//       <div>
//         <label htmlFor="filterSelect">Filter by:</label>
//         <select id="filterSelect" value={filter} onChange={e => setFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="batch">Batch</option>
//           <option value="module">Module</option>
//           <option value="teachers">Teachers</option>
//         </select>
//       </div>

//       {filter === 'batch' && (
//         <div>
//           <label htmlFor="batchFilter">Select batch:</label>
//           <input type="number" id="batchFilter" value={batchFilter} onChange={e => setBatchFilter(e.target.value)} />
//         </div>
//       )}

//       {filter === 'module' && (
//         <div>
//           <label htmlFor="moduleFilter">Select module:</label>
//           <input type="text" id="moduleFilter" value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} />
//         </div>
//       )}

//       <ul>
//         {filteredNotices.map(item => (
//           <li key={item._id} onClick={() => setSelectedNotice(item)}>
//             {item.title}
//           </li>
//         ))}
//       </ul>

//       {selectedNotice && (
//         <div className="card" style={{ marginBottom: "20px" }}>
//           <h6><b>{selectedNotice.title}</b></h6>
//           <p style={{ fontSize: "15px", textAlign: "justify", padding: "10px" }}>{selectedNotice.content}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewNotice;

import React,{useEffect,useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getAllNoticeAction} from "../../actions/admin_action"
import Titleheading from "../../components/Titleheading"
import './ViewNotice.css'
import { DarkModeContext } from '../../../App';

const ViewNotice = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useContext(DarkModeContext);
    useEffect(()=>{
        dispatch(getAllNoticeAction())
    },[])

    const {allnotices} = useSelector(state => state.getAllNoticeReducer) ;
  
    return (
        <div div className={`studentreg ${isDarkMode ? "dark-mode" : ""}`}>
             <div className=''>
             <Titleheading title="All Notices" />
             </div>
        
            {allnotices && allnotices.posts && allnotices.posts.map(item =>(
                <div key={item._id} className='notices' style={{marginBottom:"20px"}}>
                    <h6><b>{item.title}</b></h6>
                    <p style={{fontSize:"15px",textAlign:"justify",padding:"10px"}}>{item.content}</p>
                </div>
            )) }
        </div>
    );
};

export default ViewNotice;