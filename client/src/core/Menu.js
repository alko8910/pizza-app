import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from './../auth/auth-helper';
import Signin from '../auth/Signin';
import SignUp from '../user/Signup';
import Ingredients from './../core/Ingredients';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

function Menu({values}) {
  const order = useSelector((state) => state.order);
  let buffer = [];
  if (!order.length) {
    buffer.push(
      <Link key='1' to={'/'}>
        <h2 className='bi bi-cart' style={{ float: 'left' }} />
      </Link>
    );
  } else {
    buffer.push(
      <Link key='2' to={'/'}>
        <h2 className='bi bi-cart-fill' style={{ float: 'left' }} />
      </Link>
    );
  }

  return (
    <nav className='navbar navbar-light' style={{ backgroundColor: '#e3f2fd' }}>
      <div className='container-fluid'>
        <div>
          <FontAwesomeIcon
            size='2x'
            icon={faPizzaSlice}
            style={{ marginRight: '10px' }}
          />
          <h4 className='navbar-brand mb-0 h1'>Pizza Order Composer</h4>
        </div>
        {auth.isAuthenticated() && (
          <span>
            <div className='dropdown' style={{ width: '70px' }}>
              <div>{buffer}</div>
              <h2
                className='bi bi-person-circle'
                id='dropdownMenu2'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                style={{ float: 'right' }}
              />
              <div
                style={{ left: '-53px' }}
                className='dropdown-menu dropdown-menu-lg-right'
                aria-labelledby='dropdownMenu2'
              >
                <Link to={'/orderHistory/' + auth.isAuthenticated().user._id}>
                  <button className='dropdown-item' type='button'>
                    Order History
                  </button>
                </Link>
                <Link to='/'>
                  <button
                    onClick={() => {
                      auth.clearJWT();
                      // window.location.reload();
                    }}
                    className='dropdown-item'
                    type='button'
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </div>
            
            <Ingredients />
          </span>
        )}
        {!auth.isAuthenticated() && (
          <span>
            <Signin />
            <SignUp />
            <Ingredients />
          </span>
        )}
      </div>
    </nav>
  );
}

export default withRouter(Menu);
