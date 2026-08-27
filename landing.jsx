const { SiteHeader, SiteFooter, WhatsAppFab } = window.GabrielaLucasDesignSystem_113a84;
/* `useBelow` is bundle-internal (lower-case exports never reach the window namespace),
   so this screen watches the breakpoint itself. BP is exposed, so the value still comes
   from the design system rather than being re-typed here. */
const BP = window.GabrielaLucasDesignSystem_113a84.BP || { sm: 560 };

function useBelow(px) {
  const [below, setBelow] = React.useState(
    () => !!window.matchMedia && window.matchMedia('(max-width:' + px + 'px)').matches
  );
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(max-width:' + px + 'px)');
    const sync = () => setBelow(mq.matches);
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [px]);
  return below;
}

const LINKS = [
  { href: '#servicos', label: 'O que trato' },
  { href: '#jornada', label: 'Jornada' },
  { href: '#parto', label: 'Parto' },
  { href: '#estetica', label: 'Estética' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

function Landing() {
  /* Below 560px the labelled pill covers a meaningful slice of a phone screen, so the
     action collapses to the icon disc. */
  const compactFab = useBelow(BP.sm);
  /* Nothing is highlighted at the top of the page: the hero is not a nav destination, so
     starting on '#jornada' would mark a section the visitor has not reached. #topo is
     observed but matches no link, which is what clears the bar. */
  const [active, setActive] = React.useState('');
  React.useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['#topo', ...LINKS.map((l) => l.href)].forEach((href) => {
      const el = document.querySelector(href); if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SiteHeader logo="logo_green.webp" links={LINKS} active={active}
        cta={{ label: 'WhatsApp', href: window.WA }} />
      <main>
        <HeroSection />
        <Manifesto />
        <AnatomySection />
        <ServicesSection />
        <JourneySection />
        <BirthSection />
        <IntimateSection />
        <AboutSection />
        <QuoteBand />
        <HowSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter logo="logo_green.webp"
        note="Fisioterapia pélvica e obstétrica em São Caetano do Sul. Atendimento especializado, humanizado e cientificamente embasado, para todas as fases da vida."
        links={[
          { href: window.WA, label: 'WhatsApp' },
          { href: 'https://www.instagram.com/dra.gabilucas', label: 'Instagram' },
          { href: 'tel:+5511962921540', label: 'Telefone' },
          { href: '#topo', label: 'Voltar ao topo' },
        ]}        legal="© 2026 Gabriela Lucas, Fisioterapia Pélvica e Obstetrícia. Todos os direitos reservados."
        disclaimer="Peça conceitual. As fotografias são registros reais da profissional; a ilustração do bloco de estética íntima e o modelo tridimensional do assoalho pélvico são representações esquemáticas, não são imagem médica nem foto de paciente." />
      <WhatsAppFab href={window.WA} compact={compactFab} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Landing />);
