let express = require('express');
let mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost/cars',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{ console.log('connection established');})
.catch(()=>{ console.log('connection fail'); });

const carschema = new mongoose.Schema({
    carname:String,
    model:String,
    year:Number,
    brand:String,
},{collection:'cartable'});

//carschema.index({carname:'text'});

let carModel = new mongoose.model('carschema',carschema);

async function saveCar() {
    let carmodel = new carModel({
        carname:'Maruti Breza',
        model:'Breza',
        year:2010,
        brand:'Maruti Suzuki'
    });
    let result = await carmodel.save();    
    console.log(result);
}

//saveCar();

async function getCars(){
    query = 'alt';
    q= new RegExp(query,"i");
    console.log(q);
    // full search text
    //let result = await carModel.find({$text:{$search:$query}},(err,res)=>{
    // Partial search text
    let result = await carModel.find({carname:q},(err,res)=>{
        console.log(err);
        console.log(res);
    });
}

 getCars().catch((err)=>{
    console.log("erro cactched "+err);
});
