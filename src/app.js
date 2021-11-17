const express = require("express")
const app = express()
const path = require("path")

//* Declarar el puerto para uso con Heroku
let port = process.env.PORT || 3000

//* Definir el motor de templates y la carpeta views
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//* Definir la carpeta pública
app.use(express.static(path.join(__dirname, "..", "public")))

//* Configurar el entorno para que éste pueda recibir datos por POST
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//* Configurar la librería requerida para usar los métodos PUT y DELETE
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

//* Definiendo texto para identificar nuestro sitio web
const session = require("express-session")
app.use(session({secret: "Bienvenidos a nuestra libreria de libros ;)"}))

//* Requerir y definir las rutas
const { homeRoutes, productsRoutes } = require("./routes")
app.use("/", homeRoutes)
app.use("/products", productsRoutes)

//* Renderizar la vista correspondiente al Error 404
app.use((req, res, next) => {
  res.status(404).render("not-found")
})


//! FAVOR NO AGREGAR CÓDIGO DEBAJO DE ESTA LINEA
app.listen(port, () => console.log("Servidor corriendo en el puerto", port))