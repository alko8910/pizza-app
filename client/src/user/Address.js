import React, { useState, useEffect } from 'react';
import AddressList from './AddressList';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../redux/actions/index';
import { listAddress } from './../order/api-order';
import baseUrl from '../config';
import FinalOrder from './FinalOrder';
const axios = require('axios');

function Address() {
  const [show, setShow] = useState(true);
  const [floor, setFloor] = useState(0);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [errorText, setErrorText] = useState('');
  const [disable, setDisable] = useState(false);
  var token = sessionStorage.getItem('token');
  const tokenParse = JSON.parse(token);
  const userId = tokenParse.user._id;
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.amount);
  const finalOrder = useSelector((state) => state.finalorder);

  useEffect(() => {
    if (!finalOrder.length || !list.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [list]);

  async function addFinalOrder() {
    var token = sessionStorage.getItem('token');
    const tokenParse = JSON.parse(token);
    const userId = tokenParse.user._id;
    await axios.post(
      `${baseUrl}/orders`,

      {
        data: finalOrder,
        userId,
      },

      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  async function addAddress() {
    if (address === '' || floor === 0) {
      setErrorText('Missing floor number or address');
    } else {
      await axios
        .post(
          `${baseUrl}/address`,
          { address: address, floor: floor, userId: userId },

          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          setList(res.data.data);
        });
      setShow(true);
      setAddress('');
      setFloor(0);
      setErrorText('');
    }
  }

  useEffect(() => {
    dispatch(actions.addUserId(userId));
  }, [userId]);

  useEffect(() => {
    listAddress(userId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setCounter(0);
        setList(data.data);
      }
    });
  }, [counter]);

  return (
    <div
      className='container'
      style={{ marginTop: '3px', marginBottom: '3px' }}
    >
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Address to deliver pizza</h5>
          <div className='scroll' style={{ maxHeight: '140px' }}>
            <div className='row'>
              {list.map((item, index) => (
                <AddressList
                  list={list}
                  setDisable={setDisable}
                  setCounter={setCounter}
                  address={item.address}
                  floor={item.floor}
                  notes={notes}
                  key={index}
                  id={item._id}
                />
              ))}
              <div className='col-sm'>
                {show && (
                  <div
                    id='hoverCard'
                    className='card'
                    style={{
                      margin: '5px',
                      width: '15rem',
                      height: '5rem',
                    }}
                  >
                    <a onClick={() => setShow(false)}>
                      <div className='card-body text-center'>
                        Add new address
                      </div>
                    </a>
                  </div>
                )}
                {!show && (
                  <div className='card'>
                    <a className='card-block link text-decoration-none'>
                      <div className='card-body'>
                        <span>
                          <div className='input-group input-group-sm mb-3'>
                            <div className='input-group-prepend'>
                              <span className='input-group-text' id='Address'>
                                Address
                              </span>
                            </div>
                            <input
                              type='text'
                              className='form-control'
                              aria-label='Small'
                              aria-describedby='inputGroup-sizing-sm'
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          </div>
                          <div className='input-group input-group-sm mb-3'>
                            <div className='input-group-prepend'>
                              <span className='input-group-text' id='Floor'>
                                Floor
                              </span>
                            </div>
                            <input
                              type='number'
                              className='form-control'
                              aria-label='Small'
                              aria-describedby='inputGroup-sizing-sm'
                              value={floor}
                              onChange={(e) => setFloor(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              float: 'left',
                              marginTop: '-10px',
                              marginBottom: '5px',
                            }}
                          >
                            {errorText}
                          </div>
                          <div
                            style={{
                              float: 'right',
                              marginTop: '-10px',
                              marginBottom: '5px',
                            }}
                          >
                            <button
                              className='btn-sm btn-dark'
                              onClick={addAddress}
                              style={{ marginRight: '5px' }}
                            >
                              Add
                            </button>
                            <button
                              className='btn-sm btn-dark'
                              onClick={() => setShow(true)}
                            >
                              Close
                            </button>
                          </div>
                        </span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card' style={{ height: '350px' }}>
        <div className='card-body'>
          <h5 className='card-title'>Payment</h5>
          <div
            className='card-body'
            style={{ position: 'relative', height: '57%' }}
          >
            <FinalOrder />
          </div>
          <br />
          <br />
          <h5 style={{ textAlign: 'center' }}>Total: {amount}$</h5>
        </div>
        <br />
        <div
          className='card-footer'
          style={{ height: '30%', position: 'relative' }}
        >
          <div className='container-fluid'>
            <div
              className='form-group'
              style={{ display: 'flex', position: 'relative' }}
            >
              <label htmlFor='exampleFormControlTextarea1'>
                <h6>Notes: </h6>
              </label>
              <textarea
                style={{
                  marginLeft: '10px',
                  width: '90%',
                  marginBottom: '20px',
                }}
                className='form-control'
                id='exampleFormControlTextarea1'
                rows='3'
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <button
              disabled={disable}
              style={{ marginTop: '-15px' }}
              type='button'
              data-toggle='modal'
              data-target='#exampleModalCenter'
              className='btn btn-dark btn-md btn-block'
              onClick={() => {
                addFinalOrder();
                setTimeout(() => {
                  window.location = 'http://localhost:3000/';
                }, 1000);
              }}
            >
              Order
            </button>
            <div
              className='modal fade'
              id='exampleModalCenter'
              tabIndex='-1'
              role='dialog'
              aria-labelledby='exampleModalCenterTitle'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-body'>You have placed an order!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
