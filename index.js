const express = require('express');
const path = require('path');
const members = require('./members');
const logger = require('./middleware/logger');

const app = express();

//init middleware
//app.use(logger);


//Gets from array above
app.get('/api/members', (req,res) => {
    res.json(members);
});

//Get from single array above
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if(found){
        res.json(members.filter(member => member.id === req.params.id));
    }else{
        res.status(400).json({message: `No members with id ${req.params.id} found`});
    }
});

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

