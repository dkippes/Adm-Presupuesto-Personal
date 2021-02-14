import React, { useState } from 'react'
import axios from 'axios';
import './Balance.css'


function Balance() {

    const [balance, setBalance] = useState('');
    const [operations, setOperations] = useState('');

    axios
      .get('http://localhost:3000/api/administrations/totalBalance')
      .then(({ data: info }) => {
          setBalance(info.data.totalBalance)
      })
      .catch((err) => {
        console.log(err.message);
      });

    return (
      <>
            <h2 className="balance-title">Balance: $ {balance}</h2>
      </>
    );
}

export default Balance
