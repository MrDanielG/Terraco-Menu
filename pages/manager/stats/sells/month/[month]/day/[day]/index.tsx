import { useRouter } from 'next/router';
import React from 'react';
import Collapsible from 'react-collapsible';
import BackButton from '../../../../../../../../components/buttons/BackButton';
import Navbar from '../../../../../../../../components/layout/Navbar';
import ProtectedPage from '../../../../../../../../components/ProtectedPage';
import { useGetDailySalesQuery } from '../../../../../../../../graphql/graphql';
import {
    getCustomDayNumberDate,
    getMonthName,
    getTime,
    intlFormat,
} from '../../../../../../../../lib/utils';

interface Props {}

const DailySales = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { day, month } = router.query;
    const currentDate = new Date();

    const { data, loading, error } = useGetDailySalesQuery({
        variables: {
            daySalesDay: Number(day) + 1,
            daySalesMonth: Number(month),
            daySalesYear: currentDate.getFullYear(),
        },
    });
    console.log(data);
    console.log(day, month);

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">
                    {getCustomDayNumberDate(
                        locale!,
                        currentDate.getFullYear(),
                        Number(month) - 1,
                        Number(day) + 1
                    )}{' '}
                    de {getMonthName(currentDate.getFullYear(), Number(month) - 1)}
                </h1>

                <br />
                <BackButton
                    text="Regresar"
                    pathNameOnBack={`/manager/stats/sells/month/${Number(month)}`}
                />

                <div className="flex flex-col mt-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                {data?.daySales.map((daySale, i) => (
                                    <Collapsible trigger={daySale.tableName} key={i}>
                                        {daySale.sales?.map((sale) => (
                                            <div
                                                key={sale.timestamp}
                                                className="flex justify-between"
                                            >
                                                <p> {getTime(sale.timestamp, 'en-US')} </p>
                                                <p className="font-semibold">
                                                    {intlFormat(sale.total, locale!)}
                                                </p>
                                            </div>
                                        ))}
                                        <hr className="my-2" />
                                        <div className="flex justify-between font-semibold">
                                            <p>Total:</p>
                                            <p> {intlFormat(daySale.totalSum, locale!)}</p>
                                        </div>
                                    </Collapsible>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default DailySales;
