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
    const newDay = Number(day) + 1;
    const { data } = useGetDailySalesQuery({
        variables: {
            daySalesDay: newDay,
            daySalesMonth: Number(month),
            daySalesYear: currentDate.getFullYear(),
            daySalesTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
    });

    console.log(newDay, month, Intl.DateTimeFormat().resolvedOptions().timeZone);

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
                            {data?.daySales.map((daySale, i) => (
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
