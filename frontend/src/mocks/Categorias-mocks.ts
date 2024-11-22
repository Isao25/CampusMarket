export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

export const categoriasMocks: Categoria[] = [
    {
        id: 1,
        nombre: 'Electrónica',
        descripcion: 'Dispositivos y gadgets electrónicos'
    },
    {
        id: 2,
        nombre: 'Ropa',
        descripcion: 'Vestimenta para todas las edades y géneros'
    },
    {
        id: 3,
        nombre: 'Hogar',
        descripcion: 'Artículos para el hogar y la cocina'
    },
    {
        id: 4,
        nombre: 'Deportes',
        descripcion: 'Equipamiento y ropa deportiva'
    },
    {
        id: 5,
        nombre: 'Libros',
        descripcion: 'Libros de todos los géneros y autores'
    }
];