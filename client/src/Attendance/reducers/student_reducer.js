

export const getStuByClassReducer = (state={students:[]},action)=>{
    switch(action.type){
        case 'GET_STUDENTS_REQUEST':
            return {...state,loading:true}
        case 'GET_STUDENTS_SUCCESS':
            return {
                students:action.payload,loading:false
            }    
        case 'GET_STUDENTS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

//new update sub url
//
export const updateStudentMarksReducer = (state={students:[]},action)=>{
   
    switch(action.type){
        case 'UPDATE_STUDENT_MARKS_REQUEST':
            console.log("Reducer request")
            return {...state,loading:true}
        case 'UPDATE_STUDENT_MARKS_SUCCESS':
            console.log("Reducer success")

            return {
                updateStudentWithMarks:action.payload,loading:false
            }    
        case 'UPDATE_STUDENT_MARKS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}
export const updateSubjectReducer = (state={students:[]},action)=>{
   
    switch(action.type){
        case 'UPDATE_SUBJECT_REQUEST':
            console.log("Reducer request")
            return {...state,loading:true}
        case 'UPDATE_SUBJECT_SUCCESS':
            console.log("Reducer success")

            return {
                updateSubject:action.payload,loading:false
            }    
        case 'UPDATE_SUBJECT_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}
//new get student by subject
//
export const getStuBySubjectReducer = (state={students:[]},action)=>{
   
    switch(action.type){
        case 'GET_STUDENTSBYSUB_REQUEST':
            return {...state,loading:true}
        case 'GET_STUDENTSBYSUB_SUCCESS':
            return {
                studentsBySub:action.payload,loading:false
            }    
        case 'GET_STUDENTSBYSUB_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}



//new get subject bu batch
export const getSubByBatchReducer = (state={subjects:[]},action)=>{
    switch(action.type){
        case 'GET_SUBJECS_REQUEST':
            return {...state,loading:true}
        case 'GET_SUBJECS_SUCCESS':
            return {
                subjects:action.payload,loading:false
            }    
        case 'GET_SUBJECS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}






export const enrollSubjectReducer = (state = { subjects: [] }, action) => {
    switch (action.type) {
      case 'ENROLL_SUBJECT_REQUEST':
        return { ...state, loading: true };
      case 'ENROLL_SUBJECT_SUCCESS':
        return {
          subjects: action.payload,
          loading: false,
        };
      case 'ENROLL_SUBJECT_FAILED':
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };

export const getAllStuReducer = (state={allstudents:[]},action)=>{
    switch(action.type){
        case 'GET_All_STUDENTS_REQUEST':
            return {...state,loading:true}
        case 'GET_All_STUDENTS_SUCCESS':
            return {
                allstudents:action.payload,loading:false
            }    
        case 'GET_All_STUDENTS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const addReportReducer = (state={reports:[]},action)=>{
    switch(action.type){
        case 'ADD_REPORT_REQUEST':
            return {...state , loading:true}    
        case 'ADD_REPORT_SUCCESS':
            return {...state,
                reports:[...state.reports ,action.payload ],
                loading:false
            }
       
           
       
        default:
            return state         
    }
}

export const getAllRepReducer = (state={allreport:[]},action)=>{
    switch(action.type){
        case 'GET_All_REPORT_REQUEST':
            return {...state,loading:true}
        case 'GET_All_REPORT_SUCCESS':
            return {
                allreport:action.payload,loading:false
            }    
        case 'GET_All_REPORT_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}




// export default studentReducer;
