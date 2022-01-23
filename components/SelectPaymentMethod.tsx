import { Dinero, dinero, subtract } from 'dinero.js';
import React, { useState } from 'react';
import { intlFormat } from '../lib/utils';
import DineroInput from './DineroInput';

interface Props {
    total: Dinero<number>;
    efectivo?: Dinero<number>;
    tarjeta?: Dinero<number>;
    onChange?: (efectivo: Dinero<number>, tarjeta: Dinero<number>) => void;
}

interface State {
    efectivo: Dinero<number>;
    tarjeta: Dinero<number>;
}
const SelectPaymentMethod: React.FC<Props> = ({ total, onChange, efectivo, tarjeta }) => {
    const zero = dinero({ amount: 0, currency: total.toJSON().currency });
    const [state, setState] = useState<State>({
        efectivo: efectivo || total,
        tarjeta: tarjeta || zero,
    });

    return (
        <div>
            <p className="text-gray-500 text-sm text-center">
                Al introducir o cambiar la cantidad en alguna de las formas de pago, la otra se
                ajustará automáticamente.
            </p>
            <div className="flex gap-4 flex-col mt-4">
                <div className="flex justify-between">
                    <span>Efectivo:</span>
                    <DineroInput
                        onChange={(value) => {
                            const tarjeta = subtract(total, value);
                            const efectivo = value;
                            if (!!onChange) {
                                onChange(efectivo, tarjeta);
                            }
                            setState({ efectivo, tarjeta });
                        }}
                        initValue={state.efectivo}
                        min={zero}
                        max={total}
                    />
                </div>
                <div className="flex justify-between">
                    <span>Tarjeta:</span>
                    <DineroInput
                        onChange={(value) => {
                            const efectivo = subtract(total, value);
                            const tarjeta = value;
                            if (!!onChange) {
                                onChange(efectivo, tarjeta);
                            }
                            setState({ efectivo, tarjeta });
                        }}
                        initValue={state.tarjeta}
                        min={zero}
                        max={total}
                    />
                </div>
                <div className="flex justify-between">
                    <span>Total a cobrar:</span>
                    <span>{intlFormat(total.toJSON(), 'es-MX')}</span>
                </div>
            </div>
        </div>
    );
};

export default SelectPaymentMethod;
