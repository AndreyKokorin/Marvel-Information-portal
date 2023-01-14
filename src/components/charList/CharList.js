import { useState, useEffect, useRef } from 'react';
import './charList.scss';

import {useMarvelService} from "../../service/MarvelService/useMarvelService"

import RequestMarvelApi from '../marvelApi/MarvelApi';
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage"

const CharList = ({onChoseCharID}) => {
    const [charecters, setCharecters] = useState([]);
    const [offset, setOffset] = useState(0)
    const {getCharecters, loading, error} = useMarvelService();

    function onGetMoreChars(){
        setOffset(prev => prev + 6)
    }


   useEffect( () => {
    getCharecters(offset).then(Chars => setCharecters(Chars));
    onGetMoreChars();
    },[])

    function loadedNewChars(){
        onGetMoreChars();
        getCharecters(offset).then(newChar => setCharecters(prevChars => [...prevChars, ...newChar]))
    }

    const charList = charecters.map((item,i) =>{
        return <CharItem char={item} onChoseCharID={onChoseCharID} key={item.id}/>
    } );

    return (
        <div className="char__list">
            <ul className="char__grid">                  
                  {charList}
                  {(loading) ? <Spinner/>: null}
                  {(error) ? <ErrorMessage/>: null}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={() => loadedNewChars()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



function CharItem({char,onChoseCharID}){
    const {name, img,id} = char;
    return (
                <li className="char__item" onClick={() => onChoseCharID(id)}>
                    <img src={img} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
    )
}

export default CharList;