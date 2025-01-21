import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LangueSelecteur from './components/LangueSelecteur';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();

export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const [langue, setLangue] = useState('en');

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider value={{ langue, setLangue }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">
              {langue === 'fr' ? "Catalogue de Produits" : langue == "ar" ? "كتالوج المنتجات" : "Product Catalog"}
            </h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LangueSelecteur />
            </div>
          </header>
          <main>
            <ProductSearch setSearchTerm={setSearchTerm} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>

  );
};

export default App
