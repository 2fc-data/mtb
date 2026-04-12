import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bike, Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-main.png";

const CTA = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-navy/95 via-navy/80 to-navy/40 z-1" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-bold text-sm uppercase tracking-[0.4em] mb-4 block">
              Agende sua Experiência
            </span>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-primary-foreground leading-tight mb-8">
              Pronto para o
              <br />
              <span className="text-gold italic underline decoration-white/20 underline-offset-8">Próximo Nível?</span>
            </h2>
            <p className="text-primary-foreground/70 text-xl mb-12 max-w-2xl leading-relaxed">
              Informe nos sobre suas preferências e formaremos um grupo personaliadso garantindo a melhor experiência nas trilhas de Poços de Caldas.
              Suporte completo, dicas locais e muita adrenalina.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-16"
          >
            <button
              onClick={onBookingClick}
              className="btn-gold px-12 py-6 rounded-full font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-gold/20 hover:scale-105 transition-all group cursor-pointer"
            >
              <Bike className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              Agendar Agora
            </button>
            <a
              href="tel:+5535999513333"
              className="px-10 py-6 rounded-full font-bold text-lg border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              (35) 99951-3333
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-8 text-primary-foreground/50 border-t border-white/10 pt-10"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-gold" />
              <span className="text-sm font-medium tracking-wide">Poços de Caldas, Minas Gerais - BR</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-wide italic">Atendimento diário via WhatsApp</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
