import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import FinalOrderList from './FinalOrderList';

function FinalOrder() {
  const finalOrder = useSelector((state) => state.finalorder);
  const finalSum = useSelector((state) => state.finalSum);
  const [sumOfAll, setSumOfAll] = useState(0);

  useLayoutEffect(() => {
    if (finalSum.length >= 2) {
      finalSum.shift();
    }
  }, []);

  return (
    <div>
      <div className='scroll' style={{ maxHeight: '230px' }}>
        <div className='row'>
          {finalOrder.map((item, index) => (
            <FinalOrderList
              track={index}
              item={item}
              sumOfAll={sumOfAll}
              setSumOfAll={setSumOfAll}
              finalSum={finalSum}
              dough={item[0].dough}
              ingredients={item[1].ingredients}
              price={item[2].price}
              amount={item[3].amount}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FinalOrder;
