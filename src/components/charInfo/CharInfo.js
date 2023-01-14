import { useEffect , useState} from 'react';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { useMarvelService } from '../../service/MarvelService/useMarvelService';
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/spiner';

const CharInfo = ({chousenCharId}) => {
    const [charData, setCharData] = useState(null);
    const {loading, error, getCharecter} = useMarvelService() ;

    const getNewChar = () => {
        if(chousenCharId != null){
            getCharecter(chousenCharId)
                                        .then((char) => setCharData(char))
        }
    }

     useEffect(() => {
        getNewChar();
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