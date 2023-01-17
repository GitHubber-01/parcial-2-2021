import {Schema, model, models} from "mongoose";

const sigueMeSchema = new Schema({
	seguidor: {
        type: String,
        required: [true, "Por favor, ingrese el correo del seguidor."]
    },
    seguido: {
        type: String,
        required: [true, "Por favor, ingrese el correo del seguido."]
    }
}, {collection: "SigueMes"});

export default models.SigueMe || model("SigueMe", sigueMeSchema);