import { Ticket } from '../../graphql/graphql';
import Collapsible from 'react-collapsible';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import TicketRenderer from './TicketRenderer';
interface Props {
    ticket: Ticket;
}
const TicketView: React.FC<Props> = ({ ticket }) => (
    <Collapsible
        trigger={
            <div className="flex items-center justify-between text-sm text-gray-500 cursor-pointer">
                <span>Visualizar Ticket</span>
                <AiFillCaretDown />
            </div>
        }
        triggerWhenOpen={
            <div className="flex items-center justify-between text-sm text-gray-500 cursor-pointer">
                <span>Visualizar Ticket</span>
                <AiFillCaretUp />
            </div>
        }
    >
        <TicketRenderer ticket={ticket} />
    </Collapsible>
);

export default TicketView;
