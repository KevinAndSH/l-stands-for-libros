const { productsDB } = require("../data");
const { productsModel } = require("../model")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  detail: (req, res) => {
    let id = parseInt(req.params.id)
    let libro = productsModel.getProduct(id)

    res.render("product-detail", {libro, toThousand})
  },

  list: (req, res) => {
    res.render("product-list", {libros: productsDB, toThousand})
  },

  create: (req, res) => {
    res.render("product-create", {libros: productsDB, toThousand})
  },

  store: (req, res) => {
    //res.send(req.body)
    productsModel.addProduct(req.body)
    
    res.redirect("/products")

  },
  
  edit: (req, res) => {
    let id = parseInt(req.params.id)
    let libro = productsModel.getProduct(id)

    res.render("product-edit", {libro, toThousand}) 
  },
  
  update: (req, res) => {
    let id = req.params.id
    let product = req.body
    
    productsModel.editProduct(id, product)
  },
  
  delete: (req, res) => {
    let id = req.params.id

    productsModel.deleteProduct(id)
  },
}


module.exports = controller