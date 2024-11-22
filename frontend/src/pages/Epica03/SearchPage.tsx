import { Helmet } from 'react-helmet-async';
import { Checkbox } from '../../components/ui/checkbox';
import { Slider } from '../../components/ui/slider';
import { useLocation, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { PaginationComp } from '../../components/Epica03/paginationComponent';
import axios from 'axios'
import { EtiquetasContext } from '../../context/EtiquetasContext';
import { ProductCard } from '../../components/cards/product-card';
import { Articulo } from '../../api/apiArticulos';
import { Facultad, getAllFacultades } from '../../api/apiFacultades';


export const SearchPage = () => {
  const { etiquetasList, setLoadingPage } = useContext(EtiquetasContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState<Articulo[]>([]);
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
    categorias: [] as number[],
    facultades: [] as string[],
    min: 0,
    max: 500,
  };
  const [filters, setFilters] = useState(defaultFilters);

  const apiUrl = "http://localhost:8000/articulos";

  // Construcción de la URL de la API
  const constructApiUrl = () => {
    const queryParams = new URLSearchParams();
    if (currentPage > 1) queryParams.append("page", currentPage.toString());
    queryParams.append("limit", itemsPerPage.toString());

    if (filters.name) queryParams.append("nombre", filters.name);
    filters.categorias.forEach((cat) => queryParams.append("etiquetas", cat.toString()));
    if (filters.facultades.length > 0) {
      queryParams.append("facultades", filters.facultades.join(","));
    }
    if (filters.min) queryParams.append("precio_min", filters.min.toString());
    if (filters.max) queryParams.append("precio_max", filters.max.toString());

    return `${apiUrl}?${queryParams.toString()}`;
  };

  // Actualización de datos desde la API
  const fetchData = async () => {
    setLoadingPage(true);
    try {
      const response = await axios.get(constructApiUrl());
      setItems(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoadingPage(false);
    }
  };


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
  const handleCheckboxChange = (
    value: number | string,
    type: "categorias" | "facultades"
  ) => {
    setFilters((prevFilters) => {
      const updated = { ...prevFilters };

      // Actualiza las categorías o facultades según el tipo y valor
      if (type === "categorias" && typeof value === "number") {
        updated.categorias = prevFilters.categorias.includes(value)
          ? prevFilters.categorias.filter((item) => item !== value)
          : [...prevFilters.categorias, value];
      } else if (type === "facultades" && typeof value === "string") {
        updated.facultades = prevFilters.facultades.includes(value)
          ? prevFilters.facultades.filter((item) => item !== value)
          : [...prevFilters.facultades, value];
      }

      // Construye los parámetros de búsqueda actualizados
      const searchParams = new URLSearchParams();
      searchParams.set("page", "1"); // Reinicia a la primera página
      searchParams.set("limit", itemsPerPage.toString());

      if (filters.name) searchParams.set("nombre", filters.name);
      updated.categorias.forEach((cat) => searchParams.append("etiquetas", cat.toString()));
      updated.facultades.forEach((fac) => searchParams.append("facultades", fac));
      if (filters.min) searchParams.set("precio_min", filters.min.toString());
      if (filters.max) searchParams.set("precio_max", filters.max.toString());

      // Navega con los nuevos parámetros
      navigate(`?${searchParams.toString()}`);

      return updated;
    });
  };

  // Leer filtros desde la URL al cargar o cambiar la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Actualiza los filtros desde la URL
    const newFilters = {
      name: searchParams.get("nombre") || "",
      categorias: searchParams.getAll("etiquetas").map(Number), // Convierte etiquetas a números
      facultades: searchParams.getAll("facultades"), // Facultades como strings
      min: Number(searchParams.get("precio_min") || "0"), // Precio mínimo
      max: Number(searchParams.get("precio_max") || "500"), // Precio máximo
    };

    // Establece los filtros, página y límite desde la URL
    setFilters(newFilters);
    setCurrentPage(Number(searchParams.get("page") || "1"));
    setItemsPerPage(Number(searchParams.get("limit") || "10"));

    // Llama a la API para obtener los datos
    setIsInitialized(true);
  }, [location.search]);

  // Actualiza la URL cada vez que cambian los filtros, página o límite
  useEffect(() => {
    if (isInitialized) {
      fetchData();
    }
  }, [isInitialized, filters, currentPage, itemsPerPage]);

  return (
    <>
      <Helmet>
        <title>Search - EzCommerce</title>
      </Helmet>

      <div className="w-full gap-4 flex flex-row min-h-96 my-10 ">
        <div className="w-[300px] border rounded border-slate-300 p-8">
          <h3 className="font-bold text-xl text-secondaryLight mb-4">Filtros</h3>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Categorias</h3>
            {Array.isArray(etiquetasList) && etiquetasList.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={cat.id.toString()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(cat.id, 'categorias')}
                  checked={filters.categorias.includes(cat.id)}
                />
                <label htmlFor={cat.id.toString()} className="text-md font-medium leading-none">
                  {cat.nombre}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Facultades</h3>
            {displayedFacultades.map((fac) => (
              <div key={fac.codigo} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={fac.codigo.toString()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(fac.siglas, 'facultades')}
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

          <div className="flex flex-col mb-4 gap-4">
            <h3 className="font-bold text-xl">Precio</h3>
            <div>
              <h3 className="text-md mb-2">Desde: S/. {filters.min}</h3>
              <Slider
                min={1}
                max={500}
                step={1}
                value={[filters.min]}
                onValueChange={([value]) => setFilters((prev) => ({ ...prev, min: value }))}
              />
            </div>
            <div>
              <h3 className="text-md mb-2">Hasta: S/. {filters.max}</h3>
              <Slider
                min={1}
                max={500}
                step={1}
                value={[filters.max]}
                onValueChange={([value]) => setFilters((prev) => ({ ...prev, max: Math.max(value, prev.min) }))}
              />
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

        </div>

        <div className="flex flex-col grow border rounded border-slate-300 p-4">
          <div className='flex flex-row justify-between mb-4'>
            <div>
              {filters.name && (
                <h3>{items ? items.length : 0} resultados para "{filters.name}"</h3>
              )}
            </div>
            <div className='mr-8'>
              <PaginationComp
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-4'>
            {items ? items.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.nombre} price={p.precio} qualification={4} img={''} />
            )) : null}
          </div>
          <div className='mt-auto flex flex-row justify-between'>
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
  );

};
