const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;


//middleware: 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('User_Management_Server_is_Running')
});
/**
 * 
 * random data for get users : 
 */

const fakeUserData = [{
    "id": 1,
    "first_name": "Annabell",
    "gender": "Female",
    "contact": "+54 112 102 0213",
    "age": 48
}, {
    "id": 2,
    "first_name": "Artemis",
    "gender": "Male",
    "contact": "+62 669 692 0944",
    "age": 59
}, {
    "id": 3,
    "first_name": "Abramo",
    "gender": "Male",
    "contact": "+1 520 433 8620",
    "age": 94
}, {
    "id": 4,
    "first_name": "Fritz",
    "gender": "Male",
    "contact": "+46 977 815 7270",
    "age": 83
}]
app.get("/users", (req, res) => {
    res.send(fakeUserData);
});
app.post("/users", (req, res) => {

    // console.log("post api hitting : ");
    // console.log(req.body);
    const newUser = req.body;
    newUser.id = fakeUserData.length + 1;
    fakeUserData.push(newUser);
    res.send(newUser);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})