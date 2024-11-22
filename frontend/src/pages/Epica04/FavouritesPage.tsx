import { Helmet } from 'react-helmet-async';

import { CardFavourite } from "../../components/Epica04/CardFavourite";


export const FavouritesPage = () => {

  return (
    <>
      <Helmet>
        <title>Favoritos</title>
      </Helmet>

      <div className='my-3 py-2 px-12 space-y-4'>
        <div className='text-4xl font-sans items-center'>
          <span>Productos que te gustan</span>
        </div>
        <div className='flex items-center py-2 px-0'>
            <p className='text-base'>Aquí puedes encontrar todos tus productos favoritos.</p>
          
        </div>
        <div className='flex flex-wrap items-center justify-center gap-11 p-3'>
          {
            Array.from({ length: 6 }).map((_, index) => (
              <CardFavourite key={index} />
            ))
          }
        </div>
      </div>
    </>
  )
}
