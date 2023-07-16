import {BASE_URL } from '../../helper';
import axios from 'axios';

console.log("URLu");
console.log(BASE_URL);


export const getAllNoticeAction = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_NOTICE_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/allnotice`);
        console.log("reas",response)
        dispatch({
           type:'GET_All_NOTICE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_NOTICE_FAILED',
           payload:error
       })
    }
}

export const addNoticeAction = (user) => async dispatch => {
    dispatch({
        type: 'ADD_NOTICE_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/addnotice`, user);
       
        dispatch({
            type: 'ADD_NOTICE_SUCCESS',
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: 'ADD_NOTICE_FAILED',
            payload: error
        })
    }
}

export const getAllClubAction = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_CLUB_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/allclub`);
        
        dispatch({
           type:'GET_All_CLUB_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_CLUB_FAILED',
           payload:error
       })
    }
}
export const getClubJoinIssAction = ()=> async dispatch =>{
    dispatch({
        type:'GET_CLUB_ISSUE_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/allissue`);
        
        dispatch({
           type:'GET_CLUB_ISSUE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_CLUB_ISSUE_FAILED',
           payload:error
       })
    }
}


export const addClubAction = (user) => async dispatch => {
    dispatch({
        type: 'ADD_CLUB_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/addclub`, user);
       
        dispatch({
            type: 'ADD_CLUB_SUCCESS',
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: 'ADD_CLUB_FAILED',
            payload: error
        })
    }
}

// export const addSubjectAction = (user) => async dispatch => {
//     dispatch({
//         type: 'ADD_SUBJECT_REQUEST'
//     })

//     try {
//         const res = await axios.post(`${BASE_URL}/addSub`, user);
       
//         dispatch({
//             type: 'ADD_SUBJECT_SUCCESS',
//             payload:res.data
//         })
//     } catch (error) {
//         dispatch({
//             type: 'ADD_SUBJECT_FAILED',
//             payload: error
//         })
//     }
// }

export const addSubjectAction = (user) => async dispatch => {
    dispatch({
        type: 'ADD_SUBJECT_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/addSub`, user);
       
        dispatch({
            type: 'ADD_SUBJECT_SUCCESS',
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: 'ADD_SUBJECT_FAILED',
            payload: error
        })
    }
}



export const deleteSingleStu = (user) => async dispatch => {
    console.log("Deleting student with Email:", user.email);
  
    dispatch({
      type: 'DELETE_STUDENT_REQUEST'
    });
  
    try {
      const res = await axios.delete(`${BASE_URL}/deleteStu`, { data: user });
  
      dispatch({
        type: 'DELETE_STUDENT_SUCCESS',
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_STUDENT_FAILED',
        payload: error
      });
    }
  };
  
export const editSingleStu = (user) => async dispatch => {
    console.log("Deleting student with Email:", user.email);
  
    dispatch({
      type: 'DELETE_STUDENT_REQUEST'
    });

    
  
    try {
        const user = await axios.get(`${BASE_URL}/getStu`, {data: user})
        console.log(user);

      const res = await axios.post(`${BASE_URL}/stuUpd`, { data: user });
  
      dispatch({
        type: 'DELETE_STUDENT_SUCCESS',
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_STUDENT_FAILED',
        payload: error
      });
    }
  };
  

export const getAllSubAction = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_SUBJECT_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/allSub`);
        console.log("reas",response)
        dispatch({
           type:'GET_All_SUBJECT_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_SUBJECT_FAILED',
           payload:error
       })
    }
}


export const acJoinRq = (id) => async dispatch => {
    console.log(id)
    try {
        const res = await axios.post(`${BASE_URL}/acjoinclub`,{id});
        const response = await axios.get(`${BASE_URL}/allissue`);
        
        dispatch({
           type:'GET_CLUB_ISSUE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_CLUB_ISSUE_FAILED',
           payload:error
       })
    }
       
   
}

export const reqToJoinClubAction = (user) => async dispatch => {
    dispatch({
        type: 'JOIN_CLUB_REQUEST'
    })
    console.log(user)
    try {
        const res = await axios.post(`${BASE_URL}/joinclub`, user);
       
        dispatch({
            type: 'JOIN_CLUB_SUCCESS',
            payload:res.data
        })
        const response = await axios.get(`${BASE_URL}/allclub`);
        
        dispatch({
           type:'GET_All_CLUB_SUCCESS',
           payload:response.data
       })
    } catch (error) {
        dispatch({
            type: 'JOIN_CLUB_FAILED',
            payload: error
        })
    }
}

export const AcReqToJoinClubAction = (user) => async dispatch => {
    dispatch({
        type: 'ACJOIN_CLUB_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/acjoinclub`, user);
       
        dispatch({
            type: 'ACJOIN_CLUB_SUCCESS',
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: 'ACJOIN_CLUB_FAILED',
            payload: error
        })
    }
}

export const getAllFaculty = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_FACULTY_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/getAllFac`);
        console.log("reas",response)
        dispatch({
           type:'GET_All_FACULTY_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_FACULTY_FAILED',
           payload:error
       })
    }
}

export const deleteSingleTeacher = (user) => async dispatch => {
    console.log("Deleting Teacher with Email:", user.email);
  
    dispatch({
      type: 'DELETE_STUDENT_REQUEST'
    });
  
    try {
      const res = await axios.delete(`${BASE_URL}/deleteTeacher`, { data: user });
  
      dispatch({
        type: 'DELETE_STUDENT_SUCCESS',
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_STUDENT_FAILED',
        payload: error
      });
    }
  };