import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Map, Users, Gauge, Mountain } from "lucide-react";
import galleryImage from "@/assets/gallery-5.png";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Map,
      title: "Estradas e Trilhas Rurais",
      description: "Fazendas ao redor da caldeira",
    },
    {
      icon: Users,
      title: "Guias Locais",
      description: "Expertise técnica e suporte total",
    },
    {
      icon: Gauge,
      title: "Níveis Variados",
      description: "Passeios, Trilhas, Cross-Country e Downhill",
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 section-divider" />

      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated group">
              <img
                src={galleryImage}
                alt="Mountain Bike Técnico em Poços"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-gold text-accent-foreground px-8 py-6 rounded-2xl shadow-gold font-display text-center"
            >
              <div className="text-sm uppercase font-bold tracking-widest mb-1">A partir de</div>
              <div className="text-4xl font-black">R$ 150</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] flex items-center gap-2">
              <Mountain className="w-4 h-4" />
              A Experiência
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-foreground mt-4 mb-8 leading-tight">
              Pedale em trilhas sobre um
              <span className="text-primary italic">Vulcão Adormecido</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed mb-10">
              Vulcão Trilhas nasceu da paixão pelas montanhas de Poços de Caldas.
              Uma caldeira vulcânica que abriga uma cidade,
              oferecendo um terreno <strong className="text-foreground italic">geologicamente único</strong>.
              Seja passeios familiares ou explorando as estradas rurais
              com segurança, técnica e visuais de tirar o fôlego.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-gold/50 transition-colors"
                >
                  <feature.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="#precos"
              className="inline-flex items-center gap-3 btn-gold px-10 py-5 rounded-full font-bold text-lg shadow-gold/20 cursor-pointer"
            >
              Explorar Pacotes
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
