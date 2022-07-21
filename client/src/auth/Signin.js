import React, { useState } from 'react';
import auth from './../auth/auth-helper';
import { Redirect, Link } from 'react-router-dom';
import { signin } from './api-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Signin() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

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

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    $('#myModal').modal('hide');
    return <Redirect to={'/'} />;
  }
  return (
    <div style={{ width: '120px' }}>
      <div style={{ marginRight: '10px', float: 'left' }}>{buffer}</div>
      <button
        type='button'
        className='btn btn-dark'
        data-toggle='modal'
        data-target='#myModal'
      >
        Sign in
      </button>
      <div
        className='modal fade'
        id='myModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='myModalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-6 border-right text-center'>
                  <FontAwesomeIcon
                    style={{ marginTop: '20%' }}
                    size='10x'
                    icon={faPizzaSlice}
                  />
                </div>
                <div className='col-6'>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className='mb-3'>
                      <label htmlFor='exampleInputName' className='form-label'>
                        Username
                      </label>
                      <input
                        id='exampleInputName'
                        type='name'
                        label='name'
                        value={values.name.replace(/[^\w\s]/gi, '')}
                        onChange={handleChange('name')}
                        margin='normal'
                        className='form-control'
                        aria-describedby='emailHelp'
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        htmlFor='exampleInputPassword1'
                        className='form-label'
                      >
                        Password
                      </label>
                      <input
                        id='exampleInputPassword1'
                        type='password'
                        label='Password'
                        value={values.password}
                        onChange={handleChange('password')}
                        className='form-control'
                      />
                    </div>
                    {values.error && (
                      <h6 style={{ textAlign: 'center', color: 'red' }}>{values.error}</h6>
                    )}
                    <div className='d-flex justify-content-center'>
                      <button
                        onClick={clickSubmit}
                        type='submit'
                        className='btn btn-dark'
                      >
                        Sign in
                      </button>
                    </div>
                    <h6 className='form-text text-center'>
                      No account{'  '}
                      <div data-toggle='modal' data-target='#myModal'>
                        <a
                          href='/'
                          data-toggle='modal'
                          data-target='#myModal2'
                          className='card-link'
                        >
                          Sign up
                        </a>
                      </div>
                    </h6>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
