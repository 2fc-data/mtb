import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldAlert, Droplets, Footprints, Zap } from "lucide-react";

const Tips = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tips = [
    {
      icon: ShieldAlert,
      title: "Segurança Primeiro",
      description: "Uso obrigatório de capacete e luvas em todas as trilhas.",
    },
    {
      icon: Droplets,
      title: "Hidratação",
      description: "Recomendamos pelo menos 2L de água para as trilhas longas.",
    },
    {
      icon: Footprints,
      title: "Vestuário",
      description: "Sapatilha ou tênis com bom grip e roupas com proteção UV.",
    },
    {
      icon: Zap,
      title: "Nível de Condicionamento",
      description: "Informe seu nível para que o guia escolha a trilha ideal.",
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">
            Prepare-se
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-4">
            Dicas para o <span className="text-primary italic">Pedal</span>
          </h2>
          <p className="text-muted-foreground text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Para aproveitar ao máximo as trilhas de Poços, siga estas recomendações essenciais.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-3xl p-8 text-center border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6">
                <tip.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">{tip.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;
