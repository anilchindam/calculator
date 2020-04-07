import React, { Fragment } from 'react'
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({
	amount,
	charge,
	handelAmount,
	handelCharge,
	handelSubmit,
	Edit
}) => {
	return (
		<Fragment>
			<form onSubmit={handelSubmit}>
				<div className = "form-center">
					<div className="form-group">
						<label htmlFor="charge"> charge</label>
						<input className="form-control"
							id="charge"
							type="text"
							placeholder="e.g rent"
							name="charge"
							value={charge}
							onChange={handelCharge}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="amount">amount</label>
						<input className="form-control"
							id="amount"
							type="text"
							placeholder="e.g 100"
							name="amount"
							value={amount}
							onChange={handelAmount}
						/>
					</div>
				</div>
				<button
					type="submit"className = "btn"> 
					{
						Edit ? 'Edit' : 'Submit'
					}
				  <MdSend className="btn-icon"/>
				</button>
			</form>
		</Fragment>
	)
}

export default ExpenseForm;
