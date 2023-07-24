import {BASE_URL} from '../../helper';
import axios from "axios"

console.log("URLs");
console.log(BASE_URL);


// import {useHistory} from 'react-router-dom'

export const getStudentByClass = (clsName)=> async dispatch =>{
    dispatch({
        type:'GET_STUDENTS_REQUEST'
    })
  
    try {
        dispatch({
            type:'GET_STUDENTS_SUCCESS',
            payload:null
        })
       
        const response = await axios.post(`${BASE_URL}/getStuByClass`,clsName);
         // console.log(response.data);
        dispatch({
           type:'GET_STUDENTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_STUDENTS_FAILED',
           payload:error
       })
    }
}

//new for get stu by sub
export const getStuBySubject = (sub_code)=> async dispatch =>{
    console.log(" getStuBySubject Action called")
    // console.log(sub_code)
    dispatch({
        type: 'GET_STUDENTSBYSUB_REQUEST'
      })
    
      try {
        const response = await axios.post(`${BASE_URL}/getStuBySub`, sub_code);
        console.log("getStuBySubject response is");
        console.log(response.data);
        dispatch({
          type: 'GET_STUDENTSBYSUB_SUCCESS',
          payload: response.data
        })
      } catch (error) {
        dispatch({
          type: 'GET_STUDENTSBYSUB_FAILED',
          payload: error
        })
      }
}

// new for update sub url
export const updateSubject = (sub_code, excelSheet_marksUrl) => async (dispatch) => {
    console.log('sub update url Action called');
    console.log(sub_code);
    console.log(excelSheet_marksUrl);
    dispatch({
      type: 'UPDATE_SUBJECT_REQUEST',
    });
  
    try {
      const response = await axios.post(`${BASE_URL}/updateSubUrl`, { sub_code, excelSheet_marksUrl });
      console.log('getStuBySubject response is');
      console.log(`Response is ${response.data}`);
      dispatch({
        type: 'UPDATE_SUBJECT_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_SUBJECT_FAILED',
        payload: error,
      });
    }
  };

// update student marks
export const updateStudentMarks = (studentId, subject, marks) => async (dispatch) => {
    dispatch({
      type: 'UPDATE_STUDENT_MARKS_REQUEST',
    });
  
    try {
      console.log(`${studentId} , ${subject} , ${marks}`)
      const response = await axios.post(`${BASE_URL}/updateStudentMarksUrl`, { studentId, subject, marks });
      console.log(response);
      
      dispatch({
        type: 'UPDATE_STUDENT_MARKS_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_STUDENT_MARKS_FAILED',
        payload: error,
      });
    }
  };
  
  


//new getsubjects by batch
export const getSubByBatch = (sub_class) => async dispatch => {
    dispatch({
      type: 'GET_SUBJECS_REQUEST'
    })
  
    try {
      const response = await axios.post(`${BASE_URL}/getSubByBatch`, sub_class);
      console.log(response.data);
      console.log("Hello");
      dispatch({
        type: 'GET_SUBJECS_SUCCESS',
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: 'GET_SUBJECS_FAILED',
        payload: error
      })
    }
  }
  
///



export const makeStuAttendance = (clsName,obj)=> async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };
    try {
        
        const response = await axios.post(`${BASE_URL}/makeAttdence`,obj,config);

        console.log("response",response);
      
         const response1 = await axios.post(`${BASE_URL}/getStuByClass`,clsName);
        console.log(response1);
        // console.log("oksklsllsls")
        dispatch({
           type:'GET_STUDENTS_SUCCESS',
           payload:response1.data
       })
    } catch (error) {
       dispatch({
           type:'GET_STUDENTS_FAILED',
           payload:error
       })
    }   
}

export const uploadStuMark = (clsName,obj)=> async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };
    try {
        
        const response = await axios.post(`${BASE_URL}/uploadMark`,obj,config);

        console.log("response",response);
      
         const response1 = await axios.post(`${BASE_URL}/getStuByClass`,clsName);
        console.log(response1);
        // console.log("oksklsllsls")
        dispatch({
           type:'ENROLL_SUBJECT',
           payload:response1.data
       })
    } catch (error) {
       dispatch({
           type:'GET_STUDENTS_FAILED',
           payload:error
       })
    }   
}

export const getAllStudent = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_STUDENTS_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/getAllStuClass`);
        console.log("reas",response)
        dispatch({
           type:'GET_All_STUDENTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_STUDENTS_FAILED',
           payload:error
       })
    }
}

export const getAllRportAction = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_REPORT_REQUEST'
    })
    try {
        const response = await axios.get(`${BASE_URL}/allreport`);
     
        dispatch({
           type:'GET_All_REPORT_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_REPORT_FAILED',
           payload:error
       })
    }
}

export const addReportAction = (user) => async dispatch => {
    dispatch({
        type: 'ADD_REPORT_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/addreport`, user);
       
        dispatch({
            type: 'ADD_REPORT_SUCCESS',
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: 'ADD_REPORT_FAILED',
            payload: error
        })
    }
}


export const updateTProfileAction = (user) => async dispatch => {
    dispatch({
        type: 'UPDATE_TPROFILE_REQUEST'
    })

    try {
        const res = await axios.post(`${BASE_URL}/api/teac/teaUpd`, user);
       
        dispatch({
            type: 'UPDATE_TPROFILE_SUCCESS',
            payload:res.data
        })

        window.location.href = "/teacher/dashboard";

    } catch (error) {
        dispatch({
            type: 'UPDATE_PROFILE_FAILED',
            payload: error
        })
    }
}


export const updateProfileAction = (user) => async dispatch => {
    dispatch({
        type: 'UPDATE_PROFILE_REQUEST'
    })



    try {
        const res = await axios.post(`${BASE_URL}/stuUpd`, user);
       
        dispatch({
            type: 'UPDATE_PROFILE_SUCCESS',
            payload:res.data
        })



        window.location.href = "/student/dashboard";
    
    } catch (error) {
        dispatch({
            type: 'UPDATE_PROFILE_FAILED',
            payload: error
        })
    }

}

// studentActions.js

export const enrollSubjectAction = (subjectDetails,currentUserId) => async dispatch => {
    console.log('enrollSubjectAction executed');
    // console.log(subjectDetails);
    dispatch({
        
      type: 'ENROLL_SUBJECT_REQUEST',
    });
    try {
      const res = await axios.post(`${BASE_URL}/enrollSubject`, {subjectDetails,currentUserId});
    //   const res = await axios.post("/getAllStuClass", subjectDetails);
      dispatch({
        type: 'ENROLL_SUBJECT_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'ENROLL_SUBJECT_FAILED',
        payload: error,
      });
    }
  };






