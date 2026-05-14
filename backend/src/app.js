const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.use("/products", productRoutes);

module.exports = app;