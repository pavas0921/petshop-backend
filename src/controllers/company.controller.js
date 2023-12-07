import Company from "../models/company.js";

// Crear una compañia
export const createCompany = async (req, res) => {
  const { company, categoryId, address, city, responsibleName, responsibleId, responsibleEmail, responsiblePhone, nit, logo } = req.body;
  try {
    const newCompany = await Company.create({ company, categoryId, address, city, responsibleName, responsibleId, responsibleEmail, responsiblePhone, nit, logo });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companyItem = await Company.find().exec();
    if (companyItem.length) return res.json({ status: 201, categoriaItem });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
