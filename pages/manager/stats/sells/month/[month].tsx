import Head from 'next/head';
import { useRouter } from 'next/router';
import BackButton from '../../../../../components/buttons/BackButton';
import Navbar from '../../../../../components/layout/Navbar';
import ProtectedPage from '../../../../../components/ProtectedPage';
import { useGetMonthSalesQuery } from '../../../../../graphql/graphql';
import { getCustomDayNumberDate, getMonthName, intlFormat } from '../../../../../lib/utils';

interface Props {}

const MonthlySales = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { month } = router.query;
    const currentDate = new Date();
    const { data, loading, error } = useGetMonthSalesQuery({
        variables: {
            monthSalesMonth: Number(month),
            monthSalesYear: currentDate.getFullYear(),
        },
    });

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <Head>
                <title>Estadísticas {getMonthName(currentDate.getFullYear(), Number(month))}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">
                    Ventas {getMonthName(currentDate.getFullYear(), Number(month))}
                </h1>

                <br />
                <BackButton text="Regresar" pathNameOnBack="/manager/stats/sells/" />

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
                                                Día
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
                                        {data?.monthSales.map((monthSale, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-800">
                                                            {getCustomDayNumberDate(
                                                                locale!,
                                                                monthSale.year,
                                                                monthSale.month - 1,
                                                                monthSale.dayOfMonth
                                                            ).toUpperCase()}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">
                                                        {intlFormat(monthSale.total, locale!)}
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

export default MonthlySales;
