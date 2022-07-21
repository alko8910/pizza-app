import React, { useState, useEffect } from 'react';
import TextList from './TextList';
import * as actions from './../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';

function OrderList({
  dough,
  ingredients,
  price,
  totalAmount,
  count,
  setSumAll,
}) {
  const countTwo = useSelector((state) => state.countTwo);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);

  const sum = price * counter;

  useEffect(() => {
    if (countTwo === 1) {
      dispatch(actions.addFinalOrder(dough, ingredients, price, counter));
    }
  }, [countTwo]);

  useEffect(() => {
    totalAmount[count] = sum;
    dispatch(actions.addFinalSum(totalAmount));
  }, [counter]);

  useEffect(() => {
    setSumAll(totalAmount.reduce((a, b) => a + b, 0));
  }, [counter]);

  function decrement() {
    if (counter === 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  }

  return (
    <div className='col-sm-12'>
      <div className='card w-90' style={{ marginBottom: '10px' }}>
        <h6 className='card-header' style={{ textAlign: 'center' }}>
          {dough} {price}$
        </h6>

        <div className='card-body'>
          {ingredients.map((item, index) => (
            <TextList item={item} key={index} />
          ))}
          <p className='card-text' style={{ float: 'left' }}></p>
        </div>
        <div
          className='card-footer text-center'
          style={{ margin: '0', padding: '5px' }}
        >
          <div className='btn-group'>
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

export default OrderList;
