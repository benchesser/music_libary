import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';


function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
      if(search){
        document.title = `${search} Music`
        fetch(API_URL + search)
        .then(res => res.json())
        .then(resData => {
          if(resData.results.length > 0) {
            setData(resData.results)
          } else {
            setMessage('No results found!')
          }
        })
      }
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch}/>
      {message}
      <Gallery data={data}/>
    </div>
  )
}

export default App;

// const fetchData = async () => {
//   document.title = `${search} Music`
//   const response = await fetch('https://itunes.apple.com/search?term=the%20grateful%20dead')
//   const resData = await response.json()
//   console.log(resData)
