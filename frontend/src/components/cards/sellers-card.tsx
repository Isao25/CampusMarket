import { useNavigate } from 'react-router'
import  rightArrow  from '../../assets/icons/right-arrow.svg'

export interface ISellersCardProps {
    id:string,
    imageSrc:string,
    imageAlt:string,
    name:string,
    description:string
}

export const SellersCard = (
    {
     id,
     imageSrc,
     imageAlt,
     name,
     description
    }:ISellersCardProps) => {
        const navigate = useNavigate()
        const goToProfile = () => navigate(`/profile-buyer?id=${id}`)

        return(
            <>
                <div className="flex flex-col bg-white shadow-lg rounded-lg max-w-[280px] h-[430px] p-4">
                    <div className="rounded-lg overflow-hidden">
                        <img
                        src={imageSrc}
                        alt={imageAlt}
                        className='w-full h-[200px] object-cover'
                        />
                    </div>
                    <div className="mt-4">
                        <h3 className='text-xl truncate font-bold text-terciaryLight dark:text-terciaryDark'>
                            {name}
                        </h3>
                    </div>
                    <div className="flex mt-1">
                        <div className='w-4/5'>
                            <p className='line-clamp-6'>
                                {description}
                            </p>
                        </div>
                        <div className='justify-items-center pt-3' >
                            <button className='rounded-full bg-[#B7B7B7] bg-opacity-45 p-2'
                                onClick={() => goToProfile()}
                            >
                                <img className='h-7 w-7' src={rightArrow} />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
}

