import React from 'react';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import StatsCard from '../../components/cards/StatsCard';
import Navbar from '../../components/layout/Navbar';

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
