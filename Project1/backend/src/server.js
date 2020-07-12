const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;
const routes = require('./routes');
const path = require('path');

/** When using POST method with application/x-www-form-urlencoded enctype,
 *  the BODY(not url like GET method) of the HTTP message sent to the server is essentially one giant query string 
 *  
 * 
 *  multipart/form-data Request Format:
 * 
 *  Content-Disposition: form-data; name="email"
 *  test@test4.com
 *  Content-Disposition: form-data; name="password"
 *  password
 *
 */

 /** application/x-www-form-urlencoded Request Format:
  *  
  *  email=test%40test4.com&password=password
  *
  */

// You could use middleware here (app.use(callback)) to receive an info before you send the request out to the client.
// Callback needs to have NEXT argument (req, res ,next) so when the callback is called you could call the next middleware.
// (middleware specific to the url the client is in) 

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

app.use(cors()); //Access-Control-Allow-Origin: *

app.use(express.json());

try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Mongo DB connected');
}catch(error){
    console.log(error);
}

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, "..", "files")))

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
})