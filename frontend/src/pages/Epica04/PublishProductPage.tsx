import { Helmet } from 'react-helmet-async';
import { ProductForm } from "../../components/Epica04/ProductForm";

export const PublishProductPage = () => {
  return (
    <>
      <Helmet>
        <title>Publicar Producto</title>
      </Helmet>
      <ProductForm />
    </>
  )
}
