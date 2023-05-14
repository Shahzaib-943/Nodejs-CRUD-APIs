const express = require("express");
const router = express.Router();
const
{
    getProduct , createProduct , 
    updateProduct, deleteProduct
} = require("../controllers/productController");

// Method 1 : We can directly handle the response from the route.

// router.route("/").get((req,res) => {
//     res.send("Hello From get route 8080");
//     // res.json({"message" : "Hello From get route"});
// });

// router.route("/").post((req,res)=>{
//     res.send("POST METHOD");
// });

// router.route("/:id").put((req,res)=>{
//     res.json({"id" : `ID is ${req.params.id}`});
// });

// router.route("/:id").delete((req,res)=>{
//     res.json({"id" : `Id dor deletion is ${req.params.id}`});
// });

// Method 2 : We can redirect the route to the controller.

    //Method 2.1: we can define separate routes

    // router.route("/").get(getProduct);
    // router.route("/").post(createProduct);
    // router.route("/:id").put(updateProduct);
    // router.route("/:id").delete(deleteProduct);

    // Method 2.2 : We can define routes with same url on single line

    router.route("/:id?").get(getProduct);
    router.route("/").post(createProduct);
    // router.route("/:id").put(updateProduct).delete(deleteProduct);
    router.route("/:id").put(updateProduct);
    router.route("/:id").delete(deleteProduct);

module.exports = router;