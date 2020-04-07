import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import  ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import Alert from "./Components/Alert";
import  uuid  from 'uuid/v4'

function App() {
  
  // const intialList = [
  //   {id: uuid(), charge: 'Rent', amount: 1600},
  //   {id: uuid(), charge: 'car', amount: 300},
  //   {id: uuid(), charge: 'electricity', amount: 50}
  // ];
  
  const intialList = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
  
  const [expenses, setexpenses] = useState(intialList);

  const [charge, setcharge] = useState('');

  const [amount, setamount] = useState('');
  
  const [alert, setalert] = useState({show: false});
  
  const [Edit, setEdit] = useState(false);

  const [Id, setId] = useState(0);
  
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [])

  const handelAmount = e => {
    setamount(e.target.value)
  }
  
  const handelCharge = e => {
    setcharge(e.target.value)
  }
  
  const handelAlert = ({type, text}) => {
    setalert({show: true, type, text});
    setTimeout(() => {
      setalert({show: true})
    }, 3000);
  }
  
  const clearAll = () => {
    setexpenses([]);
    handelAlert({type: 'danger', text: 'All items has been deleted'});
  }
  
  const handelSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      if(Edit) {
        let expense = expenses.map(item => {
          return item.id === Id ? {...item, charge, amount} : item
        });
        setexpenses(expense);
        setEdit(false);
        handelAlert({type: 'success', text: 'Item edited'})
      } else {
        const newExpense = {id: uuid(), charge: charge, amount: amount};
        setexpenses([...expenses, newExpense]);
        handelAlert({type: 'success',text: 'Item added'});
      }
      setcharge('');
      setamount('');
    } else {
      handelAlert({
        type:'danger',
        text:'cannot add item please check all the fields'
      });
    }
  }
  
  const handelDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setexpenses(tempExpenses);
    handelAlert({type: 'danger', text: 'Selected item has been deleted'})
  }
  
  const handelEdit = (id) => {
    setEdit(true)
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setcharge(charge);
    setamount(amount);
    setId(id);
  }

  return (
    <Fragment>
      { 
        alert.show && <Alert type={alert.type} text={alert.text}/>
      }
      <Alert />
      <h1> Budget Calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge}
          amount={amount}
          handelAmount={handelAmount}
          handelCharge = {handelCharge}
          handelSubmit = {handelSubmit}
          Edit={Edit}
        />
        <ExpenseList
          expenses={expenses}
          clearAll={clearAll}
          handelDelete = {handelDelete}
          handelEdit = {handelEdit}
        />
      </main>
      <h1 className="total">Total Spending:${expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)
      } </h1>
    </Fragment>
  );
}

export default App;
