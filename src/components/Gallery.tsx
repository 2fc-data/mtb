import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import heroMain from "@/assets/hero-main.png";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: heroMain, alt: "Mountain Bike ao entardecer" },
    { src: gallery1, alt: "Grupo de MTB no estradão" },
    { src: gallery2, alt: "Singletrack técnico nas montanhas" },
    { src: gallery3, alt: "Cicloturismo na Rota do Vulcão" },
  ];

  return (
    <section id="galeria" className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em]">
            Galeria
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mt-4">
            Experiência em <span className="text-primary">Alta Resolução</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-3xl cursor-pointer group shadow-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center">
                  <p className="text-primary-foreground font-display text-xl mb-1">{image.alt}</p>
                  <span className="text-gold text-xs uppercase font-bold tracking-widest">Ampliar</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            alt="Foto ampliada"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
          <button
            className="absolute top-10 right-10 text-primary-foreground text-5xl hover:text-gold transition-colors font-light"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
