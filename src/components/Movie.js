const Movie = (props) => {
  return (
    <div className="movie">
      <img src={props.Poster} alt={props.Title} />
      <h2>
        {props.Title} ({props.Year})
      </h2>
    </div>
  );
};

export default Movie;
