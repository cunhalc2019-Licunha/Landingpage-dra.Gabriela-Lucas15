/* The service concept made spatial: a suspended net of layers that holds
   what sits above it. Pointer orbits the scene, scroll separates the strata. */
const { useEffect, useRef, useState } = React;

const LAYERS = [
  { z: -120, label: 'Fáscia',        scale: 1.06, opacity: .30 },
  { z: -60,  label: 'Camada profunda', scale: 1.02, opacity: .40 },
  { z: 0,    label: 'Diafragma pélvico', scale: 1, opacity: .52 },
  { z: 60,   label: 'Camada superficial', scale: .97, opacity: .40 },
  { z: 120,  label: 'Períneo',       scale: .93, opacity: .30 },
];

function PelvicFloor3D({ caption }) {
  const wrap = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spread, setSpread] = useState(0.35);
  const [active, setActive] = useState(2);
  const reduce = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) { setSpread(1); return; }
    const onScroll = () => {
      const el = wrap.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = 1 - Math.min(1, Math.max(0, (r.top + r.height * .3) / window.innerHeight));
      setSpread(0.35 + p * 0.9);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  const onMove = (e) => {
    if (reduce) return;
    const r = wrap.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - .5) * -16,
      y: ((e.clientX - r.left) / r.width - .5) * 26,
    });
  };

  return (
    <figure style={{ margin: 0 }}>
    <div ref={wrap} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ position: 'relative', aspectRatio: 1, borderRadius: 'var(--r-l)',
        overflow: 'hidden', background: 'var(--grad-anat)', display: 'flex',
        flexDirection: 'column', justifyContent: 'flex-end',
        perspective: 1200, perspectiveOrigin: '50% 42%' }}>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0,
        transformStyle: 'preserve-3d', pointerEvents: 'none',
        transform: `rotateX(${58 + tilt.x}deg) rotateZ(${tilt.y}deg)`,
        transition: 'transform 1.1s var(--e)' }}>

        {LAYERS.map((l, i) => (
          <div key={l.label}
            style={{ position: 'absolute', left: '50%', top: '44%',
              width: '58%', aspectRatio: '1.24',
              transform: `translate(-50%,-50%) translateZ(${l.z * spread}px) scale(${l.scale})`,
              transformStyle: 'preserve-3d',
              transition: 'transform 1.2s var(--e),opacity .6s var(--e)',
              opacity: i === active ? Math.min(1, l.opacity + .34) : l.opacity,
              borderRadius: '52% 48% 44% 56%/58% 54% 46% 42%',
              border: '1px solid rgba(255,255,255,.72)',
              background: 'repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 1px,transparent 1px 13px),repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 1px,transparent 1px 13px)',
              boxShadow: 'inset 0 0 40px rgba(255,255,255,.16)' }} />
        ))}

        {/* what the net carries */}
        <div style={{ position: 'absolute', left: '50%', top: '44%', width: '22%', aspectRatio: 1,
          transform: `translate(-50%,-50%) translateZ(${-240 * spread}px) rotateX(-58deg)`,
          transition: 'transform 1.2s var(--e)', borderRadius: '50%',
          background: 'radial-gradient(circle at 34% 30%,rgba(255,255,255,.9),rgba(227,210,192,.55) 58%,rgba(227,210,192,0))',
          filter: 'blur(.3px)' }} />
      </div>

      <ul style={{ position: 'absolute', top: 22, left: 24, listStyle: 'none', margin: 0, padding: 0,
        display: 'grid', gap: 4, zIndex: 3 }}>
        {LAYERS.map((l, i) => (
          <li key={l.label}>
            <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              /* minHeight, not more padding: .62rem gives a ~17px line box, so even
                 11px of padding tops out at 39px — 5px under a finger. */
              style={{ fontFamily: 'var(--font-display)', fontSize: '.62rem', letterSpacing: '.18em',
                textTransform: 'uppercase', padding: '0 13px', minHeight: 44,
                display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--r-pill)',
                color: i === active ? 'var(--sage-d)' : 'rgba(255,255,255,.78)',
                background: i === active ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.1)',
                transition: 'all var(--dur-fast) var(--e)' }}>{l.label}</button>
          </li>
        ))}
      </ul>
    </div>
    </figure>
  );
}

Object.assign(window, { PelvicFloor3D });
