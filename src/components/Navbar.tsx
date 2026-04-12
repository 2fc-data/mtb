import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Menu, X, Bike, User, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Navbar = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use a more defensive session hook usage
  const session = authClient.useSession();
  const authData = session?.data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  const navLinks = [
    { href: "/#sobre", label: "A Experiência" },
    { href: "/#galeria", label: "Galeria" },
    { href: "/#trilhas", label: "Trilhas" },
    { href: "/#hospedagem", label: "Hospedagem" },
    { href: "/#precos", label: "Pacotes" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="font-display text-2xl text-primary-foreground flex items-center gap-2 cursor-pointer">
            <Mountain className="w-8 h-8 text-gold fill-gold/20" />
            <span>Vulcão <span className="text-gold uppercase tracking-tighter">trilhas</span></span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/80 md:hover:text-gold transition-colors font-medium text-sm lg:text-base cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            <div className="h-4 w-[1px] bg-white/10" />

            {authData ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gold flex items-center gap-2 uppercase tracking-widest">
                  <User className="w-4 h-4" /> {authData.user?.name?.split(' ')[0] || "Piloto"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-primary-foreground/60 hover:text-white transition-colors p-1 cursor-pointer"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <a
                href="/entrar"
                className="text-primary-foreground/80 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest cursor-pointer"
              >
                Login
              </a>
            )}

            <button
              onClick={onBookingClick}
              className="btn-gold px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              <Bike className="w-4 h-4" />
              Agendar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {!authData && (
              <a href="/entrar" className="text-primary-foreground/80 p-2 cursor-pointer">
                <User className="w-6 h-6" />
              </a>
            )}
            <button
              className="text-primary-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-md border-t border-white/10 px-4 pb-8 md:hidden shadow-xl"
            >
              <div className="flex flex-col gap-6 pt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/90 active:text-gold font-medium text-lg block transition-none cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                {authData ? (
                  <div className="flex items-center justify-between py-2 border-t border-white/5 pt-6">
                    <span className="text-gold font-bold uppercase tracking-widest flex items-center gap-2">
                      <User className="w-5 h-5" /> {authData.user?.name || "Piloto"}
                    </span>
                    <button onClick={handleLogout} className="text-primary-foreground/60 flex items-center gap-2 cursor-pointer">
                      <LogOut className="w-5 h-5" /> Sair
                    </button>
                  </div>
                ) : (
                  <a
                    href="/entrar"
                    className="text-primary-foreground font-bold uppercase tracking-widest text-center py-3 border border-white/10 rounded-xl cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Fazer Login
                  </a>
                )}

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onBookingClick?.(); }}
                  className="btn-gold px-6 py-4 rounded-full font-semibold text-center mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bike className="w-5 h-5" />
                  Agendar agora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
