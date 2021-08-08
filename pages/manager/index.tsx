import React from 'react';
import ParentCard from '../../components/card/ParentCard';
import Navbar from '../../components/Navbar';
import StatsCard from '../../components/StatsCard';

interface Props {}

const index = (props: Props) => {
    return (
        <div className="bg-gray-200 p-8 h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Estadísticas</h1>

            <h2 className="mt-10 mb-6 text-brown text-lg">Platillo del Mes:</h2>
            <ParentCard />

            <h2 className="mt-10 mb-6 text-brown text-lg">Ventas Mensuales</h2>
            <StatsCard />
        </div>
    );
};

export default index;
