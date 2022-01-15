import { useRouter } from 'next/router';
import { FaUtensils } from 'react-icons/fa';
import { HiBan, HiClipboardCheck, HiCurrencyDollar, HiPlus } from 'react-icons/hi';
import { Action, Fab } from 'react-tiny-fab';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetTableByIdQuery } from '../../graphql/graphql';

const TableDetail = () => {
    const router = useRouter();
    const { tableId } = router.query;
    const { data } = useGetTableByIdQuery({
        variables: {
            tableByIdId: String(tableId),
        },
    });

    return (
        <ProtectedPage username="Mesero" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <h1 className="text-3xl font-semibold text-brown">{data?.tableById?.name}</h1>
                <Fab
                    icon={<HiPlus className="text-3xl" />}
                    alwaysShowTitle={true}
                    mainButtonStyles={{ background: '#3ABB2E' }}
                >
                    <Action text="Menu" style={{ background: '#3ABB2E' }}>
                        <FaUtensils />
                    </Action>

                    <Action text="Mandar a Cocina" style={{ background: '#3ABB2E' }}>
                        <HiClipboardCheck className="text-xl" />
                    </Action>

                    <Action text="Cobrar" style={{ background: '#3ABB2E' }}>
                        <HiCurrencyDollar className="text-xl" />
                    </Action>

                    <Action text="Cancelar Orden" style={{ background: '#b91c1c' }}>
                        <HiBan className="text-xl bg-red" />
                    </Action>
                </Fab>
            </div>
        </ProtectedPage>
    );
};

export default TableDetail;
