import { motion } from "framer-motion";
import { Mountain, Instagram, Bike } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-2 mb-2">
              <Mountain className="w-8 h-8 text-gold fill-gold/20" />
              <h3 className="font-display text-2xl text-primary-foreground">
                Trilhas <span className="text-gold uppercase tracking-tighter">MTB</span>
              </h3>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Sua aventura <span className="text-gold font-semibold uppercase tracking-widest text-xs ml-1">Mountain Bike</span> em Poços de Caldas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <a
              href="https://www.instagram.com/vulcaotrilhas/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5535999513333" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer"
            >
              <Bike className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <p className="text-primary-foreground/50 text-sm flex items-center justify-center md:justify-end gap-1">
              © {currentYear} • Trilhas e Estradão
            </p>
            <p className="text-primary-foreground/30 text-[10px] mt-1">
              by: <a href="mailto:2fc.data@gmail.com" className="hover:underline">2fc.data</a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
