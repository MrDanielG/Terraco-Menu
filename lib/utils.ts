import { toFormat, dinero, DineroOptions } from 'dinero.js';

const deftransformer = ({ amount }: DineroOptions<number>) => `\$ ${amount}`;

export function formatDinero(dineroSnap: DineroOptions<number>, transformer = deftransformer) {
  return toFormat(dinero(dineroSnap), transformer);
}


export function intlFormat(dineroOpt: DineroOptions<number>, locales: string | string[], options = {}) {
  function transformer({ amount, currency }: DineroOptions<number>) {
    return amount.toLocaleString(locales, {
      ...options,
      style: 'currency',
      currency: currency.code,
    });
  };
  return toFormat(dinero(dineroOpt), transformer);
};
