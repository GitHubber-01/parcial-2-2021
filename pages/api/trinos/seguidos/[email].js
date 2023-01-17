import conectarDB from "../../../../lib/dbConnect";
import Trino from "../../../../models/Trino";
import SigueMe from "../../../../models/SigueMe";

export default async function handler(req, res) {
    await conectarDB();
    const {method, query: {email}} = req;

    switch (method) {
        case "GET":
            try {
                var posts = [];
                var seguidores = await SigueMe.find({seguidor: new RegExp(email, "i")});
                for (var i = 0; i < seguidores.length; i++) {
                    var trinos = await Trino.find({autor: seguidores[i].seguido});
                    for (var j = 0; j < trinos.length; j++) {
                        posts.push(trinos[j]);
                    }
                }

                trinos.sort((a, b) => (a.stamp > b.stamp) ? -1 : 1);
                return posts.length === 0 ? 
                    res.status(400).json({success: false, error: "Ninguno de los seguidores de esta cuenta ha hecho una publicación."}) : 
                    res.status(200).json({success: true, trinos});
            } catch (error) {
                //console.log(error)
                return res.status(400).json({success: false, error});
            }
        default:
            return res.status(500).json({success: false, error: "Error del servidor."})
    }
}