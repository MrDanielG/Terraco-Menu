import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { getDayNumberDate } from '../../lib/utils';

interface Props {}

const CahsierHome = (props: Props) => {
    const router = useRouter();
    const { locale } = router;

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown"> {getDayNumberDate(locale!)} </h1>

                <h2 className="mt-10 mb-6 text-brown text-lg">Cobros Solicitados</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {/* <PaymentCard /> */}
                </div>
            </div>
        </ProtectedPage>
    );
};

export default CahsierHome;
