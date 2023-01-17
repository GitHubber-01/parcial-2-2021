import conectarDB from "../../../lib/dbConnect";
import SigueMe from "../../../models/SigueMe";

export default async function handler(req, res) {
    await conectarDB();
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                return res.status(200).json(await SigueMe.find());
            } catch (error) {
                console.log(error);
                return res.status(400).json({success: false, error});
            }
        case "POST":
            try {
                var s = new SigueMe(req.body);
                await s.save();
                return res.status(200).json({success: true, s});
            } catch (error) {
                console.log(error);
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}