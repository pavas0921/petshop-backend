import encuestaMuezza from "../models/encuestaMuezza.js";
import dotenv from "dotenv";
dotenv.config();

// Registrar una encuesta.
export const registerSurvey = async (req, res) => {
  const {
    fullName,
    phone,
    address,
    petsQty,
    diases,
    food,
    nutritionalRequirements,
    vaccination,
  } = req.body;
  try {
    const item = await encuestaMuezza.create({
      fullName,
      phone,
      address,
      petsQty,
      diases,
      food,
      nutritionalRequirements,
      vaccination,
      redeemedDiscount: false
    });
    res.status(+process.env.HTTP_CREATED).json({
      httpStatus: +process.env.HTTP_CREATED,
      content: item,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(process.env.HTTP_OK).json({ error: error });
  }
};
