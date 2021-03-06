const express = require("express");
const path = require("path");
const app = express();
app.use('/', express.static(path.join(__dirname, 'dist/PWF')));
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';
app.listen(PORT, IP, (error) => {
    if(error)
        return console.log(`[ FAIL ] Erro ao subir servidor: ${error}`);
    return console.log(`[  OK  ] Servidor iniciado em ${IP}:${PORT}`);
});
