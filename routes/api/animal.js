const express = require("express");
const router = express.Router();

const animalModel = require("../../model/animal");
const onAnimal = require("../../validation/onAnimal");
const ResponseError = require("../../module/ResponseError");

// const mammal = [
//   { species: "dog", age: "15" },
//   { species: "horse", age: "250" },
//   { species: "dolphin", age: "100" },
// ];
// const fish = [
//   { species: "salmon", age: "60" },
//   { species: "shark", age: "300" },
//   { species: "sardine", age: "1" },
// ];
// const reptile = [
//   { species: "iguana", age: "20" },
//   { species: "crocodile", age: "300" },
//   { species: "turtle", age: "15" },
// ];
// const bird = [
//   { species: "seagull", age: "7" },
//   { species: "crow", age: "4" },
//   { species: "pigeon", age: "1" },
// ];
// user-added animal:
// let unknown = [];
// sub sub route
// GET http://localhost:3000/api/animal/mammal
// router.get("/mammal", (req, res) => {
//   res.json(mammal);
// });
// sub sub route
// GET http://localhost:3000/api/animal/fish
// router.get("/fish", (req, res) => {
//   res.json(fish);
// });
// sub sub route
// GET http://localhost:3000/api/animal/bird
// router.get("/bird", (req, res) => {
//   res.json(bird);
// });
// sub sub route
// GET http://localhost:3000/api/animal/reptile
// router.get("/reptile", (req, res) => {
//   res.json(reptile);
// });

/**
 * sub sub route
 * GET http://localhost:3000/api/animal/?species=*&age=*
 * USING REQ QUERY
 */
router.get("/", async(req, res) => {
  try {
    const queries = req.query;
    console.log("\tQueries:", queries);
    // delete empty queries
    for (let prop in queries) {
      if (!queries[prop]) {
        delete queries[prop];
      }
    }
    console.log("\tNon-empty queries:", queries);
    // if no queries are left, throw an error
    if (Object.values(queries).length == 0) {
      throw new ResponseError("validation", ["Please provide species, age, or name."]);
    }

    // get proper values
    // may throw an error
    const validatedValues = await onAnimal.validateSchema(queries, "find");
    console.log('\tValidated values:', validatedValues);
    
    // check db for these values    
    let dbResponse = await animalModel.findAnimalBy(validatedValues);
    // if dbResponse isn't an array, make it an array with its old self as the first item
    dbResponse = Array.isArray(dbResponse) ? dbResponse : [dbResponse];
    console.log("\tdbResponse", dbResponse);

    if (!dbResponse[0]) {
      throw new ResponseError('db', ["No such animal"]);
    } else {
      res.json(dbResponse);
    }
  } catch (error) {
    console.log(error);
    if (error.details[0] == "No such animal") {
      res.status(404).json(error);
    } else {
      res.status(400).json(error);
    }
  }
});

router.post("/", async(req, res) => {
  try {
    const body = req.body;
    console.log("\tBody:", body);
    // get proper values
    // may throw an error
    const validatedValues = await onAnimal.validateSchema(body, 'add new');
    console.log('\tValidated values:', validatedValues);
    // check db for the name from these values
    const animalData = await animalModel.findAnimalByName(validatedValues.name);
    console.log('\tanimalData (should be null):', animalData);
    
    if (animalData) {
      // if found, throw an error
      throw new ResponseError("db", ["Name already exists."]);
    }
    
    // not found, adding the animal
    animalModel.addNewAnimal(validatedValues);

    res.json({ msg:"Your animal was added" });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
