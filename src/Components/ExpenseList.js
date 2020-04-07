import React, { Fragment } from 'react'
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({expenses, clearAll, handelDelete, handelEdit}) => {
	
	return (
		<Fragment>
			<ul className="list">
			{expenses.map(expense => {
				return 	<ExpenseItem
					key={expense.id}
					expense={expense}
					handelDelete={handelDelete}
					handelEdit = {handelEdit}
				/>
			})}
			</ul>
			{
				expenses.length > 0 &&
				<button className="btn" onClick={clearAll}>
					Clear expenses {<MdDelete className="btn-icon" />}
				</button>
			}
		</Fragment>
	);
}

export default ExpenseList;
