const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");

// sub sub route
// GET http://localhost:3000/api/characters/?id=*
router.get("/", async (req, res) => {
  // getting passed value from the url query ?id=*
  // if no valid id was supplied, giving back error.
  let id = Math.abs(parseInt(req.query.id));
  if (isNaN(id) || id === 0) {
    res.status(400).send("You need to provide a valid ID.");
    return;
  }

  try {
    let { data } = await axios.get('https://rickandmortyapi.com/api/character/' + id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send(error?.response?.data?.error)
  }
});

module.exports = router;
