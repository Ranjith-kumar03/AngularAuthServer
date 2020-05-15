const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require ('../Models/user')
const mongoose = require('mongoose')

const db="mongodb://userranjith:09kgt7ZJXNXoJlze@cluster0-shard-00-00-i2k7r.mongodb.net:27017,cluster0-shard-00-01-i2k7r.mongodb.net:27017,cluster0-shard-00-02-i2k7r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(db,  { useNewUrlParser: true },  (err) => {
    if (err) throw err;
        console.log(`Successfully connected to database.`);
})
router.get('/' , (req,res) => {
    res.send('from API Route')
})

router.post('/register', (req , res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error , registerdUser) => {
        if(error)
        {
            console.log(error)
        }else {
            let payload = { subject : registerdUser._id}
            let token = jwt.sign(payload , 'secretKey')
           // res.status(200).send(registerdUser)
           res.status(200).send({token})
        }
    })
})


router.post('/login', (req , res) => {
    let userData = req.body
    
    User.findOne({email: userData.email}, (error , user) => {
        if(error)
        {
            console.log(error)
        }else {
            if(!user)
            {
                res.status(401).send("Invalid Emasil")
            }else
            if(user.password != userData.password)
            {
                res.status(401).send("invalid password")
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload , 'secretKey')
               // res.status(200).send(user)
               res.status(200).send({token})
            }
        }
    })
})

router.get('/events' , (req , res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events)
    })

    router.get('/special' , verifyToken , (req , res) => {
        let events = [
            {
              "_id": "1",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            },
            {
              "_id": "2",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            },
            {
              "_id": "3",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            },
            {
              "_id": "4",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            },
            {
              "_id": "5",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            },
            {
              "_id": "6",
              "name": "Auto Expo",
              "description": "lorem ipsum",
              "date": "2012-04-23T18:25:43.511Z"
            }
          ]
          res.json(events)
        })

   function verifyToken(req , res , next)
   {
     if(!req.headers.authorization)
     {
       return res.status(401).send('UnAuthorized Request')
     }
     let token =req.headers.authorization.split(' ')[1]
     if(token === 'null')
     {
      return res.status(401).send('UnAuthorized Request')
     }
     let payload = jwt.verify(token , 'secretKey')
     if(!payload)
     {
      return res.status(401).send('UnAuthorized Request')
     }
     req.userId=payload.subject
     next()
   }
module.exports=router