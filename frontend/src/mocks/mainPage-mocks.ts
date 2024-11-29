import { ISellersCardProps } from "../components/cards/sellers-card";
import TestImage from '../assets/persona_computadora.png'
import BannerPrueba from '../assets/banner_prueba.webp'
import CardPrueba from "../assets/image-card.jpg";
import { IProductCardProps } from "../components/cards/product-card";

export const distinguishedSellers: ISellersCardProps[] = [
    {
        id: '1',
        name: 'Juan Rodriguez',
        description: 'Expert in digital marketing and social media strategies with over 10 years of experience.',
        imageAlt: 'Juan Rodriguez',
        imageSrc: TestImage
    },
    {
        id: '2',
        name: 'Maria Garcia',
        description: 'Designer specializing in sustainable fashion. Her brand promotes eco-friendly materials.',
        imageAlt: 'Maria Garcia',
        imageSrc: TestImage
    },
    {
        id: '3',
        name: 'Carlos Lopez',
        description: 'A highly skilled software engineer focusing on AI development and cloud infrastructure.',
        imageAlt: 'Carlos Lopez',
        imageSrc: TestImage
    },
    {
        id: '4',
        name: 'Ana Martinez',
        description: 'Professional photographer with a passion for capturing landscapes and urban environments.',
        imageAlt: 'Ana Martinez',
        imageSrc: TestImage
    },
    {
        id: '5',
        name: 'Pedro Fernandez',
        description: 'Entrepreneur with a focus on technology startups and innovations in the fintech sector.',
        imageAlt: 'Pedro Fernandez',
        imageSrc: TestImage
    },
    {
        id: '6',
        name: 'Sofia Ramirez',
        description: 'Artisan known for handmade jewelry, blending traditional techniques with modern aesthetics.',
        imageAlt: 'Sofia Ramirez',
        imageSrc: TestImage
    },
    {
        id: '7',
        name: 'Luis Perez',
        description: 'Freelance writer specializing in travel blogging and cultural journalism.',
        imageAlt: 'Luis Perez',
        imageSrc: TestImage
    },
    {
        id: '8',
        name: 'Elena Sanchez',
        description: 'Fitness coach and personal trainer with a focus on holistic health and wellness.',
        imageAlt: 'Elena Sanchez',
        imageSrc: TestImage
    }
]

export const categories = [
    {   
      id:4,  
      image: TestImage,
      title: 'Electrónico',
      description: 'Artículos electrónicos.',
      horiz:false  
    },
    { id: 5,  
      image: TestImage,
      title: 'Estudio',
      description: 'Artículos y material de Estudio.',
      horiz:true
    },
    { 
      id:6,    
      image: TestImage,
      title: 'Insumos académicos',
      description: 'Insumos y materiales que se podrían necesitar a lo largo de la carrera universitaria.',
      horiz:true
    },
    {
      id:8,  
      image: TestImage,
      title: 'Accesorios',
      description: 'Accesorios.',
      horiz:false
    },
  ];

