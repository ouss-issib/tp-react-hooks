import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const { langue } = useContext(LanguageContext);
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  //SECTION - Begin
  const [searchTerm, setLocalSearchTerm] = useState('');
  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  const debouncedSearchedTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    setSearchTerm(debouncedSearchedTerm);
  }, [debouncedSearchedTerm]);
  //!SECTION - End

  return (
    <div className="mb-4">
      <input
        dir={langue === 'ar' ? 'rtl' : 'ltr'}
        type="text"
        onChange={handleChange}
        placeholder={langue === 'fr' ? 'Rechercher un produit...' : langue == 'ar' ? 'ابحث عن منتج...' : 'Search for a product...'}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;