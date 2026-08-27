const DS = window.GabrielaLucasDesignSystem_113a84;
const { Button, Eyebrow, SectionHead, ServiceCard, JourneyCard, ReviewCard, StepList,
  CaptionedFigure, PullQuote, ContactPanel } = DS;
/* Reveal arrived later than the rest of the library; fall back to a plain wrapper so a
   stale bundle costs the entry animation, not the text. */
const Reveal = DS.Reveal || function RevealFallback({ as: Tag = 'div', children, style }) {
  return <Tag style={style}>{children}</Tag>;
};
/* ScrollMedia arrived later than the rest of the library; fall back to a still frame so a
   stale bundle costs the motion, not the photograph. */
const ScrollMedia = DS.ScrollMedia || function StillMedia({ src, alt = '', ratio, radius, objectPosition, children, style, imgStyle }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: radius, ...style }}>
      <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition, ...imgStyle }} />
      {ratio ? <div aria-hidden="true" style={{ paddingTop: 'calc(100% / (' + ratio + '))' }} /> : null}
      {children}
    </div>
  );
};
/* TestimonialCard arrived later than the rest of the library; fall back to a plain card so a
   stale bundle degrades this one section instead of blanking the page. */
const TestimonialCard = DS.TestimonialCard || function TestimonialFallback({ quote, name, meta }) {
  return (
    <figure style={{ margin: 0, padding: '28px 26px', background: 'var(--card)',
      border: '1px solid var(--line)', borderRadius: 'var(--r)' }}>
      <p style={{ color: 'var(--text-body)', fontSize: '.95rem' }}>{quote}</p>
      <figcaption style={{ fontFamily: 'var(--font-display)', fontSize: '.78rem',
        letterSpacing: 'var(--ls-nav)', textTransform: 'uppercase' }}>{name}
        {meta ? <span style={{ display: 'block', letterSpacing: 0, textTransform: 'none',
          fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>{meta}</span> : null}
      </figcaption>
    </figure>
  );
};
const { useEffect, useRef, useState } = React;

/* ── Manifesto: words light up as the band crosses the viewport ── */
function Manifesto() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);
  const words = ('Escapar xixi ao rir. Sentir dor na relação. Não reconhecer o próprio corpo ' +
    'depois do parto. Nada disso é o preço de ser mulher.').split(' ');
  const tail = 'Tudo isso tem tratamento.'.split(' ');
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * .82 - r.top) / (r.height + window.innerHeight * .35);
      setLit(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const all = words.length + tail.length;
  const w = (t, i, accent) => (
    <span key={i} style={{ display: 'inline-block',
      color: i / all < lit ? (accent ? 'var(--sage)' : 'var(--ink)') : 'rgba(35,31,27,.16)',
      transition: 'color .35s var(--e)' }}>{t}&nbsp;</span>
  );
  return (
    <section ref={ref} style={{ padding: 'var(--section-y-lg) var(--pad)', display: 'grid', placeItems: 'center' }}>
      <p style={{ maxWidth: 'var(--measure-manifesto)', margin: 0, textAlign: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 'var(--fs-manifesto)',
        lineHeight: 'var(--lh-manifesto)', letterSpacing: 'var(--ls-display)', color: 'var(--ink)' }}>
        {words.map((t, i) => w(t, i))}
        <em style={{ display: 'inline' }}>{tail.map((t, i) => w(t, words.length + i, true))}</em>
      </p>
    </section>
  );
}

