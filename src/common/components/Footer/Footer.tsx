import { FC } from "react";

const Footer: FC = () => {
    return (
<footer className="bg-primary-dark text-white text-center py-4 mt-auto">
  &copy; {new Date().getFullYear()} Matchmaker - Todos los derechos reservados
</footer>
    );
  };
  
  export default Footer;
  