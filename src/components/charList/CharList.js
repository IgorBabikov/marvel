import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup  } from 'react-transition-group';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false)
    const {getAllCharacters, process, setProcess} = useMarvelService();


   useEffect(() => {
     onRequest(offset, true)
   }, [])


   const onRequest = (offset, initial) => {
       initial ? setNewItemLoading(false) : setNewItemLoading(true)

      getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
    }

   const onCharListLoaded = (newCharList) => {
        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }


    function renderItems(arr) {
        const {onCharSelected} = props

        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li className="char__item"
                        onClick={() => onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                   </li>
                </CSSTransition>
            )
        });

        return (
                 <ul className="char__grid">
                     <TransitionGroup component={null}>
                       {items}
                     </TransitionGroup>
                 </ul>
        )
    }


    const setContent = (process, Component) => {
        switch (process) {
            case 'waiting':
                return <Spinner/>
                break

            case 'loading':
                return newItemLoading ? <Component/> : <Spinner/>
                break

            case 'confirmed':
                return  <Component/>
                break

            case 'error':
                return <ErrorMessage/>
                break

                default:
                    throw new Error('Unexpected process state')
        }
    }

        return (
            <div className="char__list">
                {setContent(process, () => renderItems(charList))}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => onRequest(offset)}>

                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;