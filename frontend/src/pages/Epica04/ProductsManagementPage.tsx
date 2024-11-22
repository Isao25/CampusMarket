import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ChevronRight } from "lucide-react";

export const ProductsManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>Gestión de productos</title>
      </Helmet>

      <div className='grid grid-cols-1 my-9 pt-2 px-12 space-y-4'>
        <h1 className='font-sans text-4xl text-terciaryLight'>Gestión de ventas</h1>
        <p className='text-lg'>Administra tus ventas desde un solo lugar.<br />
        Revisa tus productos publicados, pedidos pendientes.</p>
        <Button variant='link' className='p-0 font-sans'>
            <Link to='/my-published-products' className='px-4 w-full flex justify-between items-center'>
            Productos publicados
            <ChevronRight className="h-4 w-4" />
            </Link>
        </Button>
        <Button variant='link' className='p-0 font-sans'>
          <Link to='#' className='px-4 w-full flex justify-between items-center'>
            Ventas pendientes
            <ChevronRight className="h-4 w-4 ml-4" />
          </Link>
        </Button>
      </div>
    </>
  )
}
