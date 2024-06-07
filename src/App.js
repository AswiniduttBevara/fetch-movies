import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    
  const fetchMovieDataHandler = useCallback(async() => {
    setIsLoading(true);
    try{
      const res = await fetch('https://swapi.py4e.com/api/films');
      // console.log('check=>',res);
    if(!res.ok){
      throw new Error('Something went wrong');
    }

    const data = await res.json();
      
      const transformedData = data.results.map(movieItem => {
        return {
          id : movieItem.episode_id,
          title : movieItem.title,
          openingText : movieItem.opening_crawl,
          releaseDate : movieItem.release_date
        }
      })
      setMovieData(transformedData);
    }catch(err){
      setError(err.message);
    }
    setIsLoading(false);
    
  }, []);

  useEffect(() => {fetchMovieDataHandler()},[fetchMovieDataHandler]);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  let content = <p>No Movies Found</p>;

  if(isLoading){
    content = <p>Loading...</p>;
  }

  if(error){
    content = <p>{error}</p>;
  }

  if(movieData.length > 0) {
    content = <MoviesList movies={movieData} />
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movieData.length > 0 && <MoviesList movies={movieData} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movieData.length === 0 && <p>No Movies Found</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
