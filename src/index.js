const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const studentArray = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var y = 8;


app.get('/api/student',(req,res)=>{
    res.json(studentArray);
});
app.get('/api/student/:id', (req,res) => {
    const id = req.params.id;
    const ans = studentArray.find(ans => ans.id === parseInt(id));
    if(!ans) {
        res.status(404).send();
        return;
    }
    res.json(ans);
    
})
// [name,currentClass,division]
app.post('/api/student', (req, res, next) => {
    let x = req.body;

    if(x.name && x.currentClass && x.division)
    {
        studentArray.push({
            name : x.name,
            currentClass : x.currentClass,
            division : x.division,
            id : ++y
        });
        res.json(y);
    }
    else {
        res.sendStatus(400);
    }
})

app.put('/api/student/:id', (req, res, next) => {
    let x = req.body;
    const id = req.params.id;
    const ans = studentArray.find(ans => ans.id === parseInt(id));
    if(!ans) {
        res.status(400).send();
        return;
    }
    if(!x.name)
    {
        res.status(400).send();
        return;
    }
    ans.name = x.name;
    res.writeHead(200,{'content-type':'application/x-www-form-urlencoded'});
    res.json(ans);
})

app.delete('/api/student/:id', (req, res, next) => {
    let x = req.body;
    const id = req.params.id;
    const index = studentArray.findIndex(ans => ans.id === parseInt(id));
    if(index === -1) {
        res.status(404).send();
        return;
    }
    studentArray.splice(index,1);
    res.json(id);
})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   