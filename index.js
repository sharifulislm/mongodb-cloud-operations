const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const object = require('mongodb').ObjectId;
const cors = require('cors');
const app =express();
const port = process.env.PORT || 5000;

// use middleware

app.use(cors());
app.use(express.json());



// user name : esc1
// password : amar leptop ar google drive a set 



const uri = "mongodb+srv://esc1:EXevHlucfvh1UN1w@cluster0.yvc37.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
       
    try{
        await client.connect();
        const usercollection = client.db("foodExpress").collection("user");
           
  
          app.get('/user', async(req, res) => {
              const query = {};
              const cursor = usercollection.find(query);
              const users = await cursor.toArray();
              res.send(users);
          })
                // id didya uder khuje berkorar jonne
          app.get('/user/:id', async(req, res) => {
              const id = req.params.id;
              const query = {_id: ObjectId(id)};
              const result = await usercollection.findOne(query);
              res.send(result);
          })


        //post user : add a new user
        app.post('/user', async(req,res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await usercollection.insertOne(newUser);
            res.send(result)
         
        });

       // updateuser 
      app.put('/user/:id', async(req, res) => {
          const id = req.params.id;
          const updatedUser = req.body;
          const filter = {_id: ObjectId(id)};
          const options = { upsert: true};
          const updatedDoc = {
              $set: {
                  name: updatedUser.name,
                  email: updatedUser.email
              }
          };
          const result = await usercollection.updateOne(filter,updatedDoc,options);
          res.send(result);

      })
 


        // delete a user 
        app.delete('/user/:id' , async(req,res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await usercollection.deleteOne(query);
            res.send(result);
        })
         



       
    }finally{
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send('Running My Node CRUD server');
});

app.listen(port, () => {
    console.log('CRUD Server is running ');
});