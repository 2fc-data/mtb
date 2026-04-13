import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, MapPin, Drill, Heart, Mountain } from "lucide-react";
import gallery3 from "@/assets/gallery-3.png";

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Shield,
      title: "Suporte Total",
      description: "Seguro aventura incluso e rádio comunicação em todas as trilhas.",
    },
    {
      icon: MapPin,
      title: "Trilhas Exclusivas",
      description: "Acesso a trilhas particulares e passagens secretas na caldeira.",
    },
    {
      icon: Drill,
      title: "Manutenção",
      description: "Oficina móvel e suporte mecânico básico durante todo o pedal.",
    },
    {
      icon: Heart,
      title: "Paixão Local",
      description: "Vivemos o MTB em Poços há vida toda. Conhecemos cada curva.",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: `url(${gallery3})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-navy/45 z-1" />
      <div className="absolute inset-0 bg-linear-to-b from-navy/50 via-transparent to-navy/50 z-2" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-gold font-bold text-sm uppercase tracking-[0.4em] mb-4 block">
            Diferenciais
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-primary-foreground leading-tight">
            Por Que Pedalar <span className="text-gold italic">Conosco?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-10 h-full flex flex-col hover:border-gold/50 transition-all duration-500 shadow-lg text-white">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-500" />

                <div className="w-20 h-20 rounded-2xl bg-gold/15 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold/25 transition-all duration-500 shadow-inner">
                  <benefit.icon className="w-10 h-10 text-gold" />
                </div>

                <h3 className="font-display text-3xl text-primary-foreground mb-4 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-primary-foreground/60 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4 text-primary-foreground/40">
            <Mountain className="w-6 h-6 border rounded-full p-1" />
            <span className="h-[1px] w-12 bg-white/10" />
            <span className="text-sm font-bold uppercase tracking-widest italic">A melhor vista de Minas</span>
            <span className="h-[1px] w-12 bg-white/10" />
            <Mountain className="w-6 h-6 border rounded-full p-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
