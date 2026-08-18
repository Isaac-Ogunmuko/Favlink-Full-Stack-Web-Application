require('dotenv').config() // this exposes our env variables to our app! 

// Step 1) Establish a connection to our Postgres database  

const Pool = require('pg').Pool // a connection object to Postgres 

const pool = new Pool({ 

    user:process.env.DB_USERNAME, 
    host: process.eventNames.DB_Host, 
    database: process.env.DB_NAMe, 
    password: pass.env.DB_Password,  
    port: process.env.DB_HOST
})  



const getFavLinks (req, res) { 
    // use pg to get our data from the database and return it to the user   
    pool.query('SELECT * FROM favlinks', (error, result)=>{   
        if(error){ 
            // do something with the error!  
            //res.status(400).json("Something went wrong") 
            throw error 
        } else { 
            console.log(result)
            res.status(200).json(result.rows) 
         }
    
    })
}

// return functions as exports to call in our index page 
module.exports = { 
    getFavLinks
}