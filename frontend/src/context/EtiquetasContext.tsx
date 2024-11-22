import { ReactNode, useState, useEffect } from "react"
import { Context, createContext } from "react"
import { Etiqueta, getEtiquetas } from "../api/apiEtiquetas"

interface ContextType{
    etiquetasList: Etiqueta[],
    setEtiquetasList: React.Dispatch<React.SetStateAction<Etiqueta[]>>,
    loadingEtiquetas:boolean
    loadingPage:boolean
    setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  export const EtiquetasContext: Context<ContextType> = createContext<ContextType>({
    etiquetasList: [],
    setEtiquetasList: () => {},
    loadingEtiquetas: true,
    loadingPage: true,
    setLoadingPage: () => {}
  }) 
  
  export const EtiquetasProvider = ({ children }: {children: ReactNode}) => {
    const [ etiquetasList, setEtiquetasList] = useState<Etiqueta[]>([])
    const [loadingEtiquetas, setLoadingEtiquetas] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true)
  
    useEffect(() => {
      
      const fetchEtiquetas = async () =>{
        try {
            const etiquetasData = await getEtiquetas();
            setEtiquetasList(etiquetasData.data.results)
        } catch (error) {
          console.error('Failed to fetch etiquetas', error)
        }finally{
          setLoadingEtiquetas(false)
        }
      }
  
      fetchEtiquetas() 
    },[])
  
    return(
      <EtiquetasContext.Provider value={{etiquetasList, setEtiquetasList, loadingEtiquetas, setLoadingPage, loadingPage}}>
        {children}
      </EtiquetasContext.Provider>
    )
   
  }
  