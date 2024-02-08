import { useState } from "react"

export default function SearchBar({onSearch}){
  //state to save the inputs text from the input box
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
      //  console.log(event.target.value)
          //capture forms input
         const value = event.target.value;
         setSearchTerm(value)
         //child back to parent communication
         onSearch(searchTerm)

  }

    return (
       <>
       <div className="mb-3 container">
       <label htmlFor="search" className="form-label">
         Search Transactions:
       </label>
       <input
         type="text"
         className="form-control"
         id="search"
         value={searchTerm}
         onChange={handleInputChange}
         placeholder="Type to search..."
       />
     </div>
       </>
    )
}

