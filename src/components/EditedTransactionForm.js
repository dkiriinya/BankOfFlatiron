import React, { useState } from "react";

export default function EditedTransactionForm({ editedTransaction, fetchTransaction, setIsEditFormVisible }) {
  const [editedData, setEditedData] = useState({
    description: editedTransaction.description,
    amount: editedTransaction.amount,
    date: editedTransaction.date,
    category: editedTransaction.category,
  });

  const handleUpdate = async () => {
    console.log(editedData)
    try {
      const response = await fetch(`http://localhost:8001/transactions/${editedTransaction.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        // Re-fetch transactions to update the UI
        fetchTransaction();
        // Hide the edit form after successful update
        setIsEditFormVisible(false);
      } else {
        console.log('Error updating transaction', response.statusText);
      }
    } catch (error) {
      console.error('Error updating transaction', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="container">
  <h3>Edit Transaction</h3>
  <form>
    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={editedData.description}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={editedData.amount}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={editedData.date}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={editedData.category}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
    <button type="button" onClick={handleUpdate} className="btn btn-success">
      Update Transaction
    </button>
  </form>
</div>

  );
}
