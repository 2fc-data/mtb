import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Zap, MoveRight } from "lucide-react";

const RoutePlanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const routes = [
    {
      title: "Passeios família",
      subtitle: "O lazer em família",
      description: "Conheça mirantes, cachoeiras e paisagens deslumbrantes. Foco em curtir a bike e a natureza.",
      stats: ["Nível: Iniciante / Intermediário", "Distância: 10km - 30km+", "Ganho: 200m - 400m"],
      icon: Compass,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Cicloturismo",
      subtitle: "A Contemplação",
      description: "Percorra trilhas e estradas rurais, fazendas históricas e visuais panorâmicos da caldeira. Foco em resistência e paisagem.",
      stats: ["Nível: Iniciante / Intermediário", "Distância: 30km - 60km+", "Ganho: 800m - 1500m"],
      icon: Compass,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Cross Country",
      subtitle: "O Desafio",
      description: "Trilhas com subidas e descidas desafiadoras, singletracks técnicos e paisagens deslumbrantes. Foco em resistência e técnica.",
      stats: ["Nível: Intermediário / Avançado", "Distância: 40km - 80km", "Ganho: 1000m - 2500m"],
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "MTB Técnico",
      subtitle: "A Adrenalina",
      description: "Downhill, Enduro e Singletracks brutais. Tem pra todo gosto.",
      stats: ["Nível: Avançado / Expert", "Distância: 15km - 25km", "Ganho: Descidas técnicas"],
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section id="trilhas" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">
            Planejador
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-4">
            Qual o seu <span className="text-primary italic">Estilo?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {routes.map((route, index) => (
            <motion.div
              key={route.title}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group h-full"
            >
              <div className="bg-card border border-border rounded-[2.5rem] p-10 h-full flex flex-col hover:border-gold/40 transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className={`w-20 h-20 rounded-3xl ${route.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <route.icon className={`w-10 h-10 ${route.color}`} />
                </div>

                <div className="mb-4">
                  <span className={`${route.color} text-xs font-black uppercase tracking-widest`}>{route.subtitle}</span>
                  <h3 className="font-display text-4xl text-foreground mt-1">{route.title}</h3>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-10 flex-grow">
                  {route.description}
                </p>

                <div className="space-y-3 mb-10">
                  {route.stats.map((stat) => (
                    <div key={stat} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className={`w-1.5 h-1.5 rounded-full ${route.color}`} />
                      {stat}
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/5535999309770?text=Olá! Gostaria de planejar um pedal de ${route.title}!`}
                  target="_blank"
                  className="inline-flex items-center gap-3 font-bold text-foreground group/link"
                >
                  Planejar Rota
                  <MoveRight className="w-5 h-5 text-gold group-hover/link:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoutePlanner;
