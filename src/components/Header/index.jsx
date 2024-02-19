import "./header.css";
import Logo from "../../assets/logo-header.svg"

const Header = () =>{

    return <>
        <div className="header">
            <img src={Logo} alt="Logo"/>
            {/* <h1>idea theorem </h1> 
            <span className="tm-symbol">TM</span> */}
        </div>
    </>
}

export default Header;