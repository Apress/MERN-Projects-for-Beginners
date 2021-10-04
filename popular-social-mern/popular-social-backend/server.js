//imports
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'
import Posts from './postModel.js'

//app config
Grid.mongo = mongoose.mongo
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:WKeH82Q67sVFPoAa@cluster0.quof7.mongodb.net/popularDB?retryWrites=true&w=majority'

const pusher = new Pusher({
    appId: "1175223",
    key: "e6b78845a265315af885",
    secret: "1ad6b85049db7e2d7f21",
    cluster: "ap2",
    useTLS: true
});

//middleware
app.use(bodyParser.json())
app.use(cors())

//DB Config
const connection = mongoose.createConnection(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

let gfs

connection.once('open', () => {
    console.log('DB Connected')
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: connection_url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            }
            resolve(fileInfo)
        })
    }
})

const upload = multer({ storage })

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected for pusher')
    const changeStream = mongoose.connection.collection('posts').watch()
    changeStream.on('change', change => {
        console.log(change)
        if(change.operationType === "insert") {
            console.log('Trigerring Pusher')
            pusher.trigger('posts','inserted', {
                change: change
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})


//api routes
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/upload/image', upload.single('file'),(req, res) => {
    res.status(201).send(req.file)
})

app.get('/images/single',(req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if(!file || file.length === 0) {
                res.status(404).json({ err: 'file not found' })
            } else {
                const readstream = gfs.createReadStream(file.filename)
                readstream.pipe(res)
            }
        }
    })
})

app.post('/upload/post', (req, res) => {
    const dbPost = req.body
    Posts.create(dbPost, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/posts', (req, res) => {
    Posts.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            data.sort((b,a) => a.timestamp - b.timestamp)
            res.status(200).send(data)
        }
    })
})


//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))