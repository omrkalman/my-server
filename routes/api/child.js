const express = require("express");
const router = express.Router();

let db = [
  { gender: "m", name: "bob", age: Math.floor(Math.random() * 10) },
  { gender: "m", name: "rob", age: Math.floor(Math.random() * 10) },
  { gender: "f", name: "shula", age: Math.floor(Math.random() * 10) },
  { gender: "f", name: "gili", age: Math.floor(Math.random() * 10) },
  { gender: "m", name: "dani", age: Math.floor(Math.random() * 10) },
];

//sub sub route
// GET http://localhost:3000/api/list/:index
// USING REQ PARAMS
router.get("/:index", (req, res) => {
  try {
    const params = req.params;
    console.log("\tParams:", params);
    const index = parseInt(params.index);

    if (isNaN(index)) {
      //also covers null and undefined
      throw "Please provide an age.";
    } else if (index < 0 || index >= db.length) {
      throw "Please provide a age between 0 and " + (db.length - 1);
    } else {
      res.json(db[index]);
    }
  } catch (error) {
    res.send(error);
  }
});

//sub sub route
// GET http://localhost:3000/api/list/olderthan/:age
// USING REQ PARAMS *AND* REQ QUERY
router.get("/olderthan/:age", (req, res) => {
  try {
    const params = req.params;
    const queries = req.query;

    console.log("\tParams:", params);
    console.log("\tQueries:", queries);

    const age = parseInt(params.age);
    const { gender } = queries;

    if(isNaN(age) && gender != 'm' && gender != 'f') {
      throw "Please provide an age or a gender.";
    } else if (isNaN(age)) {
      //working with gender only
      if (gender != 'm' && gender != 'f') {
        throw "Invalid input";
      } else {
        //valid!!!
        const filtered = db.filter((child) => child.gender == gender);
        res.json(filtered);
      }
    } else if (gender != 'm' && gender != 'f') {  
      //working with age only  
      if (age < 0 || age > 8) {
        throw "Please provide a age between 0 and 8";
      } else {
        //valid!!!
        const filtered = db.filter((child) => child.age > age);
        res.json(filtered);
      }
    } else {
      //working with both age and gender
      if (age < 0 || age > 8) {
        throw "Please provide a age between 0 and 8";
      }
      else if (gender != "f" && gender != "m") {
        throw "Invalid input";
      } else {
        //valid!!!
        const filtered = db.filter((child) => child.age > age && child.gender == gender);
        res.json(filtered);
      }
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
