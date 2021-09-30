import { dinero, DineroOptions, toFormat } from 'dinero.js';
import Fuse from 'fuse.js';
import { DishSalesStats } from '../graphql/graphql';

const deftransformer = ({ amount }: DineroOptions<number>) => `\$ ${amount}`;

export function formatDinero(dineroSnap: DineroOptions<number>, transformer = deftransformer) {
    return toFormat(dinero(dineroSnap), transformer);
}

export function intlFormat(
    dineroOpt: DineroOptions<number>,
    locales: string | string[],
    options = {}
) {
    function transformer({ amount, currency }: DineroOptions<number>) {
        return amount.toLocaleString(locales, {
            ...options,
            style: 'currency',
            currency: currency.code,
        });
    }
    return toFormat(dinero(dineroOpt), transformer);
}

export function getMonthName(year: number, month: number) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    return date.toLocaleString('es-MX', { month: 'long' });
}

export function getDayNumberDate(locale: string) {
    const date = new Date();
    return date.toLocaleString(locale, { weekday: 'long', day: 'numeric' });
}

export function getTime(timestamp: any, locale: string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(locale, { hour12: true, hour: '2-digit', minute: '2-digit' });
}

export function getCustomDayNumberDate(
    locale: string,
    year: number,
    month: number,
    dayOfMonth: number
) {
    const date = new Date(Date.UTC(year, month, dayOfMonth));
    return date.toLocaleString(locale, { weekday: 'long', day: 'numeric' });
}

export function topDishSells(dishSales: DishSalesStats[]): DishSalesStats[] {
    const topDishes: DishSalesStats[] = Object.values(
        dishSales.reduce((reduced: any, current) => {
            const monthName = getMonthName(current.year, current.month - 1);
            reduced[monthName] =
                reduced[monthName] &&
                reduced[monthName].totalSales.amount > current.totalSales.amount
                    ? reduced[monthName]
                    : current;
            return reduced;
        }, {})
    );
    return topDishes;
}

export function search<T>(pattern: string, list: T[], keys: Fuse.FuseOptionKey[]) {
    const fuse = new Fuse(list, { isCaseSensitive: false, keys: keys, threshold: 0.2 });
    return fuse.search(pattern);
}
