import React from 'react';

function OrderHistoryList({ fullOrder }) {
  console.log(fullOrder);
  const timestamp = (time) => {
    // return moment(time).format("DD/MM/YYYY, hh:mm:ss");
    return moment(time).format('LLLL');
  };

  return (
    <div className='col-sm-12'>
      <div
        className='card text-center card border-primary mb-3'
        style={{ margin: '10px' }}
      >
        <div className='row'>
          {fullOrder.map((item, index) => (
            <div className='col-sm-12' key={index}>
              <div className='card-body'>
                <h5 className='card-text text-center'>Dough: {item.dough} </h5>
                <h6 className='card-text text-center'>
                  Ingredients: {item.ingredients.toString()}
                </h6>
                <h6 className='card-text text-center'>
                  Price: {item.price * item.amount + 5} $
                </h6>
                <h6 className='card-text text-center'>
                  Amount: {item.amount}{' '}
                </h6>
                <h6 className='card-text text-center'>
                  Time: {timestamp(item.time)}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryList;
