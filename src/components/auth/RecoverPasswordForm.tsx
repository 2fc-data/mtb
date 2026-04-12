import { useState } from "react";
import { Link } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RecoverPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // @ts-ignore
            await authClient.forgetPassword({
                email,
                redirectTo: "/redefinir-senha",
            });
            setSent(true);
            toast.success("E-mail de recuperação enviado!");
        } catch (error) {
            toast.error("Erro ao enviar e-mail. Verifique se o endereço está correto.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="text-center space-y-6">
                <div className="bg-gold/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                    <Send className="w-10 h-10 text-gold" />
                </div>
                <div className="space-y-4">
                    <h3 className="font-display text-2xl text-primary-foreground">Confira seu E-mail</h3>
                    <p className="text-primary-foreground/60 leading-relaxed">
                        Enviamos as instruções de recuperação para <span className="text-gold font-bold">{email}</span>.
                    </p>
                </div>
                <Link 
                    to="/entrar" 
                    className="inline-flex items-center gap-2 text-gold font-bold hover:underline underline-offset-4 pt-4"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para o Login
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleRecover} className="space-y-8">
            <div className="space-y-2 text-center mb-4">
                <p className="text-primary-foreground/60 leading-relaxed">
                    Insira seu e-mail abaixo e enviaremos um link para você recuperar sua conta.
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1">E-mail</label>
                <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gold hover:bg-white text-navy font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 transition-all hover:scale-[1.02] active:scale-95"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <span className="flex items-center gap-2">
                        Enviar Instruções <Send className="w-5 h-5" />
                    </span>
                )}
            </Button>

            <Link 
                to="/entrar" 
                className="block text-center text-sm text-primary-foreground/40 font-bold hover:text-gold transition-colors"
            >
                Voltar para o Login
            </Link>
        </form>
    );
};

export default RecoverPasswordForm;
