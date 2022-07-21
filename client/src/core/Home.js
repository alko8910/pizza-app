import React, { useState, useEffect } from 'react';
import { listDough } from './../order/api-order';
import * as actions from './../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Dough from './Dough';
import OrderScreen from './OrderScreen';
import './.././assets/styles/index.css';
import auth from './../auth/auth-helper';
import { withRouter, Redirect } from 'react-router-dom';

const Home = () => {
  const [listOfDough, setListOfDough] = useState([]);
  const [redirectNow, setRedirectNow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    listDough().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setListOfDough(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!order.length) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [order]);

  if (redirectNow) {
    return <Redirect to={'/user/' + auth.isAuthenticated().user._id} />;
  }

  return (
    <div className='container'>
      <div className='container-fluid' style={{ margin: '15px' }}>
        <div className='row row-eq-height'>
          <div
            className='col p-3 border bg-light'
            style={{ marginRight: '5px' }}
          >
            <h3>Pick a dough</h3>
            {listOfDough.map((item) => (
              <Dough
                gluten={item.gluten_free}
                key={item._id}
                desc={item.desc}
                name={item.name}
                type={item.dough}
                price={item.price}
              />
            ))}
          </div>
          <div
            className='col p-3 border bg-light position-relative'
            style={{ marginLeft: '5px' }}
          >
            <h3>Order</h3>
            <div className='scroll' style={{ maxHeight: '75%' }}>
              <OrderScreen />
              {auth.isAuthenticated() && (
                <button
                  disabled={disabled}
                  id='read-more'
                  className='btn btn-dark position-absolute'
                  style={{ width: '100px', bottom: '15px', right: '15px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(actions.addCountTwo(1));
                    setTimeout(() => {
                      dispatch(actions.removeOrder([]));
                      setRedirectNow(true);
                      dispatch(actions.addCountTwo(0));
                    }, 500);
                  }}
                >
                  Buy
                </button>
              )}
              {!auth.isAuthenticated() && (
                <div data-toggle='modal' data-target='#myModal2'>
                  <h6 className='form-text text-center'>
                    <button
                      id='read-more'
                      className='btn btn-dark  position-absolute'
                      style={{ width: '100px', bottom: '15px', right: '15px' }}
                    >
                      Buy
                    </button>
                  </h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
