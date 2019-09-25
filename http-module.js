import Post from './post';
/*
This class is just an example of how
we could create http server with get and post method without express
or any other framework, but we will not implement this file ever
because its not effecaint method to pass all route through if statements.
*/

const http = require('http');

// create a server
const server = http.createServer((req, res) =>{
  
// we use if here To route to different incoming requests  
    if (req.url === '/') {
        res.write('This message from http server');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify(Post));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000');