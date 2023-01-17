import conectarDB from "../../../lib/dbConnect";
import Trino from "../../../models/Trino";

export default async function handler(req, res) {
    await conectarDB();
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                return res.status(200).json(await Trino.find());
            } catch (error) {
                console.log(error);
                return res.status(400).json({success: false, error});
            }
        case "POST":
            try {
                var datos = req.body, t = new Trino();
                t.autor = datos.autor;
                t.post = datos.post;
                if (datos.lat != null && datos.lon != null) {
                    t.lat = datos.lat;
                    t.lon = datos.lon;
                }
                await t.save();
                return res.status(200).json({success: true, t});
            } catch (error) {
                console.log(error);
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}