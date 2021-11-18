const fs = require("fs")
const path = require("path")
const { productsDB } = require("../data")

const newID = () => {
  let id = 0
  productsDB.forEach(p => p.id > id ? id = p.id : "")
  return id + 1
}

const writeProducts = () => {
  let dbJSON = JSON.stringify(productsDB, null, 4)
  let dbPath = path.resolve(__dirname, "../data/products.json")
  fs.writeFileSync(dbPath, dbJSON)
}

const model = {
  getProduct: function (id) {
    return productsDB.find(item => item.id === id) || null
  },

  addProduct: function (product) {
    product.id = newID()
    productsDB.push(product)

    writeProducts()
  },

  deleteProduct: function (id) {
    productsDB.filter(item => item.id !== id)

    writeProducts()
  },

  editProduct: function (id, product) {
    if (!this.exist(id))
      return console.error("Este producto no existe!!")

    currentItem = this.getProduct(id)
    editedItem = {
      ...currentItem,
      ...product
    }

    this.deleteProduct(id)
    this.addProduct(editedItem)
  }
}

module.exports = model