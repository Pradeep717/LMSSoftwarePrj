import React, { useState, useEffect,useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from '../../components/UseWindowDimensions';
import { addNoticeAction, getAllSubAction } from "../../actions/admin_action"
import Titleheading from "../../components/Titleheading"
import './AddNotice.css';
import { DarkModeContext } from '../../../App';

const AddNotice = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(DarkModeContext);
  const { height, width } = useWindowDimensions();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [target, setTarget] = useState("batch")
  const [batch, setBatch] = useState("")
  const [module, setModule] = useState("")
  const [date, setDate] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    dispatch(getAllSubAction());
  }, []);

  const { allSubject } = useSelector((state) => state.getAllSubReducer);

  const handleRequest = () => {
    const data = { title, content, target, batch, module, date }
    dispatch(addNoticeAction(data))
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setTitle('')
      setContent('')
      setTarget('batch')
      setBatch('')
      setModule('')
      setDate('')
    }, 3000)
  }

  return (
    <div className={`noticeMain ${isDarkMode? 'dark-mode':''}`}>
      <div  style={{ margin: "5%" }}>
        <Titleheading title="Add Notice" className='titlenew'/>
        <div>
          <p>Select target audience:</p>
          <div>
            <input type="radio" id="batch" name="target" value="batch" checked={target === "batch"} onChange={e => setTarget(e.target.value)} />
            <label htmlFor="batch">Batch</label>
          </div>
          <div>
            <input type="radio" id="module" name="target" value="module" checked={target === "module"} onChange={e => setTarget(e.target.value)} />
            <label htmlFor="module">Module</label>
          </div>
          <div>
            <input type="radio" id="teachers" name="target" value="teachers" checked={target === "teachers"} onChange={e => setTarget(e.target.value)} />
            <label htmlFor="teachers">Teachers</label>
          </div>
        </div>
        {target === "batch" && (
          <div>
            <label htmlFor="batchSelect">Select batch:</label>
            <select id="batchSelect" value={batch} onChange={e => setBatch(e.target.value)}>
              {/* Add options for each batch here */}
              <option value="">Select a batch</option>
              {[...Array(11).keys()].map(i => (
                <option key={i} value={16 + i}>{16 + i}</option>
              ))}
            </select>
          </div>
        )}
        {target === "module" && (
          <div>
            <label htmlFor="moduleSelect">Select module:</label>
            <select id="moduleSelect" value={module} onChange={e => setModule(e.target.value)}>
              {/* Add options for each module here */}
              <option value="">Select a module</option>
              {allSubject.map(subject => (
                <option key={subject._id} value={subject.sub_code}>{subject.sub_code}</option>
              ))}
            </select>
          </div>
        )}
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="title"
              value={title}
              className='form-control'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

        </div>
        <br />
        <div className="row">
          <div className="col">

            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Write The content"
              value={content}
              onChange={(e) => setContent(e.target.value)} rows="3" />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col'>
            <label htmlFor='date'>Date:</label><br />
            <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        {success && (
          <div className='success-message'>
            Notice added successfully!
          </div>
        )}

        {!success && (
          <>
            {!title || !content || !target || !date || (target === 'batch' && !batch) || (target === 'module' && !module) ? (
              <button className='btn btn-success mb-4 mt-2' disabled>Submit</button>
            ) : (
              <button className='btn btn-success mb-4 mt-2' onClick={() => handleRequest()}>Submit</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddNotice;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import useWindowDimensions from '../../components/UseWindowDimensions';
// import { addNoticeAction, getAllSubAction } from "../../actions/admin_action"
// import Titleheading from "../../components/Titleheading"

// const AddNotice = () => {
//   const dispatch = useDispatch();
//   const { height, width } = useWindowDimensions();
//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [target, setTarget] = useState("batch")
//   const [batch, setBatch] = useState("")
//   const [module, setModule] = useState("")
//   const [date, setDate] = useState("")

//   useEffect(() => {
//     dispatch(getAllSubAction());
//   }, []);

//   const { allSubject } = useSelector((state) => state.getAllSubReducer);

//   const handleRequest = () => {
//     const data = { title, content, target, batch, module, date }
//     dispatch(addNoticeAction(data))
//   }

//   return (
//     <div className='col-7' style={{ margin: 'auto', marginBottom: "320px" }}>
//       <div className="card px-5 py-2" style={{ margin: "5%" }}>
//         <Titleheading title="Add Notice" />
//         <div>
//           <p>Select target audience:</p>
//           <div>
//             <input type="radio" id="batch" name="target" value="batch" checked={target === "batch"} onChange={e => setTarget(e.target.value)} />
//             <label htmlFor="batch">Batch</label>
//           </div>
//           <div>
//             <input type="radio" id="module" name="target" value="module" checked={target === "module"} onChange={e => setTarget(e.target.value)} />
//             <label htmlFor="module">Module</label>
//           </div>
//           <div>
//             <input type="radio" id="teachers" name="target" value="teachers" checked={target === "teachers"} onChange={e => setTarget(e.target.value)} />
//             <label htmlFor="teachers">Teachers</label>
//           </div>
//         </div>
//         {target === "batch" && (
//           <div>
//             <label htmlFor="batchSelect">Select batch:</label>
//             <select id="batchSelect" value={batch} onChange={e => setBatch(e.target.value)}>
//               {/* Add options for each batch here */}
//               <option value="">Select a batch</option>
//               {[...Array(11).keys()].map(i => (
//                 <option key={i} value={16 + i}>{16 + i}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         {target === "module" && (
//           <div>
//             <label htmlFor="moduleSelect">Select module:</label>
//             <select id="moduleSelect" value={module} onChange={e => setModule(e.target.value)}>
//               {/* Add options for each module here */}
//               <option value="">Select a module</option>
//               {allSubject.map(subject => (
//                 <option key={subject._id} value={subject.sub_code}>{subject.sub_code}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="row">
//           <div className="col">
//             <input
//               type="text"
//               placeholder="title"
//               value={title}
//               className='form-control'
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//         </div>
//         <br />
//         <div className="row">
//           <div className="col">

//             <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Write The content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)} rows="3" />
//           </div>
//         </div>
//         <br />
//         <div className='row'>
//           <div className='col'>
//             <label htmlFor='date'>Date:</label><br />
//             <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} />
//           </div>
//         </div>

//         <button className='btn btn-success mb-4 mt-2' onClick={() => handleRequest()}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default AddNotice;



// import React,{useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import useWindowDimensions from '../../components/UseWindowDimensions';
// import {addNoticeAction} from "../../actions/admin_action"
// import Titleheading from "../../components/Titleheading"
// const AddNotice = () => {

//     const dispatch = useDispatch();

//     const { height, width } = useWindowDimensions();
   
//     const [title,setTitle] = useState("")
//     const [content,setContent] = useState("")

//     const handleRequest= ()=>{
//         const data = {title,content}

//         dispatch(addNoticeAction(data))          


//     }

//     return (
//         <div className='col-7' style={{margin:'auto',marginBottom:"320px"}}>
//           <div className="card px-5 py-2" style={{margin:"5%"}}>
//           <Titleheading title="Add Notice" />
//           <div>
//             <p>Select batch:</p>
//           </div>
//           <div className="row">
//             <div className="col">
//             <input
//             type="text"
//             placeholder="title"
//             value={title}
//            className='form-control'
//             onChange={(e)=>setTitle(e.target.value)}
//             />
//             </div>
          
//           </div>
//           <br />
//               <div className="row">
//               <div className="col">
           
//              <textarea class="form-control" id="exampleFormControlTextarea1"  placeholder="Write The content"
//             value={content}
//             onChange={(e)=>setContent(e.target.value)} rows="3" />
//             </div>
//               </div>
//           <br />
          
         
       

//            <button className='btn btn-success mb-4 mt-2' onClick={() => handleRequest()}>Submit</button>
//       </div>
//       </div>
//     );
// };

// export default AddNotice;