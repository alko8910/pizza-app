import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../redux/actions/index';

function FinalSum({ sumAll }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.addAmount(sumAll));
  }, [sumAll]);

  return (
    <div className='container-fluid'>
      <div style={{ bottom: '90px', width: '80%', position: 'absolute' }}>
        <h6 style={{ float: 'left' }}>Delivery</h6>
        <h6 style={{ float: 'right' }}>5$</h6>
      </div>
      <div
        style={{ bottom: '30px', width: '80%', position: 'absolute' }}
        className='border-top my-3'
      >
        <h4 style={{ float: 'left' }}>Total</h4>
        <h6 style={{ float: 'right' }}>{sumAll + 5}$</h6>
      </div>
    </div>
  );
}

export default FinalSum;
