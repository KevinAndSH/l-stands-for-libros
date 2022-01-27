const bcrypt = require('bcryptjs');
const { usersModel } = require("../model")

const controller = {
  //* Renderiza el formulario de inicio de sesión
  login: function(req, res) {
    res.status(200).render("users/login")
  },


  //* Renderiza el formulario de registro
  register: function(req, res) {
    res.status(200).render("users/register")
  },


  //* Registra un usuario en la base de datos
  save: async function(req, res) {
    try {
      await usersModel.addUser(req.body, req.file?.filename)
      res.status(201).redirect("/")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  //* Proceso de inicio de sesión (luego de pasar por el middleware loginCheck)
  signin: async function(req, res) {
    try {
      req.session.user = await usersModel.findUserByEmail(req.body.email)
      res.status(200).redirect("/users/profile")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  //* Perfil de usuario
  profile: function(req, res) {
    res.status(200).render("users/profile")
  },

  //* Actualiza la foto del usuario
  updatePic: async (req, res) => {
    let id = parseInt(req.params.id)
    let img_path = req.file?.filename

    try {
      let product = await productsModel.getProduct(id)
      let fullPath = path.resolve(__dirname, "../public/img/products", product.img_path)
      if (product.img_path && product.img_path !== "default.png" && fs.existsSync(fullPath))
        fs.rmSync(fullPath)
      
      await productsModel.editProduct(id, { img_path })
      res.status(201).redirect("/products/" + req.params.id)
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  //* Renderizar formulario de edición de perfil de usuario
  edit: function(req, res) {
    res.status(200).render("users/profile-edit")
  },


  changePass: function(req, res) {
    res.status(200).render("users/password-edit")
  },


  update: async function(req, res) {
    let id = req.session.user.id
    let user = req.body;
    try {
      await usersModel.editUser(id, user)
      res.status(200).redirect("/users/profile")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  //* Actualiza la foto de perfil
  updatePic: async (req, res) => {
    let id = parseInt(req.session.user.id)
    let img_path = req.file?.filename

    try {
      let user = await userModel.getUser(id)
      let fullPath = path.resolve(__dirname, "../public/img/users", user.img_path)
      if (user.img_path && user.img_path !== "default.png" && fs.existsSync(fullPath))
        fs.rmSync(fullPath)
      
      await userModel.editUser(id, { img_path })
      res.status(201).redirect("/users/profile")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  updatePass: async function(req, res) {
    let id = req.session.user.id
    let password = bcrypt.hashSync(req.body.new_password, 10)
    try {
      await usersModel.editUser(id, { password })
      res.status(200).redirect("/users/profile")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },

  
  //* Cierre de sesión
  signout: function(req, res) {
    req.session.destroy()
    res.clearCookie("email")
    // return res.json(req.session)
    res.redirect("/users/login")
  },
}


module.exports = controller