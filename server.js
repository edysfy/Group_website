const http = require('http');
const app = require('./backend/express/app');

/* set up the port variable*/
const port = process.env.PORT || '3001';
app.set("port",port);


/*create server using express app and listen on port*/
const server = http.createServer(app);
server.listen(port);