export const mockProducts: IProductCardProps[] = [
    {
        id: 1,
        name: "Laptop para Estudiantes",
        price: 899.99,
        stock: 10,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "EduTech",
        qualification: 4.5,
        description: "Laptop ligera y potente, ideal para realizar trabajos académicos, investigaciones y videoconferencias. Incluye un procesador rápido y batería de larga duración.",
    },
    {
        id: 2,
        name: "Calculadora Científica",
        price: 49.99,
        stock: 20,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "CalcPro",
        qualification: 4.7,
        description: "Calculadora avanzada con funciones científicas y gráficas para estudiantes de ingeniería, física y matemáticas.",
    },
    {
        id: 3,
        name: "Cuadernos Universitarios",
        price: 9.99,
        stock: 50,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "NoteMaster",
        qualification: 4.3,
        description: "Pack de 5 cuadernos con papel de alta calidad, perfecto para tomar apuntes en clase.",
    },
    {
        id: 4,
        name: "Tablet para Notas",
        price: 299.99,
        stock: 8,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "TabStudent",
        qualification: 4.6,
        description: "Tablet con lápiz óptico para tomar notas directamente en clase o realizar dibujos técnicos.",
    },
    {
        id: 5,
        name: "Mochila Universitaria",
        price: 39.99,
        stock: 15,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "BackPackPro",
        qualification: 4.4,
        description: "Mochila ergonómica con compartimentos para laptop, libros y accesorios.",
    },
    {
        id: 6,
        name: "Audífonos para Estudio",
        price: 59.99,
        stock: 12,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "StudySound",
        qualification: 4.2,
        description: "Audífonos con cancelación de ruido, ideales para concentrarse en bibliotecas o espacios compartidos.",
    },
    {
        id: 7,
        name: "Lámpara de Escritorio LED",
        price: 19.99,
        stock: 25,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "BrightStudy",
        qualification: 4.3,
        description: "Lámpara ajustable con luz cálida y fría para estudiar cómodamente en la noche.",
    },
    {
        id: 8,
        name: "Memoria USB 64GB",
        price: 14.99,
        stock: 30,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "DataCarry",
        qualification: 4.5,
        description: "Almacenamiento portátil para guardar y transferir tus proyectos y documentos importantes.",
    },
    {
        id: 9,
        name: "Bata de Laboratorio",
        price: 24.99,
        stock: 18,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "LabWear",
        qualification: 4.8,
        description: "Bata de algodón resistente, ideal para estudiantes de química, biología y medicina.",
    },
    {
        id: 10,
        name: "Kit de Materiales de Dibujo Técnico",
        price: 29.99,
        stock: 15,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],
        brand: "TechDraw",
        qualification: 4.7,
        description: "Incluye reglas, compás y lápices técnicos para estudiantes de arquitectura e ingeniería.",
    },
    {
        id: 11,
        name: "Smartphone X",
        price: 499.99,
        stock: 10,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        description: "The latest smartphone with advanced features and a sleek design. It includes a high-resolution camera, fast processor, and long-lasting battery life, making it perfect for both personal and professional use.",
    },
    {
        id: 12,
        name: "Laptop Pro",
        price: 1299.99,
        stock: 5,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "TechMaster",
        qualification: 4.7,
        description: "A high-performance laptop with cutting-edge technology for professional use. It features a powerful processor, ample storage, and a stunning display, ideal for multitasking and demanding applications.",
    },
    {
        id: 13,
        name: "Wireless Earbuds",
        price: 99.99,
        stock: 15,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "SoundMax",
        qualification: 4.3,
        description: "Premium wireless earbuds with noise-cancelling technology and long battery life. They offer superior sound quality, a comfortable fit, and are perfect for listening to music or taking calls on the go.",
    },
    {
        id: 14,
        name: "4K TV",
        price: 799.99,
        stock: 3,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "UltraVision",
        qualification: 4.6,
        description: "A smart TV with 4K resolution and a range of streaming services for entertainment. It provides a crystal-clear picture, vibrant colors, and an immersive viewing experience for movies, sports, and games.",
    },
    {
        id: 15,
        name: "Smartwatch Series 5",
        price: 199.99,
        stock: 8,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "WearableTech",
        qualification: 4.2,
        description: "The latest smartwatch with health monitoring features and customizable watch faces. It tracks your fitness activities, monitors your heart rate, and keeps you connected with notifications and apps.",
    },
    {
        id: 16,
        name: "Gaming Console",
        price: 499.99,
        stock: 2,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "PlayMaster",
        qualification: 4.8,
        description: "A powerful gaming console with high-quality graphics and online multiplayer capabilities. It offers an extensive library of games, smooth performance, and an immersive gaming experience for players of all ages.",
    },
    {
        id: 17,
        name: "Bluetooth Speaker",
        price: 49.99,
        stock: 12,
        isFavourite: false,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "SoundWave",
        qualification: 4.0,
        description: "Portable Bluetooth speaker with stereo sound and long-lasting battery for music on the go. It delivers clear audio, deep bass, and is perfect for outdoor activities, parties, or casual listening.",
    },
    {
        id: 18,
        name: "Tablet Pro",
        price: 349.99,
        stock: 6,
        isFavourite: true,
        img: [CardPrueba, CardPrueba, CardPrueba, CardPrueba],  
        brand: "TabCo",
        qualification: 4.4,
        description: "A professional tablet with a stylus for creative work and productivity tasks. It features a high-resolution display, powerful performance, and versatile functionality, making it ideal for artists, designers, and professionals.",
    }
];

export const images = [
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    }
]