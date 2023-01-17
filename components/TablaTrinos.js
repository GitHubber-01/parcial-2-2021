import Head from "next/head";

const TablaTrinos = ({success, error, titulo, cabecera, trinos, botones = false, email = null}) => {

    if (!success) {
        return (
            <div className="container text-center my-5">
                <h1>{error}</h1>
            </div>
        );
    } else {
        
        const darRT = async(e, _id) => {
            e.preventDefault();
            const datos = await fetch(`http://localhost:3000/api/trinos/${_id}`).then(res => res.json());
            const {data} = datos;

            await fetch(`http://localhost:3000/api/trinos/${_id}`, {
                body: JSON.stringify({
                    ...data,
                    reposts: data.reposts + 1
                }),
                headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
            });

            await fetch("http://localhost:3000/api/trinos", {
                body: JSON.stringify({
                    autor: email,
                    post: "RT: " + data.post,
                    reposts: 0
                }),
                headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
            });
            document.location.reload();
        }
        
        return (
            <div>
                <Head>
                    <title>{titulo}</title>
                </Head>
                <h1 className="text-center">{cabecera}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>AUTOR</th>
                            <th>POST</th>
                            <th>LATITUD</th>
                            <th>LONGITUD</th>
                            <th>STAMP</th>
                            <th>REPOSTS</th>
                            {botones ? <th>RT</th> : ""}
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        trinos.map(({_id, autor, post, lat, lon, stamp, reposts}) => (
                            <tr key={_id}>
                                <td>{_id}</td>
                                <td>{autor}</td>
                                <td>{post}</td>
                                <td>{lat == null ? "Sin datos" : lat}</td>
                                <td>{lon == null ? "Sin datos" : lon}</td>
                                <td>{stamp}</td>
                                <td>{reposts}</td>
                                {botones ? 
                                    <td>
                                        
                                        <button 
                                            className="btn btn-primary"
                                            onClick={(e) => darRT(e, _id)}
                                        >Retuitear</button>
                                    </td> : ""
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TablaTrinos;