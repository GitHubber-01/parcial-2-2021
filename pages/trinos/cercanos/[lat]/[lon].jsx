import TablaTrinos from "../../../../components/TablaTrinos";
import { useRouter } from "next/router";

export default function seguidos({success, error, t}) {
    const router = useRouter();
    return (
        <TablaTrinos
            success={success}
            error={error}
            titulo={"Publicaciones cercanas"}
            cabecera={`Publicaciones cercanas de (${router.query.lat}, ${router.query.lon})`}
            trinos={t}
        />
    );
}

export async function getServerSideProps({params}) {
    try {
        const res = await fetch(`http://localhost:3000/api/trinos/cercanos/${params.lat}/${params.lon}`);
        const {t} = await res.json();
        return t != null ? {props: {success: true, t}} : 
            {props: {success: false, error: "No existen trinos cercanos a esta posición."}};
    } catch (error) {
        return {props: {success: false, error}};
    }
}