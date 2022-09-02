//Install express server
const express = require('express');
const path = require('path');
const app = express();


// const multer = require("multer");
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "src/assets/")
//     }
// });


// Serve only the static files form the dist directory
app.use(express.static(__dirname+'/dist/angular-real-estate'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname +'/dist/angular-real-estate/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);



