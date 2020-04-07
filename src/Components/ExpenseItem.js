import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const ExpenseItem = ({expense, handelDelete, handelEdit}) => {
	const {id, charge, amount} = expense;
	
	return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">{amount}</span>
			</div>
			<div>
				<button className="edit-btn" onClick={() => handelEdit(id)}> <MdEdit></MdEdit></button>
        <button className="clear-btn" onClick={() => handelDelete(id)}> <MdDelete></MdDelete></button>
      </div>
    </li>
  );
}

export default ExpenseItem;