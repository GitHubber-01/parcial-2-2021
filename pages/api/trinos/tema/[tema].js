import conectarDB from "../../../../lib/dbConnect";
import Trino from "../../../../models/Trino";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {tema}} = req;

    switch (method) {
        case "GET":
            try {
                const trinos = await Trino.find({post: new RegExp(tema, "i")});
                return trinos.length === 0 ? 
                    res.status(400).json({success: false, error: "No hay publicaciones con esta cadena de caracteres."}) : 
                    res.status(200).json({success: true, trinos});
            } catch (error) {
                console.log(error)
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}