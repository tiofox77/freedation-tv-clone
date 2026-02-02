import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12">
      <div className="flex items-center justify-between">
        <Logo />
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-8 h-8 text-foreground transition-colors group-hover:text-primary" />
          ) : (
            <>
              <span className="w-8 h-0.5 bg-foreground transition-all group-hover:bg-primary" />
              <span className="w-6 h-0.5 bg-foreground transition-all group-hover:bg-primary group-hover:w-8" />
            </>
          )}
        </button>
      </div>

      {/* Full screen menu overlay */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-md transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {["Home", "Portfólio", "Sobre", "Serviços", "Contato"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-display text-5xl lg:text-7xl text-foreground/80 hover:text-primary transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
