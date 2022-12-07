import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Messages from './dbMessages.js'
import Pusher from 'pusher'

//App COnfig
const app=express()
const port = process.env.PORT || 9000
const connection_url='your-mongodb'

const pusher = new Pusher({
    app_id : "1520583",
    key :"3da329b933ee20b17af7",
    secret :"a8c0a174953d37d580f4",
    cluster :"ap2",
    useTLS: true

});

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

//API Endpoints
const db=mongoose.connection
db.once("open",() => {
    console.log("DB Connected")
    const msgCollection=db.collection("messagingmessages")
    const changeStream=msgCollection.watch()
    changeStream.on('change',change => {
        console.log(change)

        if(change.operationType ==="insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("messages","inserted", {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

app.get("/", (req, res) => res.status(200).send("Hello UIT guys"))

app.post('/messages/new', (req,res)=> {
    const dbMessage=req.body
    Messages.create(dbMessage,(err,data)=>{
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){          
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)

        }
    })
})

//Listener
app.listen(port,() => console.log(`Listening on localhost: ${port}`))