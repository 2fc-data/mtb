import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Hotel, CheckCircle2, Bike } from "lucide-react";

const Lodging = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lodgings = [
    {
      name: "Hotel Minas Garden",
      description: "Requinte histórico e conforto premium. O melhor buffet de café da manhã para ciclistas famintos.",
      features: ["Bike-Friendly", "Oficina", "Local Central", "Piscina Aquecida"],
      url: "https://www.hotelminasgarden.com.br/",
    },
    {
      name: "Príncipe Hotel",
      description: "Praticidade e localização estratégica. Ótimo custo-benefício para quem foca no pedal.",
      features: ["Garagem Segura", "Wifi Rápido", "Localização Premium", "Econômico"],
      url: "https://www.principehotel.com.br/",
    },
    {
      name: "Pousada Recanto da Serra",
      description: "Aos pés da Serra de São Domingos. Literalmente na boca das melhores trilhas de Poços.",
      features: ["Lava-Bike", "Vista de Montanha", "Proximidade das Trilhas", "Aconchegante"],
      url: "https://www.pousadadaserra.com.br/",
    },
  ];

  return (
    <section id="hospedagem" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">
              Onde Ficar
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-4 mb-8 leading-tight">
              Hospedagens <span className="text-primary italic">Bike-Friendly</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed mb-10">
              Selecionamos parceiros que entendem o espírito do pedal. Locais com garagem segura,
              lava-bike e pontos estratégicos para você não perder tempo.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-foreground">
              <div className="bg-gold/20 p-2 rounded-lg">
                <Bike className="w-6 h-6 text-gold" />
              </div>
              <span>Parcerias Exclusivas</span>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {lodgings.map((lodging, index) => (
              <motion.div
                key={lodging.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card border border-border/50 rounded-[2rem] p-8 flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <Hotel className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-display text-2xl text-foreground mb-4">{lodging.name}</h3>
                <p className="text-muted-foreground text-sm flex-grow mb-8 leading-relaxed">
                  {lodging.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {lodging.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/60">
                      <CheckCircle2 className="w-3 h-3 text-gold/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={lodging.url}
                  target="_blank"
                  className="text-xs font-bold text-primary group-hover:underline underline-offset-4"
                >
                  Conhecer Hotel
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lodging;
