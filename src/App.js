import './App.css';
import Users from './components/Users';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
function App() {
  const[searchInput,setSearchInput] = useState('');
  
  const handleSearch =((searchInput) => {
    setSearchInput(searchInput)
  })
  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Users searchWord ={searchInput}/>
    </div>
  );
}

export default App;
