import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Bike } from "lucide-react";
import heroImage from "@/assets/hero-main.png";

const Hero = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Mountain Bike em Poços de Caldas - Trilhas no Vulcão"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 via-navy/30 to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-6 py-2 rounded-full bg-gold/20 text-primary-foreground font-semibold text-xs uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-gold/30 shadow-gold/10"
        >
          Poços de Caldas • Minas Gerais • Brasil
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.9] mb-6 text-shadow-hero"
        >
          TRILHAS NO
          <br />
          <span className="text-gradient-gold">VULCÃO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mb-12 font-light leading-relaxed"
        >
          Explore as trilhas da caldeira vulcânica sobre duas rodas.
          Das trilhas técnicas de Downhill aos passeios para iniciantes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button
            onClick={onBookingClick}
            className="btn-gold px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-gold/20 hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <Bike className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Agendar
          </button>
          <a
            href="#sobre"
            className="px-10 py-5 rounded-full font-bold text-lg border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
          >
            Dúvidas?
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <a href="#sobre" className="flex flex-col items-center gap-2 text-primary-foreground/50 hover:text-primary-foreground transition-colors group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Descubra</span>
            <ChevronDown className="w-8 h-8 animate-bounce text-gold" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
