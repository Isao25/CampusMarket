import { Plan } from "../types";

export const mockPlanes: Plan[] = [
    {
      id: 1,
      nombre: "Básico",
      descripcion: "Plan ideal para estudiantes con necesidades mínimas de almacenamiento.",
      espacio_extra: 10, // GB
      duracion: 30, // días
      precio: 9.99, // USD
      beneficios: [
        "Acceso básico a recursos",
        "Soporte técnico limitado",
        "Sin anuncios",
      ],
    },
    {
      id: 2,
      nombre: "Premium",
      descripcion: "Un plan diseñado para quienes necesitan más espacio y ventajas exclusivas.",
      espacio_extra: 50, // GB
      duracion: 90, // días
      precio: 24.99, // USD
      beneficios: [
        "Mayor espacio de almacenamiento",
        "Soporte técnico prioritario",
        "Acceso exclusivo a contenido adicional",
        "Sin anuncios",
      ],
    },
    {
      id: 3,
      nombre: "Pro",
      descripcion: "El plan más completo para usuarios avanzados o profesionales.",
      espacio_extra: 200, // GB
      duracion: 365, // días
      precio: 99.99, // USD
      beneficios: [
        "Espacio de almacenamiento ampliado",
        "Soporte técnico 24/7",
        "Acceso a todas las herramientas premium",
        "Actualizaciones y mejoras exclusivas",
        "Prioridad en soporte y feedback",
      ],
    },
  ];