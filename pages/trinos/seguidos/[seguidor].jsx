import TablaTrinos from "../../../components/TablaTrinos";
import { useRouter } from "next/router";

export default function seguidos({success, error, trinos}) {
    const router = useRouter();
    return (
        <TablaTrinos
            success={success}
            error={error}
            titulo={"Seguidos"}
            cabecera={`Filtro de posts: ${router.query.seguidor}`}
            trinos={trinos}
        />
    );
}

export async function getServerSideProps({params}) {
    try {
        const res = await fetch(`http://localhost:3000/api/trinos/seguidos/${params.seguidor}`);
        const {trinos} = await res.json();
        return trinos != null ? {props: {success: true, trinos}} : 
            {props: {success: false, error: "Este usuario no tiene seguidores que " + 
                "hayan hecho al menos una publicación."}};
    } catch (error) {
        return {props: {success: false, error}};
    }
}