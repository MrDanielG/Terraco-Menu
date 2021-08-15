import Navbar from '../../../components/layout/Navbar';
interface Props {}

const months = [
    {
        name: 'Enero',
        income: '$20,000',
    },
    {
        name: 'Febrero',
        income: '$20,000',
    },
    {
        name: 'Marzo',
        income: '$20,000',
    },
    {
        name: 'Abril',
        income: '$20,000',
    },
    {
        name: 'Mayo',
        income: '$20,000',
    },
];

const SellsStats = (props: Props) => {
    return (
        <div className="bg-gray-200 p-8 min-h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Ventas Mensuales</h1>

            <div className="flex flex-col mt-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Mes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Ingreso
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {months.map((month, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-800">
                                                        {month.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500">
                                                    {month.income}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellsStats;
