import conectarDB from "../../../lib/dbConnect";
import Trino from "../../../models/Trino";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {id}} = req;

    switch (method) {
        case "PUT":
            try {
                const trino = await Trino.findByIdAndUpdate(
                    id, 
                    req.body,
                    {new: true, runValidators: true}
                );
                return !trino ? res.status(404).json({success: false, error: "Post inexistente."}) :
                    res.json({success: true, data: trino});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        case "DELETE":
            try {
                const trino = await Trino.findByIdAndDelete(id);
                return !trino ? res.status(404).json({success: false, error: "Post inexistente."}) :
                    res.json({success: true, data: trino});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        case "GET":
            try {
                const trino = await Trino.findById(id).lean();
                return !trino ? res.status(404).json({success: false, error: "Post inexistente."}) :
                    res.json({success: true, data: trino});
            } catch (error) {
                return res.status(404).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}