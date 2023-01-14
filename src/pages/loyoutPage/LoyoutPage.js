import AppHeader from "../../components/appHeader/AppHeader";
import { Outlet } from "react-router-dom";


function LoyoutPage (){
    return (
        <div className="app">
                    <AppHeader/>
                    <main>
                        <Outlet/>
                    </main>
        </div>
    )
}

export default LoyoutPage;