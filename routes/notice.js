const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Notice = require('../models/notice')
const Club = require('../models/club')
const Issue = require('../models/Issue')
const Report = require('../models/Report')
const Subject = require('../models/Subject')

router.get('/allnotice',(req,res)=>{
    Notice.find()
   
  
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addnotice', (req, res) => {
    console.log("Notice post")
    const { title, content, target, batch, module, date } = req.body
    console.log(req.body)
    if (!title || !content || !target || !date) {
      return res.status(422).json({ error: "Please add all the fields" })
    }
    if (target === 'batch' && !batch) {
      return res.status(422).json({ error: "Please select a batch" })
    }
    if (target === 'module' && !module) {
      return res.status(422).json({ error: "Please select a module" })
    }
    const post = new Notice({ title, content, target, batch, module, date })
    post.save().then(result => {
      res.json(result)
    })
      .catch(err => {
        console.log(err)
      })
  })
  
// router.post('/addnotice',(req,res)=>{
//     const {title,content} = req.body 
//     console.log(req.body)
//     if(!title || !content){
//       return  res.status(422).json({error:"Plase add all the fields"})
//     }
//      const post = new Notice({title,content})
//     post.save().then(result=>{
//         res.json(result)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
router.post('/addreport',(req,res)=>{
    const {title,body,postedBy} = req.body 
   
    if(!title || !body){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
     const post = new Report({title,body,postedBy})
    post.save().then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.post('/addSub',(req,res)=>{
//     const {sub_name,sub_code,sub_class,sub_credit,sub_type,sub_enrollmentkey,sub_sem} = req.body 
   
   
//      const post = new Subject({sub_name,sub_code,sub_class,sub_credit,sub_type,sub_enrollmentkey,sub_sem})
//     post.save().then(result=>{
//         res.json(result)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

router.post('/addSub', (req, res) => {
    const { sub_name, sub_code, sub_class, sub_credit, sub_type, sub_enrollmentkey, sub_sem } = req.body;
  
    Subject.findOne({ sub_code: sub_code })
      .then((subject) => {
        if (subject) {
          res.status(400).json({ error: 'Subject with this code already exists' });
        } else {
          const post = new Subject({ sub_name, sub_code, sub_class, sub_credit, sub_type, sub_enrollmentkey, sub_sem });
          post.save()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

router.get('/allSub',(req,res)=>{
    Subject.find()
   
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})



router.get('/allreport',(req,res)=>{
    Report.find()
   
  
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addclub',(req,res)=>{
    const {name,description} = req.body 
 
    if(!name || !description){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
     const post = new Club({name,description})
    post.save().then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/allclub',(req,res)=>{
    Club.find()
   
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/allissue',(req,res)=>{
    Issue.find()
   
  
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/joinclub',async(req,res)=>{
    const {userId,cuser,clubId,clubName} = req.body
   
    const club = await Club.findOne({_id:clubId});
     club.members.push(userId);
     await club.save();

    const issue = new Issue({clubId,userId,stuDetail:cuser,clubName})
    await issue.save();
    
    // const memdata = {userId,userName,userClass,pending:true}
    // club.members.push(memdata);
    //  await club.save()
})

router.post('/acjoinclub',  async(req,res)=>{
     const {id} = req.body 
   
     const issue = await Issue.findOne({_id:id})
      issue.isIssue = true ;
      await issue.save();
})


module.exports = router