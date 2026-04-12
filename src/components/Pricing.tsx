import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Bike, Map, Tent } from "lucide-react";

const Pricing = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Day Tour",
      price: "150",
      description: "Explorações locais guiadas",
      features: [
        "4h de pedal guiado",
        "Trilhas de nível técnico à escolha",
        "Seguro aventura individual",
        "Fotos e vídeos inclusos",
        "Ponto de apoio com hidratação",
      ],
      icon: Bike,
      highlighted: false,
    },
    {
      name: "Expedição Vulcão",
      price: "450",
      description: "A experiência definitiva na caldeira",
      features: [
        "Dia inteiro (8h+) de expedição",
        "Suporte com veículo 4x4",
        "Almoço em fazenda histórica",
        "Mecânico de apoio full-time",
        "Kit Vulcão trilhas (Jersey + Squeeze)",
      ],
      icon: Map,
      highlighted: true,
    },
    {
      name: "Aluguel Pro",
      price: "200",
      description: "Bikes de alta performance",
      features: [
        "MTB Full Suspension de elite",
        "Ajuste de suspensão (SAG) incluso",
        "Capacete e kit de reparo",
        "Entrega na sua hospedagem",
        "Lavagem inclusa pós-pedal",
      ],
      icon: Tent,
      highlighted: false,
    },
  ];

  const paymentMethods = [
    "PIX (5% OFF)",
    "Cartão de Crédito (até 12x)",
    "Dinheiro",
  ];

  return (
    <section id="precos" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">
            Investimento
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-4">
            Escolha sua <span className="text-primary">Aventura</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-10 flex flex-col ${pkg.highlighted
                  ? "bg-navy text-primary-foreground shadow-2xl scale-105 z-10 border-2 border-gold"
                  : "bg-card border border-border hover:border-gold/30 transition-all duration-300"
                }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-accent-foreground px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                    Mais Procurado
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${pkg.highlighted ? "bg-gold/20" : "bg-primary/10"}`}>
                  <pkg.icon className={`w-8 h-8 ${pkg.highlighted ? "text-gold" : "text-primary"}`} />
                </div>
                <h3 className={`font-display text-3xl mb-3 ${pkg.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm font-medium ${pkg.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {pkg.description}
                </p>
              </div>

              <div className="text-center mb-10">
                <div className="flex items-start justify-center gap-1">
                  <span className={`text-lg font-bold mt-2 ${pkg.highlighted ? "text-gold" : "text-primary"}`}>R$</span>
                  <span className={`font-display text-7xl font-bold ${pkg.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {pkg.price}
                  </span>
                </div>
                <span className={`text-xs uppercase font-bold tracking-widest ${pkg.highlighted ? "text-primary-foreground/40" : "text-muted-foreground/50"}`}>
                  por pessoa
                </span>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.highlighted ? "text-gold" : "text-primary"}`} />
                    <span className={pkg.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookingClick}
                className={`w-full block text-center py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${pkg.highlighted
                    ? "bg-gold text-navy hover:bg-white hover:scale-105 shadow-xl shadow-gold/20"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
              >
                Reservar Agora
              </button>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-muted/30 py-8 rounded-3xl border border-border/50"
        >
          <p className="text-muted-foreground text-xs uppercase font-bold tracking-[0.3em] mb-6">
            Métodos de Pagamento Aceitos
          </p>
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-6 py-2 bg-background border border-border rounded-full text-xs font-bold text-foreground/70 shadow-sm"
              >
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
