import { useNavigate } from "react-router";

interface ICategoriesCardProps {
    id:string,
    image:string,
    title:string,
    description:string,
    horiz:boolean,
    index:number
}

export const CategoriesCard = ({id, image, title, description, horiz, index }:ICategoriesCardProps) => {
    const navigate = useNavigate()
    const goToCategory = () => navigate(`/search?etiquetas=${id}`)

    const posicion = horiz ? `lg:col-span-2 lg:row-start-${index} lg:col-start-2` : `lg:row-span-2 lg:col-start-${index+1} lg:row-start-1`
    
    return (
      <button className={`${posicion} rounded-lg shadow-lg border-[1.5px] border-slate-400 p-4 flex lg:flex-${horiz ?'row':'col'} gap-4`}
        onClick={() => goToCategory()}>
        <div className={!horiz ? 'w-full':'w-full lg:w-1/2'}>
          <img
            src={image}
            className='w-full h-[180px] object-cover rounded-lg'
            alt={title}
          />
        </div>
        <div className="w-full">
          <h2 className='  sm:text-md md:text-xl lg:text-2xl xl:text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark'>{title}</h2>
          <hr className="mb-3"/>
          <p className='line-clamp-6'>{description}</p>
        </div>
      </button>
    );
  };