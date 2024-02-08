import { useState } from "react"

export default function AddTransactionForm({onAdd}){

  const [newTransaction, setNewTransaction] = useState({
      description: '',
      amount: '',
      date: '',
      category: ''
  });
  const handleInputChange = (event) => {
       const {name, value} = event.target;
       //object property shorthand syntax :  [name]: value
       // dynamically sets a property on the object 
       setNewTransaction({...newTransaction, [name]: value})
  }

  const handleSubmit = (event) => {
       event.preventDefault();
       onAdd(newTransaction);
       // resetting the input box
       setNewTransaction({description: '' , amount: '' , date: '' , category: ''})
  }
     return (
        <>
          <div className="container mb3">
            <h2>Add Transaction</h2>
            <form className="form-control" onSubmit={handleSubmit}>
                <label htmlFor="description">Description</label>
                <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}                
                />
                <label htmlFor="amount">Amount</label>
                <input
                type="number"
                id="amount"
                className="form-control"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}                
                />
                <label htmlFor="date">Date</label>
                <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}                
                />
               <label htmlFor="category">Category</label>
                <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}                
                />
                <br></br>
                <button type="submit" className="btn btn-success">Add new transaction</button>
            </form>
          </div>
        </>
     )
}

