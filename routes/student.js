const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Student = require('../models/student_new')
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const Subject = require('../models/Subject')
// const xlsx = require('xlsx');

const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: "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",
      },
    })
  );


  //// for excell sheet
  router.get('/students/:subjectCode', async (req, res) => {
    try {
      // Get the subject code from the request parameters
      const subjectCode = req.params.subjectCode;
  
      // Find the subject with the given code
      const subject = await Subject.findOne({ sub_code: subjectCode });
  
      // Check if the subject was found
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
  
      // Find all students who have the given subject in their subjects array
      const students = await Student.find({ subjects: subject._id });
  
      // Create a new workbook
      const workbook = xlsx.utils.book_new();
  
      // Create an array of objects representing the student data
      const studentData = students.map(student => ({
        Name: student.name,
        Surname: student.surname,
        Email: student.email,
        Roll_No: student.Roll_No,
        Attendance: ''
      }));
  
      // Create a new worksheet from the student data
      const worksheet = xlsx.utils.json_to_sheet(studentData);
  
      // Add the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');
  
      // Generate a buffer from the workbook
      const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
      // Set the response headers to trigger a download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=students-${subjectCode}.xlsx`);
  
      // Send the buffer as the response
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the Excel sheet' });
    }
  });


  //Update stu marks
  router.post('/updateStudentMarksUrl', (req, res) => {
    const { studentId, subject, marks } = req.body;
  
  
    // Find the student by studentId
    Student.findOne({ Roll_No: studentId })
      .then((student) => {
        // Log the value of student
        console.log('student:', student.markList);
  
        if (student) {
          // Find the mark for the current subject in the student's markList array
          const mark = student.markList.find((mark) => mark.subject === subject);
  
          // Log the value of mark before the update
          console.log('mark (before update):', mark);
  
          if (mark) {
            // Update the mark's smark field
            mark.smark = marks;
          } else {
            // Add a new mark to the student's markList array with subject as a string
            student.markList.push({ subject: subject.toString(), smark: marks });
          }
  
          // Update the student document using findOneAndUpdate
          Student.findOneAndUpdate(
            { Roll_No: studentId },
            { markList: student.markList },
            { new: true, useFindAndModify: false } // new: true returns the updated document, useFindAndModify: false to avoid deprecation warning
          )
            .then((updatedStudent) => {
              console.log('Updated student:', updatedStudent);
              res.json(updatedStudent);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: 'An error occurred while updating the student' });
            });
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while finding the student' });
      });
  });
  
  
  ///
  
// router.post('/updateSubUrl', (req, res) => {
//   const { sub_code, excelSheet_marksUrl } = req.body;
//   console.log("Post ")
//  console.log("In post request")
//   // find the subject by subjectId
//   Subject.findOne({ sub_code: sub_code })
//       .then(subject => {
//           if (subject) {
//               // update the subject's excelSheet_marksUrl
//               subject.excelSheet_marksUrl = excelSheet_marksUrl;
//               subject.save()
//                   .then(updatedSubject => {
//                       res.json(updatedSubject);
//                   })
//                   .catch(err => {
//                       console.log(err);
//                       res.status(500).json({ error: 'An error occurred while updating the subject' });
//                   });
//           } else {
//               res.status(404).json({ error: 'Subject not found' });
//           }
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json({ error: 'An error occurred while finding the subject' });
//       });
// });


  
router.post('/stuReg',(req,res)=>{
    console.log(req.body)
   const {name,surname,mother_name,father_name,date_of_birth,age,gender,addmision_year,address,
    email,password,Roll_No,clsName,mobile} = req.body 
//   console.log(req.body )
  if(!email || !password || !name || !Roll_No || !clsName){
     return res.status(410).json({error:"please add all the fields"})
  }
  Student.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(411).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new Student({
               
                password:hashedpassword,surname,mother_name,father_name,date_of_birth,age,gender,addmision_year,address,
                name,email,Roll_No,clsName,mobile
                
            })
         
            user.save()
            .then(user=>{
                
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})


router.delete('/deleteStu', (req, res) => {
  const { email } = req.body;
  console.log("Deleting student with Email:", email);

  if (!email) {
    return res.status(400).json({ error: "Invalid deletion request" });
  }

  Student.findOneAndDelete({ email })
    .then(deletedStudent => {
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});



router.post('/StuSign',(req,res)=>{
  const {email,password} = req.body
  console.log(req.body)
  if(!email || !password){
     return res.status(410).json({error:"please add email or password"})
  }
  Student.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.status(411).json({error:"Invalid Email or password"})
      }
      console.log(savedUser)
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
          if(doMatch){
           
              // res.json({message:"successfully signed in"})
             const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
             const {_id,name,email,pic,mobile,Roll_No,clsName,isAdmin,surname,father_name,mother_name,addmision_year,address,date_of_birth,age,gender} = savedUser
             
             res.json({token,user:{_id, name,email,pic,mobile,Roll_No,clsName,isAdmin,surname,father_name,mother_name, gender, addmision_year,address,date_of_birth,age}})
          }
          else{
              return res.status(412).json({error:"Invalid Email or password"})
          }
      })
      .catch(err=>{
          console.log(err)
      })
  })
})




