import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../home-components/styles/toolBar.css'
export default function ToolBar() { 
    return (
        <div className='toolbar'>
            <h3>Fitness Tracker</h3>
            <FontAwesomeIcon icon={faUser} size="2x"/>
        </div>
    );
}