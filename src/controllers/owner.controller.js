import Owner from "../models/owner.js";
import dotenv from "dotenv";
dotenv.config();

export const createOwner = async (req, res) => {
    const {
        numeroDocumento,
        firstName,
        lastName,
        phone,
        address,
        idCompany
    } = req.body;

    try{
        const newOwner = await Owner.create({
            numeroDocumento,
            firstName,
            lastName,
            phone,
            address,
            idCompany
        })

        if(newOwner){
            return res.status(+process.env.HTTP_CREATED).json({
                message: "Propietario registrado con éxito.",
                httpStatus: +process.env.HTTP_CREATED,
                status: "success",
                content: newOwner
            })
        }else{
            return res.status(+process.env.BAD_REQUEST).json({
                message: "Hubo un problema al registrar el propietario.",
                httpStatus: +process.env.BAD_REQUEST,
                status: "error",
              });
        }
    }catch (error){
        res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({
            error: error,
            httpStatus: +process.env.HTTP_INTERNAL_SERVER_ERROR,
          });
    }
}

export const getAllOwner = async (req, res) =>{
    const {idCompany} = req.body
    const owners = await Owner.find({idCompany: idCompany})
    .exec();

    if(owners.length > 0){
        return res.status(+process.env.HTTP_OK).json({
            httpStatus: +process.env.HTTP_OK,
            content: owners,
            status: "success",
          });
    }else{
        return res.status(+process.env.HTTP_NO_CONTENT).json({
            httpStatus: +process.env.HTTP_NO_CONTENT,
            content: [],
            status: "success",
          });
    }

}