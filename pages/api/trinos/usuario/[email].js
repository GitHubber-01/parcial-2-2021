import conectarDB from "../../../../lib/dbConnect";
import Trino from "../../../../models/Trino";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {email}} = req;

    switch (method) {
        case "GET":
            try {
                const trinos = await Trino.find({autor: new RegExp(email, "i")}).sort({stamp: "desc"});
                return trinos.length === 0 ? 
                    res.status(400).json({success: false, error: "Este usuario no tiene publicaciones."}) : 
                    res.status(200).json({success: true, trinos});
            } catch (error) {
                console.log(error)
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}