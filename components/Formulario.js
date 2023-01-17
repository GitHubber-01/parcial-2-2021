import { useState } from "react";
import { useRouter } from "next/router";

const Formulario = ({cabecera}) => {
    const router = useRouter();

    const [form, setForm] = useState({
        autor: ""
    });

    const [message, setMensaje] = useState([]);
    
    const handleChange = e => {
        const {value, name} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        getData(form);
    }

    const getData = async(form) => {
        try {
            const res = await fetch(`http://localhost:3000/api/trinos/usuario/${form.autor}`);
            const data = await res.json();

            
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    console.log(error)
                    setMensaje(mensajeOld => [
                        ...mensajeOld,
                        {message: error.message}
                    ]);
                }
            } else {
                router.push(`http://localhost:3000/resultado/${form.autor}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1 className="my-3">{cabecera}</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="form control w-100 my-1"
                    placeholder="Correo del usuario"
                    autoComplete="off"
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                />
                <button className="btn btn-primary w-100 my-1" type="submit">Buscar</button>
                {
                    message.map(({message}) => (
                        <p key={message}>{message}</p>
                    ))
                }
            </form>
        </div>
    );
}

export default Formulario;