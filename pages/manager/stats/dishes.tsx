import Navbar from '../../../components/layout/Navbar';
import ProtectedPage from '../../../components/ProtectedPage';
import { useGetDishSalesQuery } from '../../../graphql/graphql';
import { getMonthName, topDishSells } from '../../../lib/utils';
interface Props {}

const SellsStats = (props: Props) => {
    const currentDate = new Date();
    const { data } = useGetDishSalesQuery({
        variables: {
            dishSalesYear: currentDate.getFullYear(),
            dishSalesTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
    });

    const dishSales = data?.dishSales || [];
    const topDishes = topDishSells(dishSales);

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Platillos del Mes</h1>

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
                                                Platillo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {topDishes
                                            .sort((a, b) => a.month - b.month)
                                            .map((dishSale, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-800">
                                                                {getMonthName(
                                                                    dishSale.year,
                                                                    dishSale.month - 1
                                                                ).toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">
                                                            {dishSale.dishName}
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
        </ProtectedPage>
    );
};

export default SellsStats;
