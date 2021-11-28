const express = require("express");

const app = express();
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/connectDB");
//Create and Save a Record of a Model
const Person=require("./model/Person");
 const newPerson=new Person({name:"farid",age:52,favoriteFoods: ["mloukheya","chikken"]});
  newPerson
     .save()
     .then((Person)=>console.log(Person))
    .catch((err)=>console.log(err));
const newPerson=new Person({name:"aymen",age:17,favoriteFoods: ["kosksi","soupe","burritos"]});
  newPerson
     .save()
     .then((Person)=>console.log(Person))
    .catch((err)=>console.log(err));
//Create Many Records with model.create()
const newP=new Person();
  newP.insertMany([{name:"ronaldo",age:34,favoriteFoods: ["mloukheya","chikken"]},
         {name:"moez",age:4,favoriteFoods: ["mloukheya","chikken","burritos"]}])
     .then((newP)=>console.log(newP))
         .catch((err)=>console.log(err));
//Use model.find() to Search Your Database
Person.find().then((Person)=>console.log(Person)).catch((err)=>console.log(err));
// Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({name:"farid"}).then((Person)=>console.log(Person)).catch((err)=>console.log(err));
//Use model.findById() to Search Your Database By _id
Person.findById({_id:"5ff070520635840cf47a455e"}).then((Person)=>console.log(Person)).catch((err)=>console.log(err));
//Perform Classic Updates by Running Find, Edit, then Save
Person.findById({_id:"61a20d99e6335a0101c9efc8"},function (err,Person){
         Person.favoriteFoods=Array.push("hamburger")
           Person.save(function (err,Person) {
               if(err){
                   console.log(err)
               }
               console.log(Person)
       })
   });
//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({id:"61a20d99e6335a0101c9efc8"},{$set:{age:20}},{new:true, useFindAndModify: false}).then(Person=>console.log(Person)).catch(err=>console.log(err));
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove({_id:"61a20d99e6335a0101c9efc8"}).then(Person=>console.log(Person)).catch(err=>console.log(err));
//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.deleteMany({ name:"Mary" }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
//Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods:"burritos" })
.sort({name: 1})
.limit(2)
.select("-age")
.exec()                   // execute the query
.then(docs => {
   console.log(docs)
 })
.catch(err => {
   console.error(err)
 })
