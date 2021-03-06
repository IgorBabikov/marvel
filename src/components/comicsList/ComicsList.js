import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup  } from 'react-transition-group';
import {useState, useEffect} from 'react';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false)

    const {getAllComics, process, setProcess} = useMarvelService();


   useEffect(() => {
    onRequest(offset, true)
      // eslint-disable-next-line
  }, [])


  const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true)

      getAllComics(offset)
     .then(onCharListLoaded)
     .then(() => setProcess('confirmed'))
   }

  const onCharListLoaded = (newComicsList) => {
       let ended = false

       if (newComicsList.length < 8) {
           ended = true
       }

       setCharList(comicsList => [...comicsList, ...newComicsList])
       setNewItemLoading(false)
       setOffset(offset => offset + 8)
       setComicsEnded(ended)
   }

   const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return  <Component/>
        case 'error':
            return <ErrorMessage/>
            default:
                throw new Error('Unexpected process state')
    }
}

   function renderItems(arr) {
     const items =  arr.map((item, i) => {
        return (
            <CSSTransition key={i} timeout={500} classNames="comics__item">
            <li className="comics__item">
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.price}$</div>
                </Link>
           </li>
            </CSSTransition>
        )
    });



    return (
        <ul className="comics__grid">
            <TransitionGroup component={null}>
               {items}
            </TransitionGroup>
        </ul>
    )
}


    return (
        <div className="comics__list">
          {setContent(process, () => renderItems(comicsList))}

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