import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import TransactionTable from './components/TransactionTable';
import AddTransactionForm from './components/AddTransactionForm';
import EditedTransactionForm from './components/EditedTransactionForm';
import About from './components/About';
import Navbar from './components/Navbar';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';

function App() {
  const [isEditFormVisible ,setIsEditFormVisible] = useState(false)
  // state to hold transactions 
  const [transactions, setTransactions] = useState([]);
  //using a copy of the search value
  const [term,setTerm] = useState('');
  const [sortType, setSortType] = useState(null); 
  const [editedTransaction, seteditedTransaction] = useState({
    id: '',
    description: '',
    amount: 0,
    date: '',
    category: ''
  })
  


  // as the component mounts , this will run initially 
  useEffect(() => 
  {
      fetchTransaction();
  }, []);

  const handleEdit = async (id) => {
    try {
      console.log('Attempting to fetch transaction details for editing');
      const response = await fetch(`http://localhost:8001/transactions/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched transaction details:', data);
        seteditedTransaction(data);
        setIsEditFormVisible(true); 
      } else {
        console.log('Error fetching transaction details for editing', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching transaction details for editing', error);
    }
  };
  


  const fetchTransaction = async () => {
        try {
           const response = await fetch("http://localhost:8001/transactions");
           const data = await response.json()
           setTransactions(data);
           console.log(data)
           console.log(transactions)
        } catch(error) {
            console.log("Error fetching transaction " , error);
        }
  }

  const handleSearch = async (searchValue) => {
    // console.log("from app.js " , searchValue)
    setTerm(searchValue)
    console.log(term)
    // from using the search value to filter my shared transactions
  }


  const filteredTransactions = transactions.filter((transaction) => 
       transaction.description.toLowerCase().includes(term.toLowerCase())
  );

  const addTransaction = async (newTransaction) => {
      try {
          const response = await fetch("http://localhost:8001/transactions", {
             method: 'POST',
             headers: {
              'Content-Type' : 'application/json'
             },
             body: JSON.stringify(newTransaction)
          });
          if(response.ok){
                //re render 
                fetchTransaction(); 
          }else {
               console.log('Error adding transaction ' , response.statusText)
          }
      }catch(error) {
        console.error("error adding transaction " , error)
      }
  }

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:8001/transactions/${id}`, {
           method: 'DELETE'
                  });
        if(response.ok){
            setTransactions(transactions.filter((transaction) => transaction.id != id ))               
        }else {
             console.log('Error deleting transaction ' , response.statusText)
        }
    }catch(error) {
      console.error("error deleting transaction " , error)
    }

  
}

//sort function 
const handleSort = (type) => {
   if(sortType === type){
         setSortType(null);
   } else {
    setSortType(type);
    // making a copy of the transactions array to be used for sorting purposes as per the type 
    const sortedTransactions = [...transactions]

    if(type === 'category'){
       sortedTransactions.sort((a,b) => a.category.localeCompare(b.category));
    } else if(type === 'description'){
      sortedTransactions.sort((a,b) => a.description.localeCompare(b.description));
    }
    setTransactions(sortedTransactions)

   }


}


  return (
    <div className="App">
        <Navbar />
        <h2>Bank Of FlatIron</h2>
        <SearchBar onSearch={handleSearch} />
        <br></br>
        <button style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort(null)}>Clear Sort</button>
        <button  style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort('category')}>Sort by Category</button>
        <button  style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort('description')}>Sort by Description</button>
        <TransactionTable transactions={filteredTransactions} onDelete={handleDelete} onEdit={handleEdit}/>
        <AddTransactionForm onAdd={addTransaction}/>
        <About />
        {isEditFormVisible && (
          <EditedTransactionForm
          editedTransaction={editedTransaction}
          fetchTransaction={fetchTransaction}
          setIsEditFormVisible={setIsEditFormVisible}
        />

        )}
    </div>
  );
}

export default App;
