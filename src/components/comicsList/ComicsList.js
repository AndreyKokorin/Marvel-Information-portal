import './comicsList.scss';
import { useMarvelService } from '../../service/MarvelService/useMarvelService';
import { useState, useEffect, useCallback} from 'react';
import Spinner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
const ComicsList = () => {
    const [offset, setOffset] = useState(0);
    const [comics, setComics] = useState([])

    const {getComics, loading, error} = useMarvelService();

    function getNewComics(offset){
        getComics(offset)
                            .then(res =>{setComics([...comics, ...res])} );   
        setOffset(prev => prev + 8)
    }

    useEffect(()=>{
        getNewComics(offset);
    }, [])

    function getCommiscList(comiscData){
       return comiscData.map((item) => {
            return (
                <ItemComics data={item} key={item.id}/>
            )
       })
    }

   const comicsList = getCommiscList(comics);

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsList}
                  {loading ? <Spinner/>:null}
                {error ? <ErrorMessage/>: null}  
            </ul>
            <button className="button button__main button__long" onClick={() => getNewComics(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

function ItemComics({data}){
    const {url, img, title, price} = data


    return (
        <li className="comics__item">
        <a href={url}>
            <img src={img} alt={title} className="comics__item-img"/>
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{(+price.slice(0, 1) !== 0) ? price : "not for sale"}</div>
        </a>
    </li>
    )
}

export default ComicsList;