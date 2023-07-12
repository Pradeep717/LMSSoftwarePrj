import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {userProfile} from "../actions/user_action"

const Marks = () => {
    const dispatch = useDispatch() ;
    useEffect(()=>{
         if(localStorage.getItem("currentUser")){
             const userId = JSON.parse(localStorage.getItem("currentUser")).user._id ;
             dispatch(userProfile(userId))
         }

       // dispatch(userProfile())
    },[])
    const {currentUser} = useSelector(state => state.userProfileReducer) ;
    return (
        <div>
            <h5>Mark in 3rd kk semester</h5>
            <table style={{width:"80%",border:"2px solid red",paddingLeft:"2%"}}>
        <thead style={{fontSize:"22px"}}>
          <tr>
              <th >Subject</th>
              <th>Mark </th>
              <th>Grade</th>
              <th>Point</th>
          </tr>
        </thead>

        {
           currentUser && currentUser[0].markList && currentUser[0].markList.map(user => (
                <tbody key={user.name} style={{padding:"5px"}}>
                <tr >
                   <td>{user.subject}</td>
                
                  <td>
                  {user.smark}
                  </td>
                  <td style={{fontSize:"19px",fontWeight:"700"}}>
                      {user.smark >= 80 && <>A+</>}
                      {user.smark < 80 && user.smark >= 75 &&  <>A</>}
                      {user.smark < 70 && user.smark >= 65 &&  <>A-</>}
                      {user.smark < 65 && user.smark >= 60 &&  <>B+</>}
                      {user.smark < 65 && user.smark >= 60 &&  <>B</>}
                      {user.smark < 60 && user.smark >= 55 &&  <>B-</>}
                      {user.smark < 55 && user.smark >= 50 &&  <>C+</>}
                      {user.smark < 50 && user.smark >= 45 &&  <>C</>}
                      {user.smark < 45 && user.smark >= 35 &&  <>C-</>}
                      {user.smark < 35 && user.smark >= 0 &&  <>E</>}
                  </td>
                  <td style={{fontSize:"19px",fontWeight:"700"}}>
                      {user.smark >= 80 && <>4.0</>}
                      {user.smark < 80 && user.smark >= 75 &&  <>4.0</>}
                      {user.smark < 70 && user.smark >= 65 &&  <>3.7</>}
                      {user.smark < 65 && user.smark >= 60 &&  <>3.3</>}
                      {user.smark < 65 && user.smark >= 60 &&  <>3.0</>}
                      {user.smark < 60 && user.smark >= 55 &&  <>2.7</>}
                      {user.smark < 55 && user.smark >= 50 &&  <>2.3</>}
                      {user.smark < 50 && user.smark >= 45 &&  <>2.0</>}
                      {user.smark < 45 && user.smark >= 35 &&  <>1.7</>}
                      {user.smark < 35 && user.smark >= 0 &&  <>0</>}

                  </td>
                 
                </tr>
              
              </tbody>
            ))
        }
      </table>
        </div>
    );
};

export default Marks;