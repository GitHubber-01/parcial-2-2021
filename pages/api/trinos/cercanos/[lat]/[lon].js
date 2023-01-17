import conectarDB from "../../../../../lib/dbConnect";
import Trino from "../../../../../models/Trino";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {lat, lon}} = req;

    switch (method) {
        case "GET":
            try {
                const trinos = await Trino.find();
                var t = [];
                for (let i = 0; i < trinos.length; i++) {
                    if (Math.abs(lat - trinos[i].lat) <= 0.1 && Math.abs(lon - trinos[i].lon) <= 0.1)
                        t.push(trinos[i])
                }
                return t.length === 0 ? 
                    res.status(400).json({success: false, error: "No hay publicaciones cercanas a esta posición."}) : 
                    res.status(200).json({success: true, t});
            } catch (error) {
                console.log(error)
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}