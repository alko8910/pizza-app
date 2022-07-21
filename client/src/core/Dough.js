import React from 'react';
import * as actions from './../redux/actions/index';
import { useDispatch } from 'react-redux';
import glutenImg from './../assets/images/gluten.png';

function Dough({ desc, name, price, gluten }) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.addDough(name));
    dispatch(actions.addPrice(price));
  };

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  return (
    <div
      className='card w-100'
      style={{ marginBottom: '10px', position: 'relative' }}
    >
      <div className='card-body'>
        <h5 className='card-title col-9'>
          {name}{' '}
          {gluten && (
            <img
              src={glutenImg}
              style={{ height: '30px', width: '30px' }}
              className='img-fluid'
              alt='Responsive image'
            />
          )}
        </h5>
        <form>
          <h6 style={{ position: 'absolute', right: '10px', top: '23px' }}>
            {price}$
          </h6>
          <button
            style={{ float: 'right' }}
            type='button'
            className='btn btn-dark'
            data-toggle='modal'
            data-placement='top'
            title='Add ingredients'
            data-target='#ingredientsModal'
            onClick={onClick}
          >
            +Add
          </button>
        </form>
        <p className='card-text'>{desc} </p>
      </div>
    </div>
  );
}

export default Dough;
