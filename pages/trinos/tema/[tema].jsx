import TablaTrinos from "../../../components/TablaTrinos";
import { useRouter } from "next/router";

export default function seguidos({success, error, trinos}) {
    const router = useRouter();
    return (
        <TablaTrinos
            success={success}
            error={error}
            titulo={"Filtrar posts"}
            cabecera={`Filtro de posts: ${router.query.tema}`}
            trinos={trinos}
        />
    );
}

export async function getServerSideProps({params}) {
    try {
        const res = await fetch(`http://localhost:3000/api/trinos/tema/${params.tema}`);
        const {trinos} = await res.json();
        return trinos != null ? {props: {success: true, trinos}} : 
            {props: {success: false, error: "No existen coincidencias."}};
    } catch (error) {
        return {props: {success: false, error}};
    }
}