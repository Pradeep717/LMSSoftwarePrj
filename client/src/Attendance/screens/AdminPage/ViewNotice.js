import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getAllNoticeAction} from "../../actions/admin_action"
import Titleheading from "../../components/Titleheading"
import './ViewNotice.css'

const ViewNotice = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllNoticeAction())
    },[])

    const {allnotices} = useSelector(state => state.getAllNoticeReducer) ;
  
    return (
        <div className='main'>
             <div className=''>
             <Titleheading title="All Notices" />
             </div>
        
            {allnotices && allnotices.posts && allnotices.posts.map(item =>(
                <div key={item._id} className="card" style={{marginBottom:"20px"}}>
                    <h6><b>{item.title}</b></h6>
                    <p style={{fontSize:"15px",textAlign:"justify",padding:"10px"}}>{item.content}</p>
                </div>
            )) }
        </div>
    );
};

export default ViewNotice;