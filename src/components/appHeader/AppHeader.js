import './appHeader.scss';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    
    const getActiveLinkClassName = ({isActive}) => isActive ? "activeLink" : "" ;

    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink  to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <div className="app__menu">
                <ul>
                    <li><NavLink  to="/" className={getActiveLinkClassName}>Characters</NavLink></li>
                    /
                    <li><NavLink to="/comics" className={getActiveLinkClassName}>Comics</NavLink></li>
                </ul>
            </div>
        </header>
    )
}

export default AppHeader;