const express = require('express') //importing the express function from the express lib
const cors = require('cors') // importing cors middleware
const app = express() // we're setting a new variable called app to be an express app instance

const port = 5000 // changed to port 5000 to avoid conflicts with Next.js

// add middleware
app.use(cors()) // enable CORS so your frontend can talk to your backend
app.use(express.json()) // allow us to work with JSON data 

let favLinks = []

// CRUD API
// API function 1 - create something
app.post("/favlink", (req, res)=>{
    let name = req.body.name
    let URL = req.body.URL

    let newFavLink = {name, URL} 

    favLinks.push(newFavLink) 

    if(newFavLink) {
        res.send("success")
    } else {
        res.send("Error!")
    }
})

// API function 2 - read something 
app.get("/favlinks", (req, res)=>{
    res.send(favLinks)
})

// API function 3 - update something

// API function 4 - delete something
app.delete("/favlink", (req, res)=>{
    let name = req.body.name

    favLinks = favLinks.filter((favlink)=>{
        return favlink.name !== name
    })

    res.send(favLinks)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})