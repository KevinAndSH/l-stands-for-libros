const { usersModel } = require("../model")

const controller = {
  //* Renderiza el formulario de inicio de sesión
  login: (req, res) => {
    res.status(200).render("users/login")
  },
  

  //* Renderiza el formulario de registro
  register: (req, res) => {
    res.status(200).render("users/register")
  },


  //* Registra un usuario en la base de datos
  save: async (req, res) => {
    try {
      await usersModel.addUser(req.body, req.file?.filename)
      res.status(201).redirect("/")
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },


  //* Proceso de inicio de sesión (luego de pasar por el middleware loginCheck)
  signin: async (req, res) => {
    //* Se inicia sesión
    req.session.user = await usersModel.findUserByEmail(req.body.email)

    //* Redireccionando a la página principal
    console.table(req.body)
    res.status(200).redirect("/");
  },

  //* Para ver el detalle de perfil de usuario
  profile: async (req, res) => {
    let id = parseInt(req.session.user.id)
    

    try {
      let user = await usersModel.getUser(id)
      
      res.status(200).render("users/profile", {user})
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },

  //* Cierre de sesión
  signout: (req, res) => {
    req.session.destroy()
    res.clearCookie("email")
    res.redirect("/users/login")
  },
}


module.exports = controller