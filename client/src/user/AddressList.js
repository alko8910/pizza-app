import React, { useEffect } from 'react';
import { removeAddress } from './../order/api-order';

function AddressList({ address, floor, id, setCounter, setDisable, list }) {
  const deleteAddress = () => {
    setCounter(1);
    removeAddress(id);
  };

  useEffect(() => {
    if ((document.getElementById('flexRadioId').checked = true)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, []);

  return (
    <div className='col-sm'>
      <div className='card' style={{ margin: '5px', width: '15rem' }}>
        <div className='card-body'>
          <input
            id='flexRadioId'
            style={{ left: '25px', top: '0px', position: 'absolute' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
          />

          <p className=' text-center' style={{ marginTop: '-5px' }}>
            Address: {address}
          </p>
          <p className=' text-center' style={{ marginTop: '-20px' }}>
            Floor: {floor}
          </p>
          <button
            className='btn-sm btn-dark'
            onClick={() => deleteAddress()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressList;
