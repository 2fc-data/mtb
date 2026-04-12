import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ChevronRight, ChevronLeft, MapPin, Ruler, Wallet, CalendarDays, ArrowRight } from "lucide-react";
import { addDays, format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

type Step = "PREFERENCES" | "IDENTIFICATION" | "REGISTRATION" | "SUCCESS";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [step, setStep] = useState<Step>("PREFERENCES");
  const [loading, setLoading] = useState(false);

  // Date Range State
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 15),
    to: addDays(new Date(), 18),
  });

  const [preferences, setPreferences] = useState({
    bikeType: "bike",
    modality: "cicloturismo",
    mileage: "30-50",
    elevation: "moderada",
    duration: "4h",
    investment: "padrao"
  });

  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState({
    name: "",
    pilotLevel: "iniciante",
    password: ""
  });

  const handleNext = async () => {
    if (step === "PREFERENCES") {
      setStep("IDENTIFICATION");
      return;
    }

    if (step === "IDENTIFICATION") {
      setLoading(true);
      try {
        const session = await authClient.getSession();
        if (session.data?.user) {
          await submitBooking(session.data.user.id);
        } else {
          setStep("REGISTRATION");
        }
      } catch (error) {
        toast.error("Erro ao verificar usuário.");
      } finally {
        setLoading(false);
      }
    }
  };

  const submitBooking = async (userId: string) => {
    try {
      const dateText = dateRange?.to
        ? `${format(dateRange.from!, "dd/MM")} a ${format(dateRange.to, "dd/MM/yyyy")}`
        : format(dateRange?.from || new Date(), "dd/MM/yyyy");

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          date: dateText,
          ...preferences
        })
      });

      if (response.ok) {
        setStep("SUCCESS");
        const message = `Olá! Solicitei um agendamento para o período: ${dateText}…`;
        const whatsappUrl = `https://wa.me/5535999513333?text=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(whatsappUrl, "_blank"), 2000);
      }
    } catch (error) {
      toast.error("Erro ao processar reserva.");
    }
  };

  const handleRegisterAndSubmit = async () => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password: registration.password,
        name: registration.name,
        // @ts-ignore
        pilotLevel: registration.pilotLevel,
        role: "client"
      });
      if (error) { toast.error(error.message); return; }
      if (data?.user) await submitBooking(data.user.id);
    } catch (error) {
      toast.error("Falha no cadastro.");
    } finally {
      setLoading(false);
    }
  };

  const daysDiff = dateRange?.from && dateRange?.to
    ? differenceInDays(dateRange.to, dateRange.from) + 1
    : 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-sm:w-[95vw] sm:max-w-none md:w-[95vw] lg:w-[92vw] xl:max-w-7xl h-auto max-h-[95vh] bg-navy border-white/10 text-white rounded-[2rem] p-0 overflow-hidden shadow-2xl flex flex-col overscroll-contain"
        style={{ colorScheme: 'dark' } as any}
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center shadow-lg shadow-gold/5">
              <CalendarDays className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight uppercase">Escolha seu Período</h3>
              <p className="text-white/40 text-sm italic">Defina as datas de início e fim da sua aventura…</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block">Total de Dias</span>
              <span className="text-2xl font-bold text-gold">{daysDiff} {daysDiff > 1 ? "Dias" : "Dia"}</span>
            </div>
            <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gold transition-all duration-700 ease-out"
                style={{ width: step === "PREFERENCES" ? "33%" : step === "IDENTIFICATION" ? "66%" : "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10">
          {step === "SUCCESS" ? (
              <div style={{ padding: "60px 24px", textAlign: "center", background: "white", borderRadius: "24px", margin: "16px", border: "4px solid gold", color: "black" }}>
                <div style={{ color: "black", fontSize: "96px" }}>✓</div>
                <h3 style={{ fontSize: "48px", fontWeight: 900, textTransform: "uppercase", color: "black", margin: "20px 0" }}>Agendamento Solicitado!</h3>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "black", maxWidth: "500px", margin: "0 auto" }}>Levando você ao WhatsApp para os detalhes finais…</p>
              </div>
          ) : (
          <AnimatePresence mode="wait">
            {step === "PREFERENCES" && (
              <motion.div
                key="p"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col xl:flex-row gap-10 items-start"
              >
                {/* 1. Date Range Section - WIDER */}
                <div className="flex-[1.5] space-y-8 w-full">
                  {/* Explicit Selection Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      "p-5 rounded-2xl border transition-all duration-300 bg-white/5",
                      dateRange?.from ? "border-gold/50 bg-gold/5 shadow-lg shadow-gold/5" : "border-white/5 opacity-50"
                    )}>
                      <Label className="text-[10px] uppercase tracking-widest text-gold mb-2 block font-black">Data de Início</Label>
                      <div className="text-xl font-bold flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 opacity-40" />
                        {dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "Selecione..."}
                      </div>
                    </div>

                    <div className={cn(
                      "p-5 rounded-2xl border transition-all duration-300 bg-white/5",
                      dateRange?.to ? "border-gold/50 bg-gold/5 shadow-lg shadow-gold/5" : "border-white/5 opacity-50"
                    )}>
                      <Label className="text-[10px] uppercase tracking-widest text-gold mb-2 block font-black">Data de Término</Label>
                      <div className="text-xl font-bold flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 opacity-40" />
                        {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "Selecione..."}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-center shadow-inner overflow-x-auto">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) => date < addDays(new Date(), 15)}
                      locale={ptBR}
                      className="bg-transparent"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-8 sm:space-x-12 sm:space-y-0",
                        month: "space-y-6",
                        day: "h-11 w-11 p-0 font-normal aria-selected:opacity-100 text-base rounded-full transition-all hover:bg-gold/20",
                        today: "bg-white/5 text-gold border border-gold/30",
                        selected: "bg-gold text-navy font-black hover:bg-white hover:text-navy focus:bg-gold focus:text-navy shadow-[0_0_20px_rgba(212,175,55,0.4)]",
                        range_start: "bg-gold text-navy rounded-l-full",
                        range_end: "bg-gold text-navy rounded-r-full",
                        range_middle: "bg-gold/30 text-white rounded-none",
                        head_cell: "text-white/30 font-bold text-xs uppercase tracking-widest",
                        nav_button: "hover:bg-gold hover:text-navy transition-colors rounded-xl border-white/10",
                        caption_label: "text-lg font-bold text-gold/90"
                      }}
                    />
                  </div>
                </div>

                {/* 2 & 3. Config Section */}
                <div className="flex-1 space-y-10 w-full lg:max-w-md">
                  <div className="space-y-6">
                    <Label className="text-xs font-black uppercase tracking-[0.3em] text-gold/60 ml-2">2. Equipamento</Label>
                    <RadioGroup
                      defaultValue={preferences.bikeType}
                      onValueChange={(v: string) => setPreferences({ ...preferences, bikeType: v })}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <Label className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/5 cursor-pointer has-[:checked]:border-gold has-[:checked]:bg-gold/10 transition-all font-bold">
                        Muscular
                        <RadioGroupItem value="bike" className="text-gold" />
                      </Label>
                      <Label className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/5 cursor-pointer has-[:checked]:border-gold has-[:checked]:bg-gold/10 transition-all font-bold">
                        E-Bike
                        <RadioGroupItem value="ebike" className="text-gold" />
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-xs font-black uppercase tracking-[0.3em] text-gold/60 ml-2">3. Preferências</Label>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-2 gap-6">
                        <FieldContainer label="Modalidade" icon={MapPin}>
                          <Select defaultValue={preferences.modality} onValueChange={(v: string) => setPreferences({ ...preferences, modality: v })}>
                            <SelectTrigger className="bg-white/10 border-white/20 h-14 rounded-xl px-4"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-navy/95 border-white/10 text-white z-[100] p-2 backdrop-blur-xl">
                              <SelectItem value="passeio" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">Família</SelectItem>
                              <SelectItem value="cicloturismo" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">Cicloturismo</SelectItem>
                              <SelectItem value="cross-country" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">Cross Country</SelectItem>
                              <SelectItem value="tecnico" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">MTB Técnico</SelectItem>
                            </SelectContent>
                          </Select>
                        </FieldContainer>

                        <FieldContainer label="Distância" icon={Ruler}>
                          <Select defaultValue={preferences.mileage} onValueChange={(v: string) => setPreferences({ ...preferences, mileage: v })}>
                            <SelectTrigger className="bg-white/10 border-white/20 h-14 rounded-xl px-4"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-navy/95 border-white/10 text-white z-[100] p-2 backdrop-blur-xl">
                              <SelectItem value="10-20" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">10-20km</SelectItem>
                              <SelectItem value="20-40" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">20-40km</SelectItem>
                              <SelectItem value="40-60" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">40-60km</SelectItem>
                              <SelectItem value="60+" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">60km+</SelectItem>
                            </SelectContent>
                          </Select>
                        </FieldContainer>
                      </div>

                      <FieldContainer label="Estilo de Experiência" icon={Wallet}>
                        <Select defaultValue={preferences.investment} onValueChange={(v: string) => setPreferences({ ...preferences, investment: v })}>
                          <SelectTrigger className="bg-white/10 border-gold/30 h-14 rounded-xl text-gold font-bold px-4"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-navy/95 border-white/10 text-white z-[100] p-2 backdrop-blur-xl">
                            <SelectItem value="economico" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">Econômico - Focado no Pedal</SelectItem>
                            <SelectItem value="padrao" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">Padrão - Escolha Inteligente</SelectItem>
                            <SelectItem value="premium" className="text-white focus:bg-gold/20 focus:text-gold cursor-pointer rounded-lg">VIP - Gourmet & Suporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldContainer>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-xs text-white/40 italic leading-relaxed">
                        Baseado nas suas datas e perfil, prepararemos as melhores trilhas e logística em Poços de Caldas.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "IDENTIFICATION" && (
              <motion.div key="i" className="max-w-2xl mx-auto py-24 text-center space-y-10">
                <h4 className="text-4xl font-display font-bold uppercase tracking-tight">Qual seu e-mail?</h4>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  spellCheck={false}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-20 bg-white/5 border-white/10 text-2xl text-center rounded-2xl shadow-inner focus:border-gold/50"
                />
              </motion.div>
            )}

            {step === "REGISTRATION" && (
              <motion.div key="r" className="max-w-2xl mx-auto py-12 space-y-10">
                <h4 className="text-2xl font-bold text-center text-gold uppercase tracking-widest">Perfil de Piloto</h4>
                <div className="grid gap-8">
                  <FieldContainer label="Como te chamamos?" icon={MapPin}>
                    <Input placeholder="Nome Completo" value={registration.name} autoComplete="name" onChange={(e) => setRegistration({ ...registration, name: e.target.value })} className="bg-white/5 h-14 rounded-xl px-6" />
                  </FieldContainer>
                  <div className="grid grid-cols-2 gap-6">
                    <FieldContainer label="Crie sua Senha" icon={MapPin}>
                      <Input type="password" value={registration.password} placeholder="Mín. 8 chars" onChange={(e) => setRegistration({ ...registration, password: e.target.value })} className="bg-white/5 h-14 rounded-xl px-6" />
                    </FieldContainer>
                    <FieldContainer label="Seu Nível" icon={Ruler}>
                      <Select defaultValue={registration.pilotLevel} onValueChange={(v: string) => setRegistration({ ...registration, pilotLevel: v })}>
                        <SelectTrigger className="bg-white/10 h-14 rounded-xl px-6"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-navy/95 border-gold/30 text-white">
                          <SelectItem value="iniciante">Iniciação</SelectItem>
                          <SelectItem value="intermediario">Intermediário</SelectItem>
                          <SelectItem value="avancado">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10 bg-white/5 flex gap-6">
          {step !== "SUCCESS" && (
            <>
              {step !== "PREFERENCES" && (
                <Button variant="outline" className="flex-1 h-16 rounded-xl border-white/20 bg-gold text-navy hover:bg-white/10 hover:text-white text-lg font-bold" 
                  onClick={() => setStep(step === "IDENTIFICATION" ? "PREFERENCES" : "IDENTIFICATION")}>
                  <ChevronLeft className="mr-2" /> Voltar
                </Button>
              )}
              <Button
                className="flex-[2] h-16 bg-gold hover:bg-white text-navy font-black uppercase tracking-widest rounded-xl text-lg"
                onClick={step === "REGISTRATION" ? handleRegisterAndSubmit : handleNext}
                disabled={loading || (step === "PREFERENCES" && (!dateRange?.from || !dateRange?.to)) || (step === "IDENTIFICATION" && !email)}
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {step === "PREFERENCES" ? "Próximo" : "Confirmar Reserva"}
                    <ChevronRight className="ml-2" />
                  </>
                )}
              </Button>
            </>
          )}
          {step === "SUCCESS" && (
            <Button className="w-full h-16 bg-white text-navy font-bold rounded-xl" onClick={() => onOpenChange(false)}>Concluído</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldContainer({ label, icon: Icon, children }: { label: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2 ml-2">
        <Icon className="w-4 h-4 text-gold/60" /> {label}
      </Label>
      {children}
    </div>
  )
}
