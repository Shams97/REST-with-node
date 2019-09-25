
/*
/This class will use express framework 
/to send and recieve request
*/
const express = require('express');
const app = express();
// Here is joi library which will check the validation of input 
const Joi = require('joi');
// adding a piece of middleware
app.use(express.json());

const posts = [
    { id: 1, name: 'post1' },
    { id: 2, name: 'post2' },
    { id: 3, name: 'post3' },
    { id: 4, name: 'post4' },
];

/*get request 
/ to run this please type :node index.js in the command line 
/ and the console will print message 
*/
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});
/*sends an id as a parameter [it could be any name] 
/ when we have array of post we will find post with given id
/ and check it, otherwise 404 error will appear
*/
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post)
        res.status(404).send('The post with given ID was not found');
    else
        res.send(post);
});


//POST the request 
//If you have a db you will 
app.post('/api/posts', (req, res) => {
    const result = validatePost(req.body);
    // givin an error condition for validation 
    if (result.error)
        return res.status(404).send(result.error.details[0].message);

    const post = {
        id: post.length + 1,
        name: req.body.name,
    }
    posts.push(post);
    res.send(post);
});

app.put('/api/posts/:id', (req,res)=>{
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post)
        res.status(404).send('The post with given ID was not found');

     const result = validatePost(req.body);
     if (result.error)
     return res.status(404).send(result.error.details[0].message);

     post.name = req.body.name;
     res.send(post);

});

function validatePost(post){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return   Joi.validate(post, schema);
}
/* 
/you can do the same with delete  methods
*/


// Create a dynamic port through variable environment 
// Else use the defualt port 3000  
const port = process.env.PORT || 3000
// app.set('port', process.env.PORT || 3000);
app.listen(port, () => console.log(`Listeneing to port ${port}`));


