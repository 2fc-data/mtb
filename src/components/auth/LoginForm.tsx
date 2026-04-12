import { useState } from "react";
import { Link } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { Chrome, MapPin, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });
            toast.success("Bem-vindo de volta!");
        } catch (error) {
            toast.error("Erro ao fazer login. Verifique seus dados.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: "google" | "strava") => {
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (error) {
            toast.error(`Erro ao entrar com ${provider}.`);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1">E-mail</label>
                    <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold focus:border-gold"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest">Senha</label>
                        <Link 
                            to="/recuperar-senha" 
                            className="text-xs font-bold text-gold hover:underline decoration-gold/30 underline-offset-4"
                        >
                            Esqueceu?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-14 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold focus:border-gold"
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gold hover:bg-white text-navy font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 transition-all hover:scale-[1.02] active:scale-95"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <span className="flex items-center gap-2">
                        Entrar <ArrowRight className="w-5 h-5" />
                    </span>
                )}
            </Button>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-[0.3em]">
                    <span className="bg-navy/0 px-4 text-primary-foreground/30">Ou use sua conta</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                    className="h-14 bg-white/5 border-white/10 text-white rounded-2xl hover:bg-white/10"
                >
                    <Chrome className="w-5 h-5 mr-2" /> Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("strava")}
                    className="h-14 bg-[#FC4C02]/10 border-[#FC4C02]/20 text-white rounded-2xl hover:bg-[#FC4C02]/20"
                >
                    <MapPin className="w-5 h-5 mr-2 text-[#FC4C02]" /> Strava
                </Button>
            </div>

            <p className="text-center text-sm text-primary-foreground/40 font-medium">
                Novo por aqui?{" "}
                <Link to="/cadastro" className="text-gold font-bold hover:underline underline-offset-4">
                    Crie sua conta
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
