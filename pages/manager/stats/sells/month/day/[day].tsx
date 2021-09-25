import { useRouter } from 'next/router';
import React from 'react';
import Collapsible from 'react-collapsible';
import Navbar from '../../../../../../components/layout/Navbar';
import ProtectedPage from '../../../../../../components/ProtectedPage';

interface Props {}

const DailySales = (props: Props) => {
    const router = useRouter();
    const { day } = router.query;

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Ventas {day}</h1>

                <div className="flex flex-col mt-6">
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
