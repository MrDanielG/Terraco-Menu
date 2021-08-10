import { toFormat, dinero, DineroOptions, Dinero } from 'dinero.js';

const deftransformer = ({ amount }: DineroOptions<number>) => `\$ ${amount}`;

export function formatDinero(dineroSnap: DineroOptions<number>, transformer = deftransformer) {
  return toFormat(dinero(dineroSnap), transformer);
}


export function intlFormat(dineroObject: Dinero<number>, locales: string | string[], options = {}) {
  function transformer({ amount, currency }: DineroOptions<number>) {
    return amount.toLocaleString(locales, {
      ...options,
      style: 'currency',
      currency: currency.code,
    });
  };
  return toFormat(dineroObject, transformer);
};