router.post('/getStuByClass',(req,res)=>{
  console.log(req.body)
    Student.find({clsName:req.body.clsName})
    
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})

//new for get stu by sub
router.post('/getStuBySub', async (req, res) => {
  console.log("at post");
  console.log(req.body.sub_code);
  try {
    const sub_code = req.body.sub_code;
    const students = await Student.find({ 'subjects.sub_code': sub_code });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//new subject by batch
router.post('/getSubByBatch',(req,res)=>{
  console.log(req.body)
  Subject.find({sub_class:req.body.sub_class})
    
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})
///

router.post('/getStu',(req,res)=>{
  console.log(req.body)
    Student.find({email:req.body.email})
    
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/getAllStuClass',(req,res)=>{
 
    Student.find()
    
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/makeAttdence' ,async(req,res)=>{
    
    const posts = await Student.find({_id:req.body.StudentId})
    const {timestamp,type,StudentId,dateId} = req.body
    const obj = {
      timestamp,type,StudentId,dateId,
      madeBy:"admin"
    }
    posts[0].attdenList.push(obj);
    posts[0].pList.push(dateId);
    posts[0].save();
    res.json(posts)
})

router.post('/uploadMark' ,async(req,res)=>{
    
  const student = await Student.find({_id:req.body.id})
  const { id,sem,credit, smark,subject} = req.body
  const obj = {
    id,sem,credit,smark,subject
  }
  student[0].markList.push(obj);
  student[0].save();
  res.json(student)
})

router.post("/profile", (req, res) => {
  
  console.log(req.body)
  Student.find({ _id: req.body.id })
  .select("-password")
  .then((admins) => {
    res.json(admins);
  })
  .catch((err) => {
    console.log(err);
  });
  });

  router.put('/updatepic',requireLogin,(req,res)=>{
    console.log(req.user)
    Student.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
         console.log(result)
    })
 
})

router.post('/stuUpd', async(req,res)=>{

 const {name,surname,mother_name,father_name,gender,addmision_year,address,
  clsName,mobile,userId} = req.body 
//   console.log(req.body )
    

   const student = await Student.findOne({_id:userId})
   student.name = name 
   student.surname = surname
   student.mother_name = mother_name
   student.father_name=father_name
   student.gender=gender
   student.addmision_year=addmision_year
   student.clsName=clsName
   student.mobile=mobile
   student.address = address 

   await student.save()

})

//////////////////////////////////////////////
router.post('/addEnrollSub',async(req,res)=>{
  // const posts = await Student.find({_id:req.body.StudentId})
  // const {timestamp,type,StudentId,dateId} = req.body
  // const obj = {
  //   timestamp,type,StudentId,dateId,
  //   madeBy:"admin"
  // }
  // posts[0].attdenList.push(obj);
  // posts[0].pList.push(dateId);
  // posts[0].save();
  // res.json(posts)
  // console.log("@Student post");

  console.log(req.body);
})

router.post('/addEnrollSub', async (req, res) => {
  console.log("@Student post");

  console.log(req.body);

  // Your remaining code here

  // res.json(...)
});



router.post('/enrollSubject', async (req, res) => {
  const currentUserId = req.body.subjectDetails.currentUserId;
  console.log(currentUserId);

  const { _id, subjectDetails } = req.body.subjectDetails;
  console.log(_id);

  const student = await Student.findOne({ _id: currentUserId });
  if (student) {
    const { subjects } = student;

    const { id, sub_code, sub_name, sub_credit, sub_class, sub_enrollmentkey, sub_sem, sub_type } = subjectDetails;
    const subjectObj = {
      id,
      sub_code,
      sub_name,
      sub_credit,
      sub_class,
      sub_enrollmentkey,
      sub_sem,
      sub_type
    };

    subjects.push(subjectObj);
    await student.save();
    console.log(student);
    res.json(student);
  } else {
    console.log("Student not found");
    res.status(404).json({ message: "Student not found" });
  }
});




module.exports = router