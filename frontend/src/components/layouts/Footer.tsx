import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-terciaryLight text-terciaryDark sm:px-6 md:px-16 lg:px-32 py-6">
      <div className="flex flex-col lg:flex-row md:justify-between">
        {/* Logo - descripción e iconos */}
        <div className="flex flex-col mr-2 space-y-4 mb-4 sm:flex-row lg:w-[400px] lg:flex-col lg:mb-0">
          <div className="flex flex-col space-x-2">
            <Link to='/'>
              <img
                src="/Ezcommerce-logo-dark.png"
                alt="logo"
                width={180}
                height={88}
              />
            </Link>
            <p className="text-sm md:text-lg lg:text-sm">
              Una tienda virtual creada para conectar y apoyar a universitarios,
              donde cada compra y venta fortalece nuestra comunidad.
            </p>
          </div>
          {/* Íconos */}
          <div className="flex sm:flex-wrap mt-4 items-center lg:space-x-4 justify-center sm:w-1/4 lg:justify-start lg:w-full">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors m-2 lg:m-0">
              <Link to="#">
                <Facebook size={20} className="text-white" />
              </Link>
            </div>
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors m-2 lg:m-0">
              <Link to="#">
                <Instagram size={20} className="text-white" />
              </Link>
            </div>
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors m-2 lg:m-0">
              <Link to="#">
                <MessageCircle size={20} className="text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Compañia */}
        <div className="flex flex-col mb-6 lg:mb-0 lg:mr-2">
          <h3 className="text-lg font-semibold text-primaryLight">Compañia</h3>
          <hr className="my-3" />
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">Nosotros</Link>
            </li>
            <li>
              <Link to="#">Términos y condiciones</Link>
            </li>
            <li>
              <Link to="#">Política y privacidad</Link>
            </li>
            <li>
              <Link to="/contact">Soporte</Link>
            </li>
          </ul>
        </div>

        {/* Mi cuenta */}
        <div className="flex flex-col mb-6 lg:mb-0 lg:mr-2">
          <h3 className="text-lg font-semibold">Mi Cuenta</h3>
          <hr className="my-3" />
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">Vender Producto</Link>
            </li>
            <li>
              <Link to="#">Categoría de producto</Link>
            </li>
            <li>
              <Link to="#">Promociones</Link>
            </li>
          </ul>
        </div>

        {/* Comunidad */}
        <div className="flex flex-col mb-6 lg:mb-0">
          <h3 className="text-lg font-semibold">Comunidad</h3>
          <hr className="my-3" />
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">Blog</Link>
            </li>
            <li>
              <Link to="#">Sugerencias y feedback</Link>
            </li>
            <li>
              <Link to="#">Únete a nosotros</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-4 text-center mt-2 lg:mt-9">
        <span className="text-sm">
          Copyright @ 2024 EzCommerce. Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};
