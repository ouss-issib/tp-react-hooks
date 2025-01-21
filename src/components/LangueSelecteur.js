import { useContext } from "react";
import { LanguageContext, ThemeContext } from "../App";



const LangueSelecteur = () => {

    const langues = ['en', 'fr', 'ar'];
    const { langue, setLangue } = useContext(LanguageContext);
    const { isDarkTheme } = useContext(ThemeContext);

    const handleChange = (e) => {
        console.log(e.target.value);

        setLangue(e.target.value);
    }


    return (

        <select style={{ maxWidth: '200px', float: "left" }} value={langue} className={`form-select  ${isDarkTheme
            ? 'bg-dark text-light border border-light'
            : 'bg-light text-dark border border-dark'
            }`} aria-label="select example" onChange={handleChange}>
            {langues.map((langueItem, index) => (
                <option key={langueItem} value={langueItem}>
                    {langueItem === 'en' ? "English" : langueItem === 'fr' ? "Français" : "العربية"}
                </option>
            ))}
        </select>


    );
}

export default LangueSelecteur;