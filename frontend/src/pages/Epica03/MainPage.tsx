import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CategoriesCard, SellersCard } from '../../components/cards';
import { categories, distinguishedSellers, mockProducts, images } from '../../mocks/mainPage-mocks';
import { ProductCard } from '../../components/cards/product-card';
import { LoginModal } from '@/components/Epica5/LoginModal';
import { useTrademark } from '@/hooks/useTrademark';




export const MainPage = () => {
  const navigate = useNavigate();
  const{marca,membresia,plan}=useTrademark();

  

  console.log({ marca: marca, membresia: membresia, plan: plan });

  // const mockProducts = [
  //   {
  //     id: 1,
  //     code: 'P001',
  //     nombre: 'Producto 1',
  //     precio: 100,
  //     qualification: 4.5,
  //     img: 'https://via.placeholder.com/150',
  //   },
  //   {
  //     id: 2,
  //     code: 'P002',
  //     nombre: 'Producto 2',
  //     precio: 200,
  //     qualification: 4.0,
  //     img: 'https://via.placeholder.com/150',
  //   },
  //   {
  //     id: 3,
  //     code: 'P003',
  //     nombre: 'Producto 3',
  //     precio: 300,
  //     qualification: 4.8,
  //     img: 'https://via.placeholder.com/150',
  //   },
  //   {
  //     id: 4,
  //     code: 'P004',
  //     nombre: 'Producto 4',
  //     precio: 400,
  //     qualification: 4.2,
  //     img: 'https://via.placeholder.com/150',
  //   },
  // ];


  return (
    <>
      <Helmet>
        <title>CampusMarket</title>
      </Helmet>

      <div className="container w-full mx-auto">
        <div className="my-8">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((i, index) => (
                <CarouselItem>
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-lg max-h-[500px]"
                  >
                    <img
                      key={i.alt}
                      src={i.src}
                      alt={i.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className=" justify-center mx-auto max-w-[1350px] px-8 ">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="mb-12 mt-4 mx-auto px-20">
              {mockProducts.map((p) => (
                <CarouselItem
                  key={`ci-${p.id}`}
                  className="basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                >
                  <ProductCard
                    key={p.id}
                    id={Number(p.id)}
                    name={p.name}
                    price={p.price}
                    qualification={p.qualification}
                    img="image-card.jpg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block ">
              <CarouselPrevious className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
              <CarouselNext className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
            </div>
          </Carousel>
        </div>

        <div className="mx-auto w-full p-4">
          <div className=" mb-5 ">
            <h2 className="text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark ">
              Elige tu categoría favorita
            </h2>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-4 px-24">
            {categories.map((category, index) => (
              <CategoriesCard
                id={category.id.toString()}
                key={`cc-${index}`}
                image={category.image}
                title={category.title}
                description={category.description}
                horiz={category.horiz}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="mx-auto mb-10">
          <div className="mt-8 mb-5">
            <h2 className="text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark ">
              Conoce a nuestro vendedores destacados
            </h2>
          </div>
          <div className="mt-3 relative">
            <Carousel
              opts={{
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent className="mb-24 mx-2">
                {distinguishedSellers.map((seller, index) => (
                  <>
                    <CarouselItem
                      key={`ci-${index}`}
                      className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/5"
                    >
                      <SellersCard
                        key={`sc-${index}`}
                        id={seller.id}
                        name={seller.name}
                        description={seller.description}
                        imageAlt={seller.imageAlt}
                        imageSrc={seller.imageSrc}
                      />
                    </CarouselItem>
                  </>
                ))}
              </CarouselContent>
              <div className="absolute bottom-8  left-1/2 transform -translate-x-1/3 flex space-x-10 ">
                <CarouselPrevious className="bg-[#B7B7B7]" />
                <CarouselNext className="bg-[#B7B7B7]  " />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col my-8">
          <div>
            <h3 className="text-center text-xl font-black mb-2 text-secondaryLight dark:text-secondaryDark">
              VAMOS
            </h3>
            <h2 className="text-center text-4xl font-black mb-2 text-terciaryLight dark:text-terciaryDark ">
              ¿Listo para que todos en la universidad conozca tu marca?
            </h2>
            <h3 className="text-center text-xl font-semibold text-terciaryLight dark:text-terciaryDark">
              ¡Hazla destacar y empieza a vender hoy mismo!
            </h3>
          </div>
          <div className="mt-8 py-4 mx-auto">
            <button className="w-[200px] h-[45px] rounded-lg text-lg shadow-xl bg-secondaryLight hover:bg-secondaryLightHovered text-white">
              Iniciar
            </button>
          </div>
        </div>
      </div>
      <LoginModal />
    </>
  );
}
