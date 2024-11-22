import { Helmet } from 'react-helmet-async';
import { Checkbox } from '../../components/ui/checkbox';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { PaginationComp } from '../../components/Epica03/paginationComponent';
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Facultad, getAllFacultades } from '../../api/apiFacultades';



export const SearchSellers = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState('')

  const handleSearch = () => {
    if (sellerName) {
      navigate(`/sellers?nombre=${encodeURIComponent(sellerName)}`);
    } else {
      navigate("/sellers"); 
    }
  };

  const [items, setItems] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isInitialized, setIsInitialized] = useState(false);
  const [facultades, setFacultades] = useState<Facultad[]>([])
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFacus = async () => {
      try {
        const data1 = await getAllFacultades(1)
        const data2 = await getAllFacultades(2)
        const facultadesT = [...data1.data.results, ...data2.data.results]

        setFacultades(facultadesT)

      } catch (error) {
        throw error
      }
    }
    fetchFacus()
  }, [])

  const displayedFacultades = showAll ? facultades : facultades.slice(0, 10);
  
  const defaultFilters = {
    name: "",
    facultades: [] as string[],
  };
  const [filters, setFilters] = useState(defaultFilters);
  
  const apiUrl = "http://localhost:8000/usuarios/?tiene_marca=true";
  
  // Cambiar página
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());
    navigate(`?${searchParams.toString()}`);
  };
  
  // Cambiar elementos por página
  const handleLimitChange = (newLimit: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", "1"); 
    searchParams.set("limit", newLimit.toString());
    
    navigate(`?${searchParams.toString()}`);
    setItemsPerPage(newLimit);
  };
  
  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
    navigate("?");
  };
  
  // Manejar cambios en los filtros
  const handleCheckboxChange = (value: string) => {
    setFilters((prevFilters) => {
      const updated = { ...prevFilters };
      updated.facultades = prevFilters.facultades.includes(value)
        ? prevFilters.facultades.filter((item) => item !== value)
        : [...prevFilters.facultades, value];
  
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("facultades");
      updated.facultades.forEach((fac) => searchParams.append("facultades", fac));
      searchParams.set("page", "1"); // Reinicia a la primera página
      navigate(`?${searchParams.toString()}`);
  
      return updated;
    });
  };
  
   // Construcción de la URL de la API
   const constructApiUrl = () => {
    const queryParams = new URLSearchParams();
  
    if (currentPage > 1) queryParams.append("page", currentPage.toString());
    queryParams.append("limit", itemsPerPage.toString());
  
    if (filters.name) queryParams.append("nombre", filters.name);
    if (filters.facultades.length > 0) {
      queryParams.append("facultades", filters.facultades.join(","));
    }
  
    return `${apiUrl}?${queryParams.toString()}`;
  };
  
  // Actualización de datos desde la API
  const fetchData = async () => {
    try {
      const response = await axios.get(constructApiUrl());
      setItems(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } 
  };
  
  // Actualizar URL con filtros actuales
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
  
    const name = searchParams.get("nombre") || "";
    const facultades = searchParams.getAll("facultades");
    const pageFromUrl = Number(searchParams.get("page") || "1");
    const limitFromUrl = Number(searchParams.get("limit") || "10");
  
    const newFilters = {
      name,
      facultades,
    };
  
    // Actualiza los estados con los valores desde la URL
    setFilters(newFilters);
    setCurrentPage(pageFromUrl > 0 ? pageFromUrl : 1);
    setItemsPerPage(limitFromUrl);
  
    // Marca como inicializado
    setIsInitialized(true);
  }, [location.search]);


  useEffect(() => {
    if (isInitialized) {
      fetchData();
    }
  }, [isInitialized, filters, currentPage, itemsPerPage]);

  return(
    <>
      <Helmet>
        <title>Vendedores - EzCommerce</title>
      </Helmet>
      <section className="w-full mx-auto mt-8">
      <div className="bg-gradient-to-b from-[#00366926] to-white rounded-lg px-6 pt-8 pb-2 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondaryLight">
            Vendedores estudiantiles
          </h2>
          <p className="text-slate-600">
            Descubre los productos que ofrecen estos estudiantes.
          </p>
          <p className="text-slate-600">
            Apoya a los universitarios emprendedores mientras impulsas sus sueños y
            proyectos.
          </p>
        </div>
      </div>
    </section>
    <div className='w-full mx-auto px-6  mt-10 mb-8'>
        <div className="relative max-w-4xl  mx-auto ">
            <Input
            className="pr-9 bg-slate-50"
            placeholder="Buscar..."
            type="search"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
    </div>
      <div className="w-full gap-4 flex flex-row min-h-96 mt-4 mb-10 ">
        <div className="w-[300px] border rounded border-slate-300 p-8">
          <h3 className="font-bold text-xl text-secondaryLight mb-4">Filtros</h3>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Facultades</h3>
            {displayedFacultades.map((fac) => (
              <div key={fac.codigo} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={fac.codigo.toString()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(fac.siglas)}
                  checked={filters.facultades.includes(fac.siglas)}
                />
                <label htmlFor={fac.siglas} className="text-md font-medium leading-none">
                  {fac.siglas}
                </label>
              </div>
            ))}
            {facultades.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 text-secondaryLight font-medium "
              >
                {showAll ? 'Mostrar menos' : 'Mostrar más'}
              </button>
            )}
          </div>
            
            <div className='flex flex-row gap-4 justify-center'>
              <button
                onClick={handleClearFilters}
                className='mt-4 px-1 py-2 bg-red-500 text-sm text-white rounded-lg'
              >
                Limpiar filtro
              </button>
            </div>
          </div>
        <div className="flex flex-col grow border rounded border-slate-300 p-4">
          <div className='grow'>

          </div>
          <div className='flex flex-row justify-between mt-4 '>
            <div className='flex'>
              <div className='mr-3 pt-1'>
                <h3 className="text-lg font-semibold mb-2">Items por página:</h3>
              </div>
              <div className="flex items-center gap-4 mr-8">
                <div className="relative">
                  <select
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    value={itemsPerPage}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='mr-8 pt-1'>
              <PaginationComp
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
              />
            </div>
          </div>
        </div>
    </div>
    </>
  )
};
