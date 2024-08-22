import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [movieYear, setMovieYear] = useState();
  const [movieImdb, setMovieImdb] = useState();
  const [movieList, setMovieList] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/api/select').then((response) => {
      setMovieList(response.data);
      
    });
  }, []);

  const addMovie = () => {
    axios.post('http://localhost:3001/api/insert', {
      moviename: movieName,
      director: director,
      year: movieYear,
      imdb: movieImdb
    });
      setMovieList([...movieList, {
        moviename: movieName,
        director: director,
        year: movieYear,
        imdb: movieImdb
      }]);
    setMovieName("");
    setDirector("");
    setMovieYear("");
    setMovieImdb("");
  }

  const DeleteMovie = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  return (
    <div className="App">
      <h1>Movie Information</h1>
      <div className='movieContainer'>
      <div className="movieCard">
        <div className="inputs">
          <input
          value={movieName}
           type="text" 
           placeholder="Enter movie name"
           onChange={(e) => {setMovieName(e.target.value)}} />
          <input
          value={director} 
          type="text" 
          placeholder="Enter movie Director"
          onChange={(e) => {setDirector(e.target.value)}}/>
          <input
          value={movieYear} 
          type="number" 
          placeholder="Enter movie year"
          onChange={(e) => {setMovieYear(e.target.value)}}/>
          <input
          value={movieImdb}
          type="number" 
          placeholder="Enter movie imdb"
          onChange={(e) => {setMovieImdb(e.target.value)}}/>
        </div>
        <button onClick={addMovie} className='addBtn' ><span>Add DB</span></button>
      </div>
      <div className='movieList'>
        <table style={{width:"100%"}}>
          <tr>
            <th style={{width:"40%"}}>Novie Name</th>
            <th style={{width:"30%"}}>Novie Director</th>
            <th>Novie Year</th>
            <th>Novie IMDB</th>
            <th>Del</th>
          </tr>
          {movieList.map((value, key) => {
            return (
              <>
              <tr key={key}>
                <td className='mName'>{value.moviename}</td>
                <td className='director'>{value.director}</td>
                <td className='year'>{value.year}</td>
                <td className='imdb'>{value.imdb}</td>
                <td>
                <button
                className='delBtn'
                 onClick={()=>{DeleteMovie(value.moviename)}}>
                <FontAwesomeIcon className="faTrash" icon={faDeleteLeft} />
                </button>
                </td>
              </tr>
              
              </>
            )
          })}
          
        </table>
      </div>
      </div>
    </div>
  );
}

export default App;
