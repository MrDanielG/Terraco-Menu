import React from 'react';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import StatsCard from '../../components/cards/StatsCard';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetDishSalesQuery, useGetYearSalesQuery } from '../../graphql/graphql';
import { getMonthName, topDishSells } from '../../lib/utils';
//import { dinero, subtract, toUnit } from 'dinero.js';

interface Props {}

const Index = (props: Props) => {
    const currentDate = new Date();
    const { data: salesData } = useGetYearSalesQuery({
        variables: { yearSalesYear: currentDate.getFullYear() },
    });
    const { data: dishData } = useGetDishSalesQuery({
        variables: { dishSalesYear: currentDate.getFullYear() },
    });

    const dishSales = dishData?.dishSales || [];
    const monthSales = salesData?.yearSales || [];
    const topDishes = topDishSells(dishSales).sort((a, b) => b.month - a.month);
    const sortedSales = monthSales.slice().sort((a, b) => b.month - a.month);
    let profit = 0;
    if (sortedSales.length > 1) {
        const currentMontSales = sortedSales[0].total.amount;
        const prevMonthSales = sortedSales[1].total.amount;
        profit = (1 - prevMonthSales / currentMontSales) * 100;
    }

    return (
        <ProtectedPage username="Manager" redirectTo="/">
            <div className="bg-gray-200 p-8 h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Estadísticas</h1>

                <h2 className="mt-10 mb-6 text-brown text-lg">Platillo del Mes:</h2>
                <h2 className="mt-10 mb-6 text-grey text-sm">
                    {getMonthName(currentDate.getFullYear(), currentDate.getMonth()).toUpperCase()}
                </h2>
                {topDishes.length > 0 && (
                    <ParentCard>
                        <CardInfo>
                            <CardInfo.Title>
                                <span>{topDishes[0].dishName}</span>
                            </CardInfo.Title>
                        </CardInfo>
                    </ParentCard>
                )}

                <h2 className="mt-10 mb-6 text-brown text-lg">Ventas Mensuales</h2>
                <StatsCard profit={profit} />
            </div>
        </ProtectedPage>
    );
};

export default Index;
