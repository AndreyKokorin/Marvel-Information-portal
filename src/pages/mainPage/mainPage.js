import { useState } from "react";
import RandomChar from "../../components/randomChar/RandomChar";
import CharInfo from "../../components/charInfo/CharInfo";
import CharList from "../../components/charList/CharList";
import decoration from '../../resources/img/vision.png';

function MainPage(){
    const [chosenCharId, setChosenCharId] = useState(null)
    return (
        <>
        <RandomChar/>

        <div className="char__content">
            <CharList onChoseCharID={setChosenCharId}/>
            <CharInfo chousenCharId={chosenCharId}/>                                                        
        </div>                        

         <img className="bg-decoration" src={decoration} alt="vision"/>                                               
        </>
        
    )
}

export default MainPage