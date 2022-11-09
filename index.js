const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express();

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lfwjozb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
try{

    const serviceCollection = client.db('serviceReviewDB').collection('services')

    app.get('/services',async(req,res)=>{
        const query = {};
        const cursor = serviceCollection.find(query)
        const services = await cursor.limit(3).toArray()
        res.send(services)
    })

    app.get('/allservices',async(req,res)=>{
        const query = {};
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
    })

    app.get('/services/:id',async(req,res)=>{
        const query = {};
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
    })

}
finally{

}
}
run().catch(error=>{console.log(error)})




app.get('/',(req, res)=>{
    res.send('read from the browser')
})

app.listen(port, ()=>{
    console.log('server is running')
})