import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from './../redux/actions/index';

function FinalOrderList({
  dough,
  ingredients,
  price,
  amount,
  finalSum,
  sumOfAll,
  setSumOfAll,
  track,
  item,
}) {
  const [counter, setCounter] = useState(amount);
  const dispatch = useDispatch();
  const sum = price * counter;

  useEffect(() => {
    dispatch(actions.addAmount(sumOfAll + 5));
  }, [sumOfAll]);

  useEffect(() => {
    finalSum[track] = sum;
    item[3].amount = counter;
    setSumOfAll(finalSum.reduce((a, b) => a + b, 0));
  }, [counter]);

  function decrement() {
    if (counter === 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  }

  return (
    <div className='col-sm'>
      <div className='card' style={{ margin: '5px', width: '15rem' }}>
        <div className='card-body'>
          <h5 className=' text-center'>Dough: {dough}</h5>
          <h6 className=' text-center'>
            Ingredients: {ingredients.toString()}
          </h6>
          <h6 className=' text-center'>Price: {price}</h6>
          <div className='btn-group' style={{ marginLeft: '30%' }}>
            <button
              type='button'
              className='btn-sm btn-dark'
              onClick={decrement}
            >
              -
            </button>
            <h6
              className='border border-secondary'
              style={{
                width: '25px',
                height: '25px',
                textAlign: 'center',
                margin: '5px',
              }}
            >
              {counter}
            </h6>

            <button
              type='button'
              className='btn-sm btn-dark'
              onClick={() => {
                setCounter(counter + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalOrderList;
