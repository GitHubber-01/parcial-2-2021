import {Schema, model, models} from "mongoose";

const trinoSchema = new Schema({
	autor: {
		type: String,
		required: [true, "Por favor, ingrese el autor."]
	},
    post: {
        type: String,
        required: [true, "Por favor, ingrese un texto."],
        maxLength: [250, "El tamaño del post debe ser menor o igual a 250 caracteres."]
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    stamp: {
        type: Date,
        default: Date.now()
    },
    reposts: {
        type: Number,
        default: 0
    }
}, {collection: "Trinos"});

export default models.Trino || model("Trino", trinoSchema);