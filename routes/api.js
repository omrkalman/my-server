const express = require("express");
const router = express.Router();
const listRouter = require("./api/child");
const animalRouter = require("./api/animal");
const characterRouter = require("./api/characters");
const userRouter = require("./api/user");
const productRouter = require("./api/product");

//sub route
// GET http://localhost:3000/api/
router.get("/", (req, res) => {
  res.json({ msg: "msg from api router" });
});

// sub router
// GET http://localhost:3000/api/child
router.use("/child", listRouter);

// sub router
// GET http://localhost:3000/api/animal
router.use("/animal", animalRouter);

// sub router
// GET http://localhost:3000/api/characters
router.use("/characters", characterRouter);

router.use("/user", userRouter);

router.use("/product", productRouter);

module.exports = router; //exports only router without need of object
