const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    species:    {type:String, required:true},
    age:        {type:Number, required:true},
    name:       {type:String, required:true, unique:true}
});

const Animal = mongoose.model("animal", animalSchema);

const addNewAnimal = (animalData) => {
    const newAnimal = new Animal(animalData);
    return newAnimal.save();
}

const findAnimalByName = (name) => {
    return Animal.findOne({ name }); // same as { "name": name }
}

/**
 * If props has name (meaning name is part of the query),
 * the search will stop after finding 1 match.
 * @param {Object} prop Object containing the property(s) and values to look for
 * @returns JSON
 */
const findAnimalBy = (props) => {
    return props.name ? Animal.findOne(props) : Animal.find(props);
}

module.exports = {
    addNewAnimal,
    findAnimalByName,
    findAnimalBy
};