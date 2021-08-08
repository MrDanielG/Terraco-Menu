import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface Props {}

const InfoTable = (props: Props) => {
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="mt-2">
            <div className="flex items-center justify-center">
                <p className="text-sm text-gray-500">QR IMG</p>
            </div>

            <div className="flex justify-around my-4">
                <p className="text-gray-500">Activada:</p>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                        enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default InfoTable;
