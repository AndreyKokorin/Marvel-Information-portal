
import MarvelApi from "../marvelApi/MarvelApi";
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import {useState,useEffect} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spiner/spiner";

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    async function updateChar(){
        setLoading(true);
        const request = new MarvelApi();
        request.getCharecter(request.getRandomCharId())
            .then(res => res.json())
            .then(char => {
                setChar(request.transformData(char.data.results));
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setError(true)
            } )
    }

    useEffect(() => {updateChar()}, [])

    return (
        <div className="randomchar">

            {(error) ? <ErrorMessage/>:null}
            {(loading) ? <Spiner/>: null}
            {!(loading || error || !(char !== null)) ? <View char={char[0]}/> : null}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

function View({char}){
    const {name, img, description, homepage, wiki} = char;
   function validateDescription(descr){
       return (descr.length > 228) ? descr.slice(0, 228) + "..." : descr
   }

    return (

        <div className="randomchar__block">
            <img src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {validateDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default RandomChar;