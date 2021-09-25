import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import BackButton from '../../../../../../../../components/buttons/BackButton';
import Navbar from '../../../../../../../../components/layout/Navbar';
import ProtectedPage from '../../../../../../../../components/ProtectedPage';
import { useGetDailySalesQuery } from '../../../../../../../../graphql/graphql';
import { getCustomDayNumberDate, getMonthName } from '../../../../../../../../lib/utils';

interface Props {}

const DailySales = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { day, month } = router.query;
    const currentDate = new Date();
    const [state, setState] = useState();

    const { data, loading, error } = useGetDailySalesQuery({
        variables: {
            daySalesDay: 26,
            daySalesMonth: 8,
            daySalesYear: currentDate.getFullYear(),
        },
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                                <Collapsible trigger="Table">
                                    <p>
                                        This is the collapsible content. It can be any element or
                                        React component you like.
                                    </p>
                                    <p>
                                        It can even be another Collapsible component. Check out the
                                        next section!
                                    </p>
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default DailySales;
