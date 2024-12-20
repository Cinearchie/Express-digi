import express, { text } from 'express'
import 'dotenv/config'
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

let arr = []

let nextId = 1;

app.post('/info' , (req,res) => {
    const {name , price } = req.body
    const newInfo = {id: nextId++ , name , price}
    arr.push(newInfo)
    res.status(201).send(newInfo)
})

app.get('/info' , (req,res) => {
    res.status(200).send(arr)
})

app.get("/info/:id",(req,res)=>{
    const found = arr.find(el => el.id === parseInt(req.params.id))
    
    if(!found){
        return res.status(200).send('Not found')
    }
    res.status(200).send(found)
})

app.put('/info/:id',(req,res)=>{
    const found = arr.find(el => el.id === parseInt(req.params.id))
    
    if(!found){
        return res.status(404).send("Not found")
    }
    const {name , price} = req.body
    found.name = name
    found.price = price
    res.status(200).send(found)
})

app.delete('/info/:id',(req,res)=>{
    const index = arr.findIndex(el => el.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send('not found')
    }

    arr.splice(index,1)
    return res.status(204).send('deleted')
})
app.listen(port , () => {
    console.log(`Server listening to port ${port}`)
})

