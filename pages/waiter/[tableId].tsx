import { useRouter } from 'next/router';
import { FaUtensils } from 'react-icons/fa';
import { HiBan, HiClipboardCheck, HiCurrencyDollar, HiPlus } from 'react-icons/hi';
import { Action, Fab } from 'react-tiny-fab';
import BackButton from '../../components/buttons/BackButton';
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
                <BackButton text="Regresar" pathNameOnBack="/waiter" />
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
                        <HiBan className="text-xl" />
                    </Action>
                </Fab>

                <div className="flex justify-center w-full mt-8">
                    <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
                        <span>Aún no hay ningún platillo</span>
                        <FaUtensils className="text-xl" />
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default TableDetail;
