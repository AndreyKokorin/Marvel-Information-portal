import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../../pages/comicsPage/ComicsPage";
import MainPage from "../../pages/mainPage/mainPage";
import LoyoutPage from "../../pages/loyoutPage/LoyoutPage";
import{Routes, Route} from "react-router-dom"

const App = () => {

    return (
                <Routes>
                    <Route path="/" element={<LoyoutPage/>}>
                        <Route index element={<MainPage/>}/>                
                        <Route path="comics" element={<ComicsPage/>}/>                
                    </Route>            
                </Routes>                        
    )            
}

export default App;