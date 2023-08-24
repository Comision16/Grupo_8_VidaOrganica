const { unlinkSync, existsSync } = require("fs");
const { readJSON } = require("../../data");

module.exports = (req,res) => {
    // Lectura del Json y almacenamiento en la constante
    const products = readJSON('products.json')
   
    //Busqueda del producto a eliminar en funcion de su ID, que coincide con el valor que viene por params (req.params.id)
    const product = products.find((product) => product.id === +req.params.id);
   
    /*Eliminacion del producto del arreglo, y creacion de un nuevo arreglo (productModify).
    con filter hacemos que el arreglo tenga todos los productos excepto el que tiene el id, con esto eliminamos el producto*/
    const productsModify = products.filter(
      (product) => product.id !== +req.params.id
    );
   
    //Eliminacnion de la imagen del producto, en la carpeta de la ruta. Con funcion existsSync verificamos si el archivo existe.
    //Si existe con la funcion unlinkSync eliminamos la imagen
    existsSync(`./public/images/${product.image}`) &&
      unlinkSync(`./public/images/${product.image}`);
    
    // Escritura del arreglo modificado en el archivo products.Json
    writeJSON(productsModify, "products.json");

    return res.redirect("/admin");
  }