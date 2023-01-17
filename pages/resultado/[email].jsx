import { useRouter } from "next/router";
import TablaTrinos from "../../components/TablaTrinos";
import MapItem from "../../components/Mapa";

export default function Resultado({success, error, trinos}) {
    const router = useRouter();


    const containerStyle = {
		position: 'relative',
		width: '1000px',
		height: '450px'
	};

    function getMarkers() {
        var markers = [];
        for (let i = 0; i < trinos.length; i++) {
            if (trinos[i].lat != null && trinos[i].lon != null)
                markers.push({lat: trinos[i].lat, lng: trinos[i].lon});
        }
        return markers;
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div>
                <TablaTrinos
                    success={success}
                    error={error}
                    titulo={"Buscar posts por usuario"}
                    cabecera={`Posts de ${router.query.email}`}
                    trinos={trinos}
                    botones={true}
                    email={router.query.email}
                />
            </div>

            <div className="d-flex justify-content-center">
                <MapItem
                    zoom={11}
                    center={{lat: 36.7213028, lng: -4.4216366}}
                    markers={getMarkers()}
                    containerStyle={containerStyle}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps({params}) {
    try {
        const res = await fetch(`http://localhost:3000/api/trinos/usuario/${params.email}`);
        const {trinos} = await res.json();
        return trinos != null ? {props: {success: true, trinos}} : 
            {props: {success: false, error: "Este usuario no tiene publicaciones hechas."}};
    } catch (error) {
        return {props: {success: false, error}};
    }
}