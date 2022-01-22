import { dinero, multiply, subtract } from 'dinero.js';
import { Ticket } from '../../graphql/graphql';
import { intlFormat, paymentMethodsToString, PayMappings } from '../../lib/utils';

interface Props {
    ticket: Ticket;
}

const TicketRenderer: React.FC<Props> = ({ ticket }) => {
    const vatAmount = multiply(dinero(ticket.total), { amount: ticket.vat, scale: 2 });
    const baseImp = subtract(dinero(ticket.total), vatAmount);
    return (
        <div>
            <h1 className="mb-1 text-lg font-semibold text-center text-black">
                Terraco Restaurant
            </h1>
            <div className="mb-6 text-sm text-center text-black">
                <p>Tel. +52 492 140 3408</p>
                <p>Cerro de la bufa, 98000 Zac.</p>
            </div>

            <div className="flex flex-row mb-6 space-x-1 text-xs text-black">
                <ul>
                    <li>Ticket No. {ticket.ticketNumber}</li>
                    <li>Fecha: {new Date(ticket.timestamp).toLocaleDateString('es-MX')}</li>
                    <li>Forma pago: {paymentMethodsToString(ticket.paymentMethod)}</li>
                </ul>
                <ul>
                    <li>Hora: {new Date(ticket.timestamp).toLocaleTimeString('es-MX')}</li>
                    <li>{ticket.tableName}</li>
                </ul>
            </div>

            <table className="mb-6 text-sm">
                <thead>
                    <tr className="text-left text-black">
                        <th className="font-semibold">Cant.</th>
                        <th className="font-semibold">Desc.</th>
                        <th className="font-semibold">Precio</th>
                        <th className="font-semibold">Importe</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {ticket.items.map((item, idx) => (
                        <tr key={idx} className="text-xs text-black">
                            <td className="text-xs font-semibold text-black">{item.quantity}</td>
                            <td className="text-xs text-left">{item.dishName}</td>
                            <td className="text-xs font-semibold">
                                {intlFormat(item.dishPrice, 'es-MX')}
                            </td>
                            <td className="text-xs font-semibold">
                                {intlFormat(item.amount, 'es-MX')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-row-reverse">
                <table className="mb-6 mr-2">
                    <tbody className="font-semibold text-black">
                        <tr>
                            <td>Base Imp. </td>
                            <td>{intlFormat(baseImp.toJSON(), 'es-MX')}</td>
                        </tr>
                        <tr>
                            <td>IVA {ticket.vat}%</td>
                            <td>{intlFormat(vatAmount.toJSON(), 'es-MX')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mx-2 text-xl font-semibold text-black">
                <span className="font-semibold text-black">Total: </span>
                <span>{intlFormat(ticket.total, 'es-MX')}</span>
            </div>
            <div className="flex-col intems-center mx-3 text-black mt-3 text-sm">
                <p className="pb-2 text-center text-black">Su pago, gracias.</p>
                <table className="w-full">
                    <tbody>
                        {ticket.paymentMethod.map(
                          (pm, idx) =>
                                pm.paymentAmount.amount > 0 && (
                                  <tr key={idx}>
                                        <td>{PayMappings.get(pm.method) || 'Desconocido'}</td>
                                        <td className="text-right">
                                            {intlFormat(pm.paymentAmount, 'es-MX')}
                                        </td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
            <p className="pt-8 text-sm text-center text-black">IVA Incluido</p>
            <p className="pb-2 text-sm text-center text-black">Gracias por su prefencia</p>
        </div>
    );
};
export default TicketRenderer;
