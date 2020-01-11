const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

//Gets from array above
router.get('/', (req,res) => {
    res.json(members);
});

//Get from single array above
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if(found){
        res.json(members.filter(member => member.id === req.params.id));
    }else{
        res.status(400).json({message: `No members with id ${req.params.id} found`});
    }
});

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        status: 'active'
    }

    if(!newMember.name){
        return res.status(400).json({msg: 'include yo name'});
    }

    members.push(newMember);

    res.json(members);
});

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;

                res.json({msg: 'Memeber updated bro', member});
            }
        });
    }else{
        res.status(400).json({message: `No members with id ${req.params.id} found`});
    }
});

//delete joe mama
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if(found){
        res.json({msg: 'member delete', 
        members: members.filter(member => member.id !== parseInt(req.params.id))
        
    });
    }else{
        res.status(400).json({message: `No members with id ${req.params.id} found`});
    }
});

module.exports = router;