import Head from 'next/head'
import conectarDB from '../../lib/dbConnect';
import SigueMe from '../../models/SigueMe';

export default function Home({siguemes}) {
    return (
        <div>
            <Head>
                <title>SigueMes de EstoyQueTrino</title>
            </Head>
            
            <main>
                <h1>EstoyQueTrino</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SEGUIDOR</th>
                            <th>SEGUIDO</th>
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        siguemes.map(({_id, seguidor, seguido}) => (
                            <tr key={_id}>
                                <td>{_id}</td>
                                <td>{seguidor}</td>
                                <td>{seguido}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    try {
        await conectarDB();
        const res = await SigueMe.find();
        const siguemes = res.map(doc => {
            const sMe = doc.toObject();
            sMe._id = `${sMe._id}`;
            return sMe;
        });
        return {props: {siguemes}};
    } catch (error) {
        console.log(error);
    }
} 
