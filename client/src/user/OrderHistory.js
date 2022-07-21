import React, { useEffect, useState } from 'react';
import { listOrders } from './../order/api-order';
import OrderHistoryList from './OrderHistoryList';

function OrderHistory() {
  const [list, setList] = useState([]);
  const userId = window.location.pathname.match(/^\/orderHistory\/(.+)/)[1];
  useEffect(() => {
    listOrders(userId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setList(data.data);
      }
    });
  }, []);

  return (
    <div className='container-fluid'>
      <div className='card bg-light' style={{ height: '745.341px' }}>
        <div className='scroll' style={{ maxHeight: '100%', maxWidth: '100%' }}>
          <div className='row'>
            {list.map((item, index) => (
              <OrderHistoryList fullOrder={item.fullOrders} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
