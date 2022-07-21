import React, { useState } from 'react';
import { create } from './api-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

function Signup() {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  });

  $('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else $('#message').html('Not Matching').css('color', 'red');
    setRedirect(false);
  });

  function myFunction() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  function myFunctionTwo() {
    var x = document.getElementById('confirm_password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
        const matching = document.getElementById('message').innerHTML;
        if (matching === 'Matching') {
          setRedirect(true);
        }
      }
      // Signup more than one user
      setRedirect(false);
      // const user = {
      //   name: '',
      //   email: '',
      //   password: '',
      // };
      // setValues(user);
    });
  };
  if (redirect) {
    $('#myModal2').modal('hide');
    return <Redirect to={'/'} />;
  }

  return (
    <div>
      <div
        className='modal fade'
        id='myModal2'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='myModalTitle2'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-6 border-right text-center'>
                  <FontAwesomeIcon
                    style={{ marginTop: '60%' }}
                    size='10x'
                    icon={faPizzaSlice}
                  />
                </div>
                <div className='col-6'>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className='mb-3'>
                      <label htmlFor='exampleInputname' className='form-label'>
                        Name
                      </label>
                      <input
                        id='exampleInputname'
                        type='name'
                        label='name'
                        value={values.name.replace(/[^\w\s]/gi, '')}
                        onChange={handleChange('name')}
                        margin='normal'
                        className='form-control'
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                      >
                        Email address
                      </label>
                      <input
                        id='exampleInputEmail1'
                        type='email'
                        label='Email'
                        value={values.email}
                        onChange={handleChange('email')}
                        margin='normal'
                        className='form-control'
                        aria-describedby='emailHelp'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='password' className='form-label'>
                        Password
                      </label>
                      <div className='wrapper' style={{ position: 'relative' }}>
                        <input
                          id='password'
                          type='password'
                          label='Password'
                          value={values.password}
                          onChange={handleChange('password')}
                          className='form-control'
                        />{' '}
                        <label
                          htmlFor='flexCheckDefault'
                          className='fa fa-user input-icon'
                        >
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              left: '190px',
                            }}
                          />
                        </label>
                      </div>
                      <div className='form-check'>
                        <div className='invisible'>
                          <input
                            onClick={() => myFunction()}
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            id='flexCheckDefault'
                          />
                        </div>
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='passwordTwo' className='form-label'>
                          Confirm Password
                        </label>
                        <div
                          className='wrapper'
                          style={{ position: 'relative' }}
                        >
                          <input
                            id='confirm_password'
                            type='password'
                            name='confirm_password'
                            label='confirm_password'
                            className='form-control'
                          />{' '}
                          <label
                            htmlFor='flexCheckDefault2'
                            className='fa fa-user input-icon'
                          >
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              style={{
                                position: 'absolute',
                                top: '10px',
                                left: '190px',
                              }}
                            />
                          </label>
                        </div>

                        <div className='form-check2'>
                          <div className='invisible'>
                            <input
                              onClick={() => myFunctionTwo()}
                              className='form-check-input'
                              type='checkbox'
                              value=''
                              id='flexCheckDefault2'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        left: ' 50%',
                        transform: 'translateX(-50%)',
                        marginTop: '-30px',
                      }}
                      id='message'
                    ></span>
                    {values.error && (
                      <h6 style={{ textAlign: 'center', color: 'red' }}>{values.error}</h6>
                    )}
                    <div className='d-flex justify-content-center'>
                      <button
                        style={{ top: '40px' }}
                        onClick={clickSubmit}
                        type='submit'
                        className='btn btn-dark'
                      >
                        Sign up
                      </button>
                    </div>
                    <h6 className='form-text text-center'>
                      Already have an account{' '}
                      <div data-toggle='modal' data-target='#myModal2'>
                        <a
                          href='/'
                          data-toggle='modal'
                          data-target='#myModal'
                          className='card-link'
                        >
                          Sign in
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

export default Signup;