/* ── Anatomy band: copy beside the 3D net ── */
function AnatomySection() {
  return (
    <section id="anatomia" style={{ background: 'var(--bg-alt)', padding: 'var(--section-y) var(--pad)' }}>
      <div style={{ maxWidth: 'var(--max)', marginInline: 'auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 'var(--grid-gap-lg)', alignItems: 'center' }}>
        <PelvicFloor3D />
        <div>
          <Reveal y={16} duration={0.7}>
            <Eyebrow style={{ marginBottom: 18 }}>O que é o assoalho pélvico</Eyebrow>
          </Reveal>
          <Reveal as="h2" words y={26} stagger={0.042} delay={0.08} style={{ marginBottom: 22 }}>A rede de músculos que <em>sustenta</em> tudo</Reveal>
          <Reveal stagger={0.085} y={20} delay={0.24}>
          <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>É uma rede de músculos e tecidos presa entre o púbis e o cóccix, dentro da cintura pélvica. Ela sustenta a bexiga, o útero e o intestino, controla a continência e participa da função sexual.</p>
          <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>Quando essa rede perde força, coordenação ou capacidade de relaxar, aparecem os sintomas: perda de urina, dor, sensação de peso, dificuldade para evacuar. O tratamento não é sobre apertar mais. É sobre reeducar como esses músculos trabalham.</p>
          <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'grid' }}>
            {[['Sustenta', 'bexiga, útero e intestino'], ['Controla', 'continência urinária e fecal'], ['Participa', 'da função sexual e do parto']].map(([b, s], i, a) => (
              <li key={b} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '15px 0',
                borderTop: '1px solid var(--line)',
                borderBottom: i === a.length - 1 ? '1px solid var(--line)' : undefined }}>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: '.7rem', fontWeight: 500,
                  letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sage-d)', minWidth: 92 }}>{b}</b>
                <span style={{ color: 'var(--text-body)', fontSize: '.96rem' }}>{s}</span>
              </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Services: the cards get a light 3D tilt toward the pointer ── */
const SERVICES = [
  ['incontinencia-urinaria', 'Incontinência urinária',
    'Perda de urina ao rir, tossir, espirrar, treinar ou por urgência súbita. Reeducação do assoalho pélvico, sem cirurgia e sem medicamento.'],
  ['incontinencia-fecal', 'Incontinência fecal e anal',
    'Reeducação da musculatura esfincteriana e treino de continência, para devolver segurança na vida social e profissional.'],
  ['constipacao', 'Constipação intestinal',
    'Reeducação do padrão evacuatório e da coordenação abdominopélvica, com orientação de hábitos.'],
  ['disfuncoes-sexuais', 'Disfunções sexuais',
    'Dispareunia, vaginismo, vulvodínia e cuidados com neovagina, com terapia manual e dessensibilização progressiva.'],
  ['dores-pelvicas', 'Dores pélvicas',
    'Dor pélvica crônica, dismenorreia e síndromes pélvicas tratadas com liberação miofascial e reeducação funcional.'],
  ['prolapsos', 'Prolapsos',
    'Fortalecimento e estratégias de manejo para reduzir a sensação de peso e melhorar a qualidade de vida.'],
  ['diastase', 'Diástase abdominal',
    'Reeducação do core e coordenação respiratória, com progressão funcional dos exercícios.'],
  ['pre-pos-cirurgico', 'Complicações cicatriciais pós-cesariana',
    'Aderência, retração e queloide na cicatriz de cesárea. Liberação miofascial e dessensibilização, mesmo anos depois do parto.'],
  ['pre-pos-cirurgico', 'Pré e pós-cirúrgico',
    'Preparo antes e reabilitação depois de cirurgias ginecológicas, urológicas e proctológicas.'],
  ['kinesio-taping', 'Kinesio Taping',
    'Aplicado em disfunções pélvicas, gestação e puerpério, sempre respaldado por artigos científicos de alta qualidade.'],
];

function TiltCard({ children }) {
  const ref = useRef(null);
  const [t, setT] = useState('none');
  return (
    <div ref={ref} style={{ perspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 7;
        const y = ((e.clientY - r.top) / r.height - .5) * -7;
        setT(`rotateX(${y}deg) rotateY(${x}deg)`);
      }}
      onMouseLeave={() => setT('none')}>
      <div style={{ transform: t, transformStyle: 'preserve-3d', height: '100%',
        transition: 'transform .5s var(--e)' }}>{children}</div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="servicos" style={{ padding: 'var(--section-y) var(--pad)', maxWidth: 'var(--max)', marginInline: 'auto' }}>
      <SectionHead eyebrow="O que eu trato" title={<>Abordagem funcional e <em>individualizada</em></>}
        lead="Alta complexidade, para mulheres, homens e a comunidade LGBTQIA+. Cada plano nasce de uma avaliação, nunca de um protocolo pronto." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(248px,100%),1fr))', gap: 'var(--grid-gap)' }}>
        {SERVICES.map(([icon, title, body], i) => (
          <TiltCard key={title}>
            <ServiceCard icon={icon} title={title} index={i} style={{ height: '100%' }}>{body}</ServiceCard>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

/* ── Journey: horizontal track, drag or scroll ── */
const PHASES = [
  ['Fase 01', 'Gestação', 'Preparo do assoalho pélvico ao longo de todos os trimestres, para facilitar o parto, reduzir o risco de lacerações e diminuir a chance de incontinência depois.'],
  ['Fase 02', 'Preparo para o parto', 'Respiração, consciência corporal e mobilidade pélvica. Vale para parto normal e para cesárea, porque o corpo precisa se recuperar dos dois.'],
  ['Fase 03', 'O parto', 'Assistência intra parto: eu vou com você para a maternidade e fico ao seu lado durante o trabalho de parto.'],
  ['Fase 04', 'Pós-parto imediato', 'Ainda na maternidade, kinesio taping e laserterapia para amamentação, dor perineal e cicatriz.'],
  ['Fase 05', 'Recuperação', 'Diástase abdominal, cicatriz de cesárea, retorno aos exercícios e à vida sexual. Sem pressa, sem comparação e sem julgamento.'],
  ['Fase 06', 'Autonomia', 'A alta chega com orientação prática para manter o resultado em casa. O objetivo sempre foi você não precisar mais de mim.'],
];

function JourneySection() {
  return (
    <section id="jornada" style={{ background: 'var(--bg-alt)', paddingBlock: 'clamp(60px,8vh,90px)', overflow: 'hidden' }}>
      <div style={{ paddingInline: 'var(--pad)', maxWidth: 'var(--max)', marginInline: 'auto', width: '100%' }}>
        <Reveal y={16} duration={0.7}>
          <Eyebrow style={{ marginBottom: 18 }}>Da gestação ao pós-parto</Eyebrow>
        </Reveal>
        <Reveal as="h2" words y={26} stagger={0.042} delay={0.08}
          style={{ maxWidth: '18ch' }}>Uma jornada acompanhada <em>fase a fase</em></Reveal>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(16px,2vw,26px)', paddingInline: 'var(--pad)',
        marginTop: 'clamp(32px,4.4vw,54px)', overflowX: 'auto', scrollSnapType: 'x proximity',
        paddingBottom: 12, scrollbarWidth: 'none' }}>
        {PHASES.map(([i, t, b], n) => (
          <JourneyCard key={t} index={i} order={n} title={t} style={{ scrollSnapAlign: 'start' }}>{b}</JourneyCard>
        ))}
      </div>
    </section>
  );
}

/* ── About ── */
function AboutSection() {
  return (
    <section id="sobre" style={{ maxWidth: 'var(--max)', marginInline: 'auto',
      padding: 'var(--section-y) var(--pad)', display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 'var(--grid-gap-lg)', alignItems: 'center' }}>
      {/* The portrait carries the page's one lateral drift — it is the only photograph
         beside a column of text, so the sideways travel reads against the type. */}
      <ScrollMedia src="retrato.webp" alt="Retrato da Dra. Gabriela Lucas"
        ratio="3/4" radius={32} parallax={54} drift={18} zoom={0.07} breathe={0.008}
        style={{ maxWidth: 420, width: '100%' }}>
        <figcaption style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2,
          background: 'var(--sage-d)', color: '#fff', padding: '14px 22px', borderRadius: '0 16px 0 0',
          fontFamily: 'var(--font-display)', fontSize: 'var(--fs-label)',
          letterSpacing: 'var(--ls-label)', textTransform: 'uppercase' }}>Dra. Gabriela Lucas</figcaption>
      </ScrollMedia>
      <div>
        <Reveal y={16} duration={0.7}>
          <Eyebrow style={{ marginBottom: 18 }}>Quem cuida de você</Eyebrow>
        </Reveal>
        <Reveal as="h2" words y={26} stagger={0.042} delay={0.08} style={{ marginBottom: 24 }}>Vinte anos ouvindo o que ninguém <em>perguntava</em></Reveal>
        <Reveal stagger={0.08} y={20} delay={0.24}>
        <p style={{ color: 'var(--text-body)', maxWidth: 'var(--measure-body)' }}>Foram duas décadas atendendo mulheres na área dermatofuncional. Elas chegavam falando de estética e, no meio da conversa, contavam outra coisa: que perdiam xixi, que sentiam dor na relação, que não tinham voltado a ser as mesmas depois do parto.</p>
        <p style={{ color: 'var(--text-body)', maxWidth: 'var(--measure-body)' }}>Na maioria das vezes elas nem sabiam que aquilo tinha tratamento. Foi aí que a especialização deixou de ser curiosidade e virou necessidade.</p>
        <p style={{ color: 'var(--text-body)', maxWidth: 'var(--measure-body)' }}>Especializei-me no Hospital das Clínicas da Faculdade de Medicina da USP, com vivência em ambulatório, enfermaria e centro obstétrico. A formação foi <strong>noventa por cento prática</strong>, discutindo casos reais todos os dias com mestres de mais de quinze anos de experiência. Depois vieram mais doze meses de programa trainee.</p>
        <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'var(--fs-signature)',
          color: 'var(--sage)', marginTop: 6 }}>Gabriela Lucas</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── How it works ── */
function HowSection() {
  return (
    <section id="como" style={{ maxWidth: 'var(--max)', marginInline: 'auto', padding: 'var(--section-y) var(--pad)' }}>
      <SectionHead eyebrow="Como funciona" title={<>Começa com uma <em>conversa</em></>}
        lead="Você não precisa chegar com diagnóstico nem com coragem pronta. Começa mandando uma mensagem." />
      <StepList steps={[
        { title: 'Você me manda uma mensagem', body: 'Conta o que está sentindo, no seu tempo e com as suas palavras. Nesse momento já dá para tirar dúvidas, sem compromisso e sem agendar nada.' },
        { title: 'Avaliação completa', body: 'Anamnese detalhada e avaliação funcional do assoalho pélvico. Cada etapa é explicada antes de acontecer e só segue com o seu consentimento.' },
        { title: 'Plano individualizado', body: 'Você recebe objetivos, técnicas indicadas, estimativa de sessões e o que esperar em cada fase. Nada de protocolo genérico.' },
        { title: 'Sessões e reavaliação', body: 'As sessões acontecem no seu ritmo, com reavaliações periódicas para ajustar o plano conforme a sua evolução real.' },
        { title: 'Autonomia', body: 'A alta vem com orientação prática para manter o resultado em casa. O objetivo é você não precisar mais de mim para viver bem.' },
      ]} />
    </section>
  );
}

/* ── Reviews ── */
const GOOGLE = 'https://www.google.com.br/maps/place/Dra.+Gabriela+Lucas+%7C+Fisioterapeuta+P%C3%A9lvica+e+Obst%C3%A9trica';
const REVIEWS = [
  { name: 'Jéssica Kroth', meta: '4 avaliações · 10 meses atrás',
    quote: 'A Gabriela é uma excelente fisioterapeuta! Desde o primeiro contato, me deixou totalmente à vontade como paciente, sempre atenciosa, cuidadosa e disposta a explicar tudo com clareza. Para além do conhecimento técnico, tem carinho e dedicação. Ela realmente se importa com o bem-estar do paciente e faz o seu trabalho com brilho nos olhos, o que torna todo o processo muito mais leve e motivador. Além disso, tem uma escuta muito acolhedora, transmite confiança e cria um ambiente de cuidado e empatia. Foi um prazer enorme ter essa experiência com ela durante a minha gestação, recomendo!' },
  { name: 'Caroline Nogueira', meta: '5 avaliações · 10 meses atrás',
    quote: 'Dra Gabriela me atendeu super bem durante a gestação, fiz drenagens com ela durante este período. Sem contar o atendimento na maternidade do taping e laser me auxiliando na amamentação. Uma profissional atenciosa, empática e muito competente! Vou continuar paciente com certeza! Nota 10000' },
  { name: 'Fernanda Duarte', meta: '8 avaliações · 2 meses atrás',
    quote: 'A Gabi é uma excelente profissional, seja do ponto de vista técnico, como do ponto de vista humano. A encontrei no ultimo trimestre da minha gestação e foi a melhor coisa que aconteceu! Ela me deu todas as orientações para o parto e os exercicios preparatórios para o parto normal! Agora seguimos com acompanhamento pós parto com uso do laser para amamentacao. Quem tiver condicoes, faça fisio pelvica é um grande aliado para nosso corpo!!!' },
];

const REVIEW_COL = 300, REVIEW_GAP = 30;

function ReviewsSection() {
  /* The stagger only makes sense when all three cards sit on one row. The column count is
     derived arithmetically from the measured container width — reading back the resolved
     auto-fit track list samples too early to be trusted. */
  const grid = React.useRef(null);
  const [cols, setCols] = React.useState(0);
  React.useEffect(() => {
    const el = grid.current; if (!el) return;
    const read = () => {
      const w = el.getBoundingClientRect().width;
      setCols(Math.max(1, Math.floor((w + REVIEW_GAP) / (REVIEW_COL + REVIEW_GAP))));
    };
    read();
    if (!window.ResizeObserver) { window.addEventListener('resize', read); return () => window.removeEventListener('resize', read); }
    const ro = new ResizeObserver(read); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const step = cols >= REVIEWS.length ? 30 : 0;
  return (
    <section id="avaliacoes" style={{ background: 'var(--bg-alt)', padding: 'var(--section-y) var(--pad)' }}>
      <div style={{ maxWidth: 'var(--max)', marginInline: 'auto' }}>
        <SectionHead center eyebrow="Avaliações" title={<>Nota <em>5,0</em> no Google</>}
          lead="Avaliações reais de pacientes, transcritas do perfil do Google exatamente como foram publicadas. Os textos mais longos aparecem resumidos aqui — o completo está no Google."
          action={<Button variant="line" href={GOOGLE} target="_blank" rel="noopener">Ler no Google</Button>} />
        <div ref={grid} style={{ display: 'grid',
          gridTemplateColumns: `repeat(auto-fit,minmax(min(${REVIEW_COL}px,100%),1fr))`,
          gap: REVIEW_GAP, paddingBottom: step * (REVIEWS.length - 1),
          /* start, not stretch: the cards hug their content. The quotes are levelled by
             clamping the text instead, so nothing has to be padded out to a common
             height. */
          alignItems: 'start' }}>
          {REVIEWS.map((r, i) => (
            <TestimonialCard key={r.name} index={i} step={step} lines={9}
              name={r.name} meta={r.meta} quote={r.quote} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function ContactSection() {
  return (
    <section id="contato" style={{ padding: 'var(--section-y) var(--pad)', maxWidth: 'var(--max)', marginInline: 'auto' }}>
      <ContactPanel eyebrow="Contato" title={<>Me conta o que <em>você sente</em></>}
        lead="Sem formulário, sem espera. Você manda uma mensagem, eu respondo pessoalmente e a gente decide junto se faz sentido marcar uma avaliação."
        actions={<>
          <Button variant="solid" href={window.WA} target="_blank" rel="noopener">Falar no WhatsApp</Button>
          <Button variant="line" href="tel:+5511962921540">(11) 96292-1540</Button>
        </>}
        details={[
          { term: 'Consultório', value: <>Rua Amazonas, 669, sala 14<br />Santa Paula, São Caetano do Sul/SP</> },
          { term: 'Horário', value: 'Segunda a sexta, 08h às 19h' },
          /* The one link in this list: it needs a finger-sized hit area, while the other
             three details are plain text and must keep their normal line box. Hence the
             fix at the call site rather than on every <dd>. */
          { term: 'Instagram', value: <a href="https://www.instagram.com/dra.gabilucas" target="_blank" rel="noopener"
            style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, marginTop: -11 }}>@dra.gabilucas</a> },
          { term: 'Onde atendo', value: <>Somente no consultório, em São Caetano do Sul.<br />Não faço home care.</> },
        ]} />
    </section>
  );
}

/* The staircase band is the page's slowest, largest move: it widens past the gutter and
   lets its corners go as you pass it, so the photograph takes the screen instead of
   sitting in it. Deliberately the only `expand` on the page. */
function QuoteBand() {
  return (
    <ScrollMedia src="escada.webp" alt="" parallax={96} zoom={0.11}
      expand={90} radius={32} breathe={0.006}
      style={{ minHeight: '78svh', marginInline: 'var(--pad)' }}>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg,rgba(35,31,27,.26),rgba(35,31,27,.44))' }} />
    </ScrollMedia>
  );
}

/* ── Assistência intra parto + pós-parto imediato ──
   Distinct from the journey track: this is the one service that happens outside the
   consulting room, so it needs to say where, and to reconcile itself with the no-home-care
   rule stated in the contact panel. */
function BirthSection() {
  return (
    <section id="parto" style={{ maxWidth: 'var(--max)', marginInline: 'auto',
      padding: 'var(--section-y) var(--pad)', display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 'var(--grid-gap-lg)', alignItems: 'center' }}>
      <div>
        <Reveal y={16} duration={0.7}>
          <Eyebrow style={{ marginBottom: 18 }}>Assistência intra parto</Eyebrow>
        </Reveal>
        <Reveal as="h2" words y={26} stagger={0.042} delay={0.08} style={{ marginBottom: 22 }}>Eu vou com você para a <em>maternidade</em></Reveal>
        <Reveal stagger={0.085} y={20} delay={0.24}>
          <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>Chega o dia e você não precisa estar sozinha com o próprio corpo. A assistência intra parto é o acompanhamento durante o trabalho de parto, na maternidade que você escolheu, ao lado de quem você escolheu ter por perto.</p>
          <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>Não substituo a equipe médica nem a obstetriz. Trabalho junto delas, cuidando do que é meu: como você respira, como se posiciona, como a pelve se move e como a dor pode ser suportada sem que você perca o controle da situação.</p>
          <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'grid' }}>
            {[
              ['Durante o trabalho de parto', 'Posições que abrem espaço para o bebê, respiração, mobilidade da pelve e alívio de dor sem medicamento.'],
              ['Parto normal ou cesárea', 'Os dois têm recuperação, e os dois merecem preparo. Não existe parto certo, existe o seu.'],
              ['Nas primeiras horas', 'Ainda no quarto: kinesio taping e laserterapia para amamentação, dor perineal e cicatriz recente.'],
            ].map(([b, t], i, a) => (
              <li key={b} style={{ padding: '17px 0', borderTop: '1px solid var(--line)',
                borderBottom: i === a.length - 1 ? '1px solid var(--line)' : undefined }}>
                <b style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '.7rem',
                  fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase',
                  color: 'var(--sage-d)', marginBottom: 7 }}>{b}</b>
                <span style={{ color: 'var(--text-body)', fontSize: '.95rem' }}>{t}</span>
              </li>
            ))}
          </ul>
          <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', maxWidth: '50ch', marginTop: 22 }}>Este é o único atendimento que acontece fora do consultório, e ele acontece na maternidade. Não faço home care.</p>
          <div style={{ marginTop: 26 }}>
            <Button variant="solid" href={window.WA} target="_blank" rel="noopener">Falar sobre o meu parto</Button>
          </div>
        </Reveal>
      </div>
      {/* Native ratio 949×1657 — the file is two stacked photographs, so any 3/4 crop
         would cut one of them in half. */}
      <ScrollMedia src="maternidade.png"
        alt="Dra. Gabriela Lucas acompanhando uma paciente na maternidade, durante o trabalho de parto"
        ratio="949/1657" radius={32} parallax={62} zoom={0.06}
        style={{ maxWidth: 400, width: '100%', justifySelf: 'end' }}>
        <figcaption style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2,
          background: 'var(--sage-d)', color: '#fff', padding: '14px 22px', borderRadius: '0 16px 0 0',
          fontFamily: 'var(--font-display)', fontSize: 'var(--fs-label)',
          letterSpacing: 'var(--ls-label)', textTransform: 'uppercase' }}>Na maternidade</figcaption>
      </ScrollMedia>
    </section>
  );
}

