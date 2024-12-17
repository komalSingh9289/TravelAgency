import React, { useState } from 'react'

const Searchbar = () => {
    const [search, setSearch] = useState(null);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(search);;
        
    }

  return (
      <div className="max-w-3xl mx-auto my-5">
        <form onSubmit = {handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search destinations, packages..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button
            type="Search"
            className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
  )
}

export default Searchbar