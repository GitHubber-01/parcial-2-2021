import TablaTrinos from '../../components/TablaTrinos';
import conectarDB from '../../lib/dbConnect';
import Trino from '../../models/Trino';

export default function Home({trinos}) {
    return (
        <TablaTrinos
            success={true}
            error={null}
            titulo={"Posts"}
            cabecera={"EstoyQueTrino"}
            trinos={trinos}
        />
    )
}

export async function getServerSideProps() {
    try {
        await conectarDB();
        const res = await Trino.find();
        const trinos = res.map(doc => {
            const trino = doc.toObject();
            trino._id = `${trino._id}`;
            trino.stamp = trino.stamp.toISOString();
            return trino;
        });
        return {props: {trinos}};
    } catch (error) {
        console.log(error);
    }
} 