/* ── Estética íntima ──
   Written to the brand's anti-shame rule: the section has to offer the treatment without
   manufacturing the insecurity that would sell it. Hence the closing line. */
function IntimateSection() {
  return (
    <section id="estetica" style={{ background: 'var(--bg-alt)', padding: 'var(--section-y) var(--pad)' }}>
      <div style={{ maxWidth: 'var(--max)', marginInline: 'auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 'var(--grid-gap-lg)', alignItems: 'center' }}>
        {/* An illustration, not a photograph: its own ground is cream, and it has a drawn
           gold edge that must not be cropped. Hence `contain` inside a frame slightly
           taller than the artwork (928×1152 = 0.806, frame 0.72), which leaves matting
           room for the parallax to move into instead of exposing a hard edge. */}
        <ScrollMedia src="estetica_intima.jpg"
          alt="Ilustração botânica abstrata em tons de blush, evocando a anatomia íntima feminina"
          ratio="18/25" radius={32} parallax={38} zoom={0.04}
          imgStyle={{ objectFit: 'contain' }}
          style={{ maxWidth: 430, width: '100%', background: 'var(--paper)' }}>
          <figcaption style={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2,
            background: 'var(--sage-d)', color: '#fff', padding: '14px 22px', borderRadius: '0 16px 0 0',
            fontFamily: 'var(--font-display)', fontSize: 'var(--fs-label)',
            letterSpacing: 'var(--ls-label)', textTransform: 'uppercase' }}>Ilustração</figcaption>
        </ScrollMedia>
        <div>
          <Reveal y={16} duration={0.7}>
            <Eyebrow style={{ marginBottom: 18 }}>Estética íntima</Eyebrow>
          </Reveal>
          <Reveal as="h2" words y={26} stagger={0.042} delay={0.08} style={{ marginBottom: 22 }}>Cuidar da aparência sem abrir mão da <em>função</em></Reveal>
          <Reveal stagger={0.085} y={20} delay={0.24}>
            <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>A região íntima muda ao longo da vida, e nem sempre discretamente. Atrito de roupa, depilação, gestação, parto e queda hormonal escurecem a pele, ressecam a mucosa e mudam o viço e a firmeza dos tecidos.</p>
            <p style={{ color: 'var(--text-body)', maxWidth: '50ch' }}>Vinte anos na área dermatofuncional vieram antes da fisioterapia pélvica, e é essa dupla formação que faz diferença aqui: eu trato a pele sabendo exatamente o que existe embaixo dela.</p>
            <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'grid' }}>
              {[
                ['Clareamento', 'Uniformização do tom da virilha, da vulva e da região perianal, com ativos e laserterapia.'],
                ['Rejuvenescimento', 'Firmeza, viço e hidratação da mucosa, especialmente no pós-parto e no climatério.'],
                ['Sempre com função', 'Nenhum protocolo estético entra sem avaliação do assoalho pélvico. Estética não passa na frente de saúde.'],
              ].map(([b, t], i, a) => (
                <li key={b} style={{ padding: '17px 0', borderTop: '1px solid var(--line)',
                  borderBottom: i === a.length - 1 ? '1px solid var(--line)' : undefined }}>
                  <b style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '.7rem',
                    fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase',
                    color: 'var(--sage-d)', marginBottom: 7 }}>{b}</b>
                  <span style={{ color: 'var(--text-body)', fontSize: '.95rem' }}>{t}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1.3rem',
              color: 'var(--sage)', maxWidth: '42ch', marginTop: 24 }}>Se isso te incomoda, tem tratamento. Se não te incomoda, não é problema nenhum.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Manifesto, AnatomySection, ServicesSection, JourneySection,
  BirthSection, IntimateSection,
  AboutSection, HowSection, ReviewsSection, ContactSection, QuoteBand, TiltCard });
