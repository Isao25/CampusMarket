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

    const posicion = horiz ? `col-span-2 row-start-${index} col-start-2` : `row-span-2 col-start-${index+1} row-start-1`
    
    return (
      <button className={`${posicion} rounded-lg shadow-lg border-[1.5px] border-slate-400 p-4 flex flex-${horiz ?'row':'col'} gap-4`}
        onClick={() => goToCategory()}>
        <div className={!horiz ? 'w-full':'w-1/2'}>
          <img
            src={image}
            className='w-full h-[180px] object-cover rounded-lg'
            alt={title}
          />
        </div>
        <div >
          <h2 className='text-left truncate text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark'>{title}</h2>
          <hr className="mb-3"/>
          <p className='line-clamp-6'>{description}</p>
        </div>
      </button>
    );
  };