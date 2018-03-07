import React from 'react';
import rp from 'request-promise';
import Movie from './Movie';
import './MovieList.css';
const thing = {
    '1': 'tt4458206',
    '2': 'tt4009460',
    '3': 'tt0270846',
    '4': 'tt0421051',
    '5': 'tt0060666',
    '6': 'tt0417056',
    '7': 'tt0249516',
    '8': 'tt0808240',
    '9': 'tt1309000',
    '10': 'tt1316037',
    '11': 'tt0330994',
    '12': 'tt2071491',
    '13': 'tt0463392',
    '14': 'tt0470833',
    '15': 'tt1213644',
    '16': 'tt4404474',
    '17': 'tt0473310',
    '18': 'tt0830861',
    '19': 'tt0804492',
    '20': 'tt0339034',
};

// {
//     Poster
//         :
//         "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//     Ratings
//         :
//         [{}, {value: '98%'}, {}],
//     Title
//         :
//         "The Godfather"
// }
class MovieList extends React.Component {
    state = {
        movies: [],
    };
    componentDidMount() {
        for (let i = 1; i <= 20; i++) {
            const options = {
                uri: `http://www.omdbapi.com/?i=${thing[i]}`,
                qs: {
                    apikey: 'd97400b0',
                },
                headers: {
                    'User-Agent': 'Request-Promise',
                },
                json: true,
            };
            rp(options)
                .then(res => {
                    let inter = this.state.movies;
                    inter.push(res);
                    this.setState({ movies: inter });
                })
                .catch(err => {});
        }
    }
    render() {
        return (
            <div>
                <h1>Pick a movie:</h1>
                <div className="MoviesList">
                    {this.state.movies.length > 0 ? (
                        this.state.movies.map((movie, i) => {
                            console.log(movie);
                            return (
                                <Movie
                                    key={movie.imdbID}
                                    id={movie.imdbID}
                                    title={movie.Title}
                                    rating={movie.Ratings[0].Value}
                                    posterURL={movie.Poster}
                                />
                            );
                        })
                    ) : (
                        <div className="loading">Loading...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default MovieList;
