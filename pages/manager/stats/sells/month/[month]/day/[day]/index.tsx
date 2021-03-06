import { useRouter } from 'next/router';
import React from 'react';
import Collapsible from 'react-collapsible';
import { AiFillCaretDown } from 'react-icons/ai';
import BackButton from '../../../../../../../../components/buttons/BackButton';
import Navbar from '../../../../../../../../components/layout/Navbar';
import ProtectedPage from '../../../../../../../../components/ProtectedPage';
import { GetDailySalesQuery, useGetDailySalesQuery } from '../../../../../../../../graphql/graphql';
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
    const newDay = Number(day);
    const { data } = useGetDailySalesQuery({
        variables: {
            daySalesDay: newDay,
            daySalesMonth: Number(month),
            daySalesYear: currentDate.getFullYear(),
            daySalesTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
    });

    let dataClone: GetDailySalesQuery | undefined;

    if (data) {
        dataClone = JSON.parse(JSON.stringify(data)) as GetDailySalesQuery;
        dataClone.daySales.map((sale) =>
            sale.sales?.sort((x, y) => {
                const dateX = new Date(x.timestamp);
                const dateY = new Date(y.timestamp);
                return dateX.getTime() < dateY.getTime() ? 1 : -1;
            })
        );
    }

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <h1 className="text-3xl font-semibold text-brown">
                    {getCustomDayNumberDate(
                        locale!,
                        currentDate.getFullYear(),
                        Number(month) - 1,
                        Number(day)
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
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {data?.daySales.map((daySale, i) => (
                                <Collapsible
                                    trigger={
                                        <div className="flex items-center justify-between p-4">
                                            <span>{daySale.tableName}</span>
                                            <AiFillCaretDown />
                                        </div>
                                    }
                                    key={i}
                                >
                                    {daySale.sales?.map((sale) => (
                                        <div
                                            key={sale.timestamp}
                                            className="flex justify-between p-4"
                                        >
                                            <p> {getTime(sale.timestamp, 'en-US')} </p>
                                            <p className="font-semibold">
                                                {intlFormat(sale.total, locale!)}
                                            </p>
                                        </div>
                                    ))}

                                    <hr className="my-2" />
                                    <div className="flex justify-between p-4 font-semibold">
                                        <p>Total:</p>
                                        <p> {intlFormat(daySale.totalSum, locale!)}</p>
                                    </div>
                                </Collapsible>
                            ))}
                            {/* {dataClone?.daySales.map((daySale, i) => (
                                <Collapsible
                                    trigger={
                                        <div className="flex items-center justify-between">
                                            <span>{daySale.tableName}</span>
                                            <AiFillCaretDown />
                                        </div>
                                    }
                                    key={i}
                                >
                                    {daySale.sales?.map((sale) => (
                                        <div key={sale.timestamp} className="flex justify-between">
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
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default DailySales;
