import { useEffect , useState} from 'react';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import RequestMarvelApi from '../marvelApi/MarvelApi';
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/spiner';

const CharInfo = ({chousenCharId}) => {
    const [charData, setCharData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

   const requestApi = new RequestMarvelApi();
    
     useEffect(() => {
         async function fetchData(){
            setLoading(true)
            await requestApi.getCharecter(chousenCharId)
                    .then(res => res.json())
                    .then(res => {
                        setCharData(requestApi.transformData(res.data.results));
                        setLoading(false);
                    })
                    .catch(() => {
                        setError(true);
                        setLoading(false);
                    })
        }
        if(chousenCharId != null){
            fetchData();
        }
    }, [chousenCharId]) 


    
    return (
        <div className="char__info">
        {(loading || charData || error) ? null : <Skeleton/>}
        {error ? <ErrorMessage/>:null}
        {loading ? <Spinner/>:null}
        {!(loading || error || !(charData!==null)) ? <CharInfoItem charData={charData[0]}/>: null}
                                                    
        </div>
    )
}   

function CharInfoItem({charData}){

    const {img, homepage, wiki, description, comics, name} = charData;

      const comicsList = comics.map((item) => {
        return (
                <li className="char__comics-item">
                    {item.name}
                </li>
        )
    })  

    return (
        <>
            <div className="char__basics">
                    <img src={img} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                     {comicsList} 
                </ul>
            </>
    )
}

export default CharInfo;