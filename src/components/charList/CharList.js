import { useState, useEffect } from 'react';
import './charList.scss';

import RequestMarvelApi from '../marvelApi/MarvelApi';
import Spinner from "../spiner/spiner";
import ErrorMessage from "../errorMessage/ErrorMessage"

const CharList = ({onChoseCharID}) => {
    const [charecters, setCharecters] = useState([]);
    const [limitChar, setLimitChar] = useState(6);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    
    const requestApi = new RequestMarvelApi();
    
    function onGetMoreChars(){
        setLimitChar(prev => prev + 3)
    }

    async function fetchChars (){
        requestApi.getCharecters(limitChar)
            .then((res) => {
                setLoading(false);
                return res.json()
            })
            .then((res) => setCharecters(requestApi.transformData(res.data.results)))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }

   useEffect( () => {
    setLoading(true);
    fetchChars();
    },[limitChar])

    const charList = charecters.map((item,i) =>{
        return <CharItem char={item} onChoseCharID={onChoseCharID} key={i}/>
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
                onClick={() => onGetMoreChars()}
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