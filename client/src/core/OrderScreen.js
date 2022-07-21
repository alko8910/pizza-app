import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FinalSum from './FinalSum';
import OrderList from './OrderList';

function OrderScreen() {
  const order = useSelector((state) => state.order);
  const [totalAmount, setTotalAmount] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [sumAll, setSumAll] = useState(0);

  useEffect(() => {
    setOrderList(order);
    setTotalAmount([...totalAmount, 0]);
  }, [order]);

  return (
    <div>
      <div className='row'>
        {orderList.map((item, index) => (
          <OrderList
            setSumAll={setSumAll}
            count={index}
            totalAmount={totalAmount}
            orderList={orderList}
            setOrderList={setOrderList}
            dough={item[0].name}
            price={item[2].price}
            ingredients={item[1].ingredients}
            orderID={item[3].orderID}
            key={index}
          />
        ))}
      </div>
      <FinalSum sumAll={sumAll} />
    </div>
  );
}
export default OrderScreen;
