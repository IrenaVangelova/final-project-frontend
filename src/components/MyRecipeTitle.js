import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

const MyRecipeTitle = (props) => {
    return (
        <div style={{ display: 'flex', alignText: 'flex-end', marginTop: '5rem' }}>
            <div className='unnamed-character-style-5' style={{ lineHeight: "40px" }}>{props.title}</div>
            <div
                style={{
                    borderBottom: '1px solid #D8D8D8',
                    flexGrow: '1',
                    marginBottom: '0.7rem',
                    marginLeft: '2rem',
                }}
            ></div>
            <Link to="/add"><div style={{ background: "var(--orange)", boxShadow: "0px 3px 6px #00000029", width: "41px", height: "41px", borderRadius: "50%", marginLeft: "0.5rem" }}>
                <FontAwesomeIcon icon={faPlus} color="white" style={{ width: "19.6px", height: "40.1px" }} />
            </div>
            </Link>
        </div>
    );
};

export default MyRecipeTitle;