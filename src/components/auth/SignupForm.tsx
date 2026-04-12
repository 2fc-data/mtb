import { useState } from "react";
import { Link } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { Bike, Loader2, MapPin, Mountain, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pilotLevel, setPilotLevel] = useState("iniciante");
    const [loading, setLoading] = useState(false);
    const [preferences, setPreferences] = useState({
        bikeType: "",
        modality: [] as string[],
        mileage: "",
        elevation: "",
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                // @ts-ignore - custom field
                pilotLevel: pilotLevel, 
                callbackURL: "/",
            }, {
                onSuccess: () => {
                    toast.success("Conta criada! Boas trilhas!");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Erro ao criar conta.");
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const levels = [
        { value: "iniciante", label: "Nível 1 - Iniciante", desc: "Estradas de terra e estradões" },
        { value: "intermediario", label: "Nível 2 - Intermediário", desc: "Trilhas leves e singletracks" },
        { value: "avancado", label: "Nível 3 - Avançado", desc: "Trilhas técnicas e obstáculos" },
        { value: "expert", label: "Nível 4 - Expert/PRO", desc: "Enduro pesado e Downhill" },
    ];

    const bikeTypes = [
        { value: "mountain", label: "Mountain Bike (MTB)", icon: "🚵" },
        { value: "eletric", label: "Bike Elétrica (E-Bike)", icon: "⚡" },
        { value: "gravel", label: "Gravel", icon: "🛤️" },
        { value: "downhill", label: "Downhill", icon: "⛰️" },
    ];

    const modalities = [
        { value: "trilha", label: "Trilha" },
        { value: "singletrack", label: "Singletrack" },
        { value: "enduro", label: "Enduro" },
        { value: "downhill", label: "Downhill" },
        { value: "crosscountry", label: "Cross Country" },
        { value: "cicloturismo", label: "Cicloturismo" },
        { value: "gravel", label: "Gravel" },
    ];

    const mileageOptions = [
        { value: " ate 20km", label: "Até 20km", desc: "Rotas leves e curtas" },
        { value: "20-40km", label: "20-40km", desc: "Distância média" },
        { value: "40-60km", label: "40-60km", desc: "Rotas intermediárias" },
        { value: "60-80km", label: "60-80km", desc: "Rotas avançadas" },
        { value: "80km+", label: "80km+", desc: "Desafios extremos" },
    ];

    const elevationOptions = [
        { value: "plano", label: "Plano", desc: "Sem ganhos significativos" },
        { value: " ate 300m", label: "Até 300m", desc: "Leve elevação" },
        { value: "300-600m", label: "300-600m", desc: "Elevação moderada" },
        { value: "600-1000m", label: "600-1000m", desc: "Elevação alta" },
        { value: "1000m+", label: "1000m+", desc: "Desafio extremo" },
    ];

    const handleModalityChange = (value: string, checked: boolean) => {
        setPreferences(prev => ({
            ...prev,
            modality: checked 
                ? [...prev.modality, value]
                : prev.modality.filter(m => m !== value)
        }));
    };

    return (
        <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1">Nome Completo</label>
                    <Input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-14 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold"
                    />
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

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1">Senha</label>
                    <Input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-14 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1">Nível do Piloto</label>
                    <Select value={pilotLevel} onValueChange={setPilotLevel}>
                        <SelectTrigger className="h-16 bg-white/10 border-white/10 text-white rounded-2xl px-6 focus:ring-gold">
                            <SelectValue placeholder="Selecione seu nível" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy/95 border-white/10 text-white rounded-2xl p-2 backdrop-blur-xl">
                            {levels.map((level) => (
                                <SelectItem 
                                    key={level.value} 
                                    value={level.value}
                                    className="focus:bg-gold focus:text-navy rounded-xl py-3 px-4 cursor-pointer"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-base">{level.label}</span>
                                        <span className="text-[10px] opacity-60 uppercase tracking-wider">{level.desc}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Bike className="w-4 h-4" /> Tipo de Bike
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {bikeTypes.map((bike) => (
                            <button
                                key={bike.value}
                                type="button"
                                onClick={() => setPreferences(prev => ({ ...prev, bikeType: bike.value }))}
                                className={`p-3 rounded-xl border text-left transition-all ${
                                    preferences.bikeType === bike.value
                                        ? "bg-gold text-navy border-gold"
                                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                                }`}
                            >
                                <span className="text-lg mr-2">{bike.icon}</span>
                                <span className="font-medium text-sm">{bike.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                    <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Modalidades de Interesse
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {modalities.map((mod) => (
                            <div key={mod.value} className="flex items-center gap-2">
                                <Checkbox
                                    id={mod.value}
                                    checked={preferences.modality.includes(mod.value)}
                                    onCheckedChange={(checked) => handleModalityChange(mod.value, checked as boolean)}
                                    className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-navy"
                                />
                                <Label 
                                    htmlFor={mod.value} 
                                    className="text-white/80 text-sm cursor-pointer font-normal"
                                >
                                    {mod.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <Timer className="w-3 h-3" /> Distância
                        </label>
                        <Select value={preferences.mileage} onValueChange={(val) => setPreferences(prev => ({ ...prev, mileage: val }))}>
                            <SelectTrigger className="h-12 bg-white/10 border-white/10 text-white rounded-xl text-sm">
                                <SelectValue placeholder="km" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy/95 border-white/10 text-white backdrop-blur-xl">
                                {mileageOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="focus:bg-gold focus:text-navy">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <Mountain className="w-3 h-3" /> Elevação
                        </label>
                        <Select value={preferences.elevation} onValueChange={(val) => setPreferences(prev => ({ ...prev, elevation: val }))}>
                            <SelectTrigger className="h-12 bg-white/10 border-white/10 text-white rounded-xl text-sm">
                                <SelectValue placeholder="m" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy/95 border-white/10 text-white backdrop-blur-xl">
                                {elevationOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="focus:bg-gold focus:text-navy">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gold hover:bg-white text-navy font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 transition-all hover:scale-[1.02] active:scale-95"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <span className="flex items-center gap-2">
                        Criar Conta <Bike className="w-5 h-5" />
                    </span>
                )}
            </Button>

            <p className="text-center text-sm text-primary-foreground/40 font-medium pb-2">
                Já tem uma conta?{" "}
                <Link to="/entrar" className="text-gold font-bold hover:underline underline-offset-4">
                    Fazer Login
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
