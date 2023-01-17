import conectarDB from "../../../lib/dbConnect";
import SigueMe from "../../../models/SigueMe";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {email}} = req;

    switch (method) {
        case "GET":
            try {
                const seguidores = await SigueMe.find({seguido: new RegExp(email, "i")});
                return !seguidores ? 
                    res.status(400).json({success: false, error: "Este usuario no tiene seguidores."}) : 
                    res.status(200).json({success: true, seguidores});
            } catch (error) {
                console.log("ERROR")
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}