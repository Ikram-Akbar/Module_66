const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;


//middleware: 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://user_management_admin:pppp0000@cluster0.f8emp.mongodb.net/?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f8emp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        const userCollection = client.db("userDB").collection("users");

        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.status(200).send(result)
        });
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.status(200).send(result);
        })

        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
        });

        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    first_name: user.first_name,
                    age: user.age,
                    contact: user.contact
                }
            };
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);


        })
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('User_Management_Server_is_Running')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})