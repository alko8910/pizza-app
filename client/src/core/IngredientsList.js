import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../redux/actions/index';
import glutenImg from './../assets/images/gluten.png';

function IngredientsList({ name, id, price, gluten }) {
  const dispatch = useDispatch();

  function validate() {
    const array = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value);
    }
    dispatch(actions.addSumOfPrices(price));
    dispatch(actions.addIngredients(array));
  }

  return (
    <div className='form-check'>
      <h6 style={{ float: 'right' }}>{price}$</h6>
      <input
        onClick={validate}
        className='form-check-input'
        type='checkbox'
        value={name}
        id={id}
      />
      <label className='form-check-label' htmlFor='flexCheckDefault'>
        <h6>
          {name}
          {'  '}
          {gluten && (
            <img
              src={glutenImg}
              style={{ height: '20px', width: '20px' }}
              className='img-fluid'
              alt='Responsive image'
            />
          )}
        </h6>
      </label>
    </div>
  );
}

export default IngredientsList;
