import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';
import { iconStyle } from '../Navbar/NavigationStyles';


function Footer() {
  return (
    <div className='footer'>
      <div className='footer-wrapper'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div>
            <div className='footer-logo-baby'>Baby's</div>
            <div className='footer-logo-food'>food place</div>
          </div>
        </Link>
        <div className='footer-links'>
          <Link to='/breakfast'>Breakfast</Link>
          <FontAwesomeIcon icon={faCircle} color='white' style={iconStyle} />
          <Link to='/brunch'>Brunch</Link>
          <FontAwesomeIcon icon={faCircle} color='white' style={iconStyle} />
          <Link to='/lunch'>Lunch</Link>
          <FontAwesomeIcon icon={faCircle} color='white' style={iconStyle} />
          <Link to='/dinner'>Dinner</Link>
        </div>
        <div className='footer-copyright'>
          <p>Baby’s Food Place copyright © 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;