import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ProductForm } from '../../components/Epica04/ProductForm';
import { useEffect, useState } from 'react';
import { getArticulo } from '../../api/apiArticulos';
import { Articulo as a } from '../../api/apiArticulos';

export const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productToEdit, setProductToEdit] = useState<a>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getArticulo(Number(productId));
        setProductToEdit(response.data); // Suponiendo que `response.data` contiene el producto
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!productToEdit) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <>
      <Helmet>
        <title>Editar {productToEdit.nombre}</title>
      </Helmet>
      <ProductForm product={productToEdit} />
    </>
  );
};
