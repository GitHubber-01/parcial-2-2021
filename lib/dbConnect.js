import mongoose from "mongoose";

const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.URI_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        });
        //console.log("Conectado a la base de datos.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default conectarDB;