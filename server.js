// const express = require("express");
// const path = require("path");
// const app = express();
// app.use('/', express.static(path.join(__dirname, 'dist/example')));
// const PORT = process.env.PORT || 8080;
// const IP = process.env.IP || '0.0.0.0';
// app.listen(PORT, IP, (error) => {
//     if(error)
//         return console.log(`[ FAIL ] Erro ao subir servidor: ${error}`);
//     return console.log(`[  OK  ] Servidor iniciado em ${IP}:${PORT}`);
// });
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/<name-of-app>'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);