const getProducts = (req, res) => {
    res.json({
        message: "Lista de productos"
    });
};

module.exports = {
    getProducts
};