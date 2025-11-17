import { useState, useEffect } from 'react';

export const useFetch = (resource) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:1880/iot/personal/${resource}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(resource);
  }, [resource]);

  const post = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:1880/iot/personal/${resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        // Si la respuesta no es OK, intentamos leer el cuerpo del error
        const errorBody = await response.text();
        throw new Error(`Error ${response.status}: ${errorBody || 'Network response was not ok'}`);
      }

      const result = await response.json();
      setData(result); // Opcional: actualiza el estado `data` con la respuesta del POST
      return result;
    } catch (err) {
      setError(err);
      throw err; // Lanzamos el error para que el componente que llama pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post};
};
