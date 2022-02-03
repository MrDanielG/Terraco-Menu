import { dinero, add, subtract, toUnit, Dinero, lessThan, greaterThan } from 'dinero.js';
import { MXN } from '@dinero.js/currencies';
import React, { useState } from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

type Operation = (a: Dinero<number>, b: Dinero<number>) => Dinero<number>;

interface Props {
    onChange?: (value: Dinero<number>) => void;
    initValue?: Dinero<number>;
    min?: Dinero<number>;
    max?: Dinero<number>;
    step?: number;
}

const DineroInput: React.FC<Props> = ({ onChange, initValue, min, max, step = 100 }) => {
    const [value, setValue] = useState<Dinero<number>>(
        initValue || dinero({ amount: 0, currency: MXN, scale: 2 })
    );
    const handleOnClick = (operation: Operation) => {
        const localValue = initValue || value;
        const currency = localValue.toJSON().currency;
        const scale = localValue.toJSON().scale;
        let newValue = operation(
            localValue,
            dinero({ amount: step, currency: currency, scale: scale })
        );

        if (!!min && lessThan(newValue, min)) {
            newValue = min;
        }
        if (!!max && greaterThan(newValue, max)) {
            newValue = max;
        }
        if (!!onChange) {
            onChange(newValue);
        }
        if (!!!initValue) {
            setValue(newValue);
        }
    };
    const handleOnChage = (valueStr: string) => {
        let parsedValue = parseFloat(valueStr);
        if (!!!parsedValue) parsedValue = 0.0;
        const localValue = initValue || value;
        const currency = localValue.toJSON().currency;
        const scale = localValue.toJSON().scale;
        const factor = currency.base ** currency.exponent || scale;
        const amount = Math.round(parsedValue * factor);
        let newValue = dinero({ amount, currency, scale });
        if (!!min && lessThan(newValue, min)) {
            newValue = min;
        }
        if (!!max && greaterThan(newValue, max)) {
            newValue = max;
        }
        if (!!onChange) {
            onChange(newValue);
        }
        if (!!!initValue) {
            setValue(newValue);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <button
                className="rounded-l-full bg-brown text-white max-h-8 p-2"
                onClick={() => handleOnClick(subtract)}
            >
                <HiMinusSm />
            </button>
            <span className="bg-brown text-white p-1 h-8 ">$</span>
            <input
                onChange={(e) => handleOnChage(e.target.value)}
                value={toUnit(initValue || value, { digits: 2 })}
                step="any"
                name=""
                type="number"
                className="appearance-none text-center w-24 h-8 border-none bg-brown caret-white text-white text-base p-0"
                style={{
                    WebkitAppearance: 'textfield',
                    MozAppearance: 'textfield',
                    appearance: 'textfield',
                }}
            />
            <button
                className="rounded-r-full bg-brown text-white max-h-8 p-2"
                onClick={() => handleOnClick(add)}
            >
                <HiPlusSm />
            </button>
        </div>
    );
};

export default DineroInput;
