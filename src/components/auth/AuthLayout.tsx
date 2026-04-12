import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mountain } from "lucide-react";
import heroImage from "@/assets/hero-main.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden">
      {/* Background with MTB imagery */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm z-1" />

      {/* Back to Home Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors font-bold uppercase tracking-widest text-xs group cursor-pointer"
        >
          <div className="bg-white/10 p-2 rounded-full group-hover:bg-gold/20 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Voltar ao Início
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="bg-gold/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mountain className="w-8 h-8 text-gold fill-gold/20" />
            </div>
            <h1 className="font-display text-4xl text-primary-foreground mb-3">{title}</h1>
            <p className="text-primary-foreground/60 text-sm font-medium tracking-wide">{subtitle}</p>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
