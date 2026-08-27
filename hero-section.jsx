const { Button, Eyebrow, TrustStats } = window.GabrielaLucasDesignSystem_113a84;
const { useEffect, useRef, useState } = React;

const WA = 'https://wa.me/5511962921540?text=Ol%C3%A1%2C%20Dra.%20Gabriela!%20Vim%20pelo%20site%20e%20queria%20tirar%20uma%20d%C3%BAvida%20antes%20de%20agendar.';

/* Full-bleed hero: the anatomical photograph fills the whole block and the copy sits
   on a white smoke veil that fades out to the right. The image keeps a slow 3D drift
   with the pointer so the band never reads as a flat banner. */
function HeroSection() {
  const band = useRef(null);
  const lines = useRef([]);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  const reduce = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The headline rises with the scroll, each line a little faster than the one above it,
     so the three lines open apart as the hero leaves. Written on the outer (clipping)
     span so it never fights the entrance reveal running on the inner one. Damped the
     same way the photographs are — the lag is what keeps it from feeling dragged. */
  useEffect(() => {
    const RATE = [26, 40, 62], FADE = [.35, .5, .72];
    const damp = reduce ? .34 : 1;
    let raf, cur = 0;
    const frame = () => {
      const el = band.current;
      if (el) {
        const h = el.offsetHeight || 1;
        const target = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / h));
        cur += (target - cur) * .09;
        lines.current.forEach((n, i) => {
          if (!n) return;
          n.style.transform = 'translate3d(0,' + (-RATE[i] * cur * damp).toFixed(2) + 'px,0)';
          n.style.opacity = (1 - cur * FADE[i] * damp).toFixed(3);
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e) => {
    if (reduce) return;
    const r = band.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width - .5) * 2, y: ((e.clientY - r.top) / r.height - .5) * 2 });
  };

  return (
    <section id="topo">
      <div ref={band} className="hero-band" onMouseMove={onMove} onMouseLeave={() => setP({ x: 0, y: 0 })}>

        <div aria-hidden="true" className="hero-stage">
          <img src="hero_anatomia_gestante.jpg" width="1376" height="768"
            alt=""
            className="hero-img"
            style={{ transform: `translateZ(0) scale(${ready ? 1.03 : 1.09}) translate(${p.x * -0.7}%,${p.y * -0.7}%)`,
              opacity: ready ? 1 : 0,
              transition: 'transform 1.4s var(--e),opacity 1.4s var(--e)' }} />
        </div>

        <div aria-hidden="true" className="hero-smoke" />

        <div className="hero-copy">
          <Eyebrow size="kicker" style={{ marginBottom: 24, opacity: ready ? 1 : 0,
            transform: ready ? 'none' : 'translateY(20px)', transition: 'all .85s var(--e)' }}>
            Fisioterapia pélvica e obstétrica
          </Eyebrow>

          {/* Three lines, each clipped so its own reveal slides up from behind the line
             above. The last two carry the serif-italic accent. */}
          <h1 style={{ margin: 0 }}>
            {[
              'Seu corpo',
              <>merece <em>ser</em></>,
              <em>compreendido</em>,
            ].map((ln, i) => (
              <span key={i} ref={(n) => { lines.current[i] = n; }}
                style={{ display: 'block', overflow: 'hidden', willChange: 'transform,opacity' }}>
                <span style={{ display: 'block', transform: ready ? 'none' : 'translateY(108%)',
                  transition: `transform 1.05s var(--e) ${.1 + i * .085}s` }}>{ln}</span>
              </span>
            ))}
          </h1>

          <p style={{ maxWidth: '42ch', color: 'var(--text-body)', margin: '24px 0 30px',
            fontSize: 'var(--fs-lead)', opacity: ready ? 1 : 0,
            transform: ready ? 'none' : 'translateY(20px)', transition: 'all .85s var(--e) .45s' }}>
            Atendimento para mulheres que convivem
            com dor, perda de urina, desconforto na gestação ou dúvidas sobre a
            recuperação depois do parto.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 13, marginBottom: 26,
            opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(20px)',
            transition: 'all .85s var(--e) .54s' }}>
            <Button variant="solid" href="#servicos">Conheça os serviços</Button>
            <Button variant="line" href={WA} target="_blank" rel="noopener">Falar no WhatsApp</Button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max)', margin: 'clamp(40px,5vw,68px) auto 0', padding: '0 var(--pad)' }}>
        <TrustStats items={[
          { value: '20', label: 'anos de experiência' },
          { value: 'HCFMUSP', label: 'especialização' },
          { value: '90%', label: 'formação prática' },
          { value: '5,0', label: 'avaliação no Google' },
        ]} />
      </div>
    </section>
  );
}

Object.assign(window, { HeroSection, WA });
