import Rol from "../models/rol.js";
// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo Categoria
export const createRol = async (req, res) => {
  const { name } = req.body;
  try {
    const newRol = await Rol.create({ name });
    res.status(HTTP_CREATED).json({ status: HTTP_CREATED, rol: newRol });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getCategoria = async (req, res) => {
  console.log("hola");
  try {
    const categoriaItem = await Categoria.find().exec();
    if (categoriaItem.length) return res.json({ status: 201, categoriaItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
