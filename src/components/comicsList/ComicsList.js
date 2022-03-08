import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

import './comicsList.scss';

const ComicsList = () => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService();


   useEffect(() => {
    onRequest(offset, true)
  }, [])


  const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true)

      getAllComics(offset)
     .then(onCharListLoaded)
   }

  const onCharListLoaded = (newCharList) => {
       let ended = false

       if (newCharList.length < 8) {
           ended = true
       }

       setCharList(charList => [...charList, ...newCharList])
       setNewItemLoading(false)
       setOffset(offset => offset + 8)
       setComicsEnded(ended)
   }

   function renderItems(arr) {
    const items =  arr.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }

        return (
            <li key={i} className="comics__item">
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.price}$</div>
                </Link>
           </li>
        )
    });

    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
                {items}

            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display': comicsEnded ? 'none' : 'block'}}>

                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;