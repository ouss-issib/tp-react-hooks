import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);
  return debouncedValue;
}

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
export const useLocaleStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


const useProductSearch = (searchTerm, limit = 5) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchProducts = async () => {
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const skip = (currentPage - 1) * limit;
      const response = await fetch(`https://api.daaif.net/products/search?q=${searchTerm}&skip=${skip}&limit=${limit}&delay=1000`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, currentPage, limit]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reload = () => {
    setLoading(true);
    fetchProducts();
  };

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const previousPage = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reload,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    previousPage, nextPage, currentPage, totalPages
  };
};

export default useProductSearch;