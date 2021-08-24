import { Switch } from '@headlessui/react';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';
import { useGetTableByIdQuery, useUpdateTableMutation } from '../graphql/graphql';

interface Props {
    tableId: string;
}

const InfoTable = ({ tableId }: Props) => {
    const { data } = useGetTableByIdQuery({
        variables: {
            tableByIdId: tableId,
        },
    });
    const [updateTableMutation] = useUpdateTableMutation();
    const currentUrl = process.env.NEXT_PUBLIC_LOCAL_URI || 'http://localhost:3000';
    const qrValue = `${currentUrl}?tableId=${data?.tableById?._id}`;

    const handleChange = async () => {
        try {
            await updateTableMutation({
                variables: {
                    updateTableData: { enabled: !data?.tableById?.enabled },
                    updateTableId: tableId,
                },
            });
            toast.success('Mesa Actualizada');
        } catch (error) {
            console.error(error);
            toast.error('Error al Actualizar Mesa');
        }
    };

    return (
        <div className="mt-2">
            <div className="flex items-center justify-center">
                <QRCode value={qrValue} className="my-3" size={200} />
            </div>
            <h1 className="text-center my-2 text-brown font-semibold">{data?.tableById?.name}</h1>

            <div className="flex justify-around my-4">
                <p className="text-gray-500">Activada:</p>
                <Switch
                    checked={data?.tableById?.enabled!}
                    onChange={handleChange}
                    className={`${
                        data?.tableById?.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            data?.tableById?.enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default InfoTable;
