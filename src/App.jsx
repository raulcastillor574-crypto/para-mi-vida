import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { chapters, heroPhoto, videos } from "./data/memories.jsx";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const photoEntrances = [
  { hidden: { opacity: 0, y: 34, scale: .96 }, visible: { opacity: 1, y: 0, scale: 1 } },
  { hidden: { opacity: 0, rotate: -5, scale: .9 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  { hidden: { opacity: 0, x: -38, rotate: -2 }, visible: { opacity: 1, x: 0, rotate: 0 } },
  { hidden: { opacity: 0, x: 38, rotate: 2 }, visible: { opacity: 1, x: 0, rotate: 0 } },
  { hidden: { opacity: 0, scale: 1.08, filter: "blur(9px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)" } },
  { hidden: { opacity: 0, y: -26, scale: .94, rotate: 3 }, visible: { opacity: 1, y: 0, scale: 1, rotate: 0 } },
  { hidden: { opacity: 0, scaleX: .74, scaleY: .94 }, visible: { opacity: 1, scaleX: 1, scaleY: 1 } },
  { hidden: { opacity: 0, y: 24, scale: .92, rotate: -2 }, visible: { opacity: 1, y: 0, scale: 1, rotate: 0 } }
];
const photoTints = ["#d8b9ef", "#efb8ce", "#c8c3f2", "#f1c2b6", "#d5b7dc", "#f0bfd9", "#c2d7e9", "#e6c4ee"];

function useBirthdayCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const update = () => setNow(new Date());
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  let year = now.getFullYear();
  let birthday = Date.UTC(year, 10, 7);
  if (today > birthday) birthday = Date.UTC(++year, 10, 7);
  return Math.round((birthday - today) / 86_400_000);
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const links = [["ninez", "Su niñez"], ["vocacion", "Su vocación"], ["ella", "Ella, simplemente"], ["video", "El video"], ["carta", "La carta ♡"]];
  return <header className="site-header">
    <a className="wordmark" href="#inicio" aria-label="Para ti, inicio"><span className="wordmark__mark" aria-hidden="true">l.</span><span>para ti<span className="wordmark__note">un día para celebrar</span></span></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span className="menu-toggle__label">{open ? "Cerrar" : "Explorar"}</span><span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span></button>
    <nav className={`navigation${open ? " is-open" : ""}`} id="primary-navigation" aria-label="Navegación principal">
      {links.map(([id, label], index) => <a key={id} className={index === 4 ? "navigation__letter" : ""} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </header>;
}

function Hero({ onPhoto }) {
  const days = useBirthdayCountdown();
  const reduce = useReducedMotion();
  const heroMotion = reduce ? { visible: { opacity: 1, y: 0 } } : reveal;
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <div className="hero__glow hero__glow--one" aria-hidden="true" /><div className="hero__glow hero__glow--two" aria-hidden="true" /><div className="hero__grain" aria-hidden="true" />
    <motion.div className="hero__content" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .35 }} variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}>
      <motion.p className="eyebrow" variants={heroMotion}><span className="eyebrow__line" /> FELIZ CUMPLEAÑOS, MI AMOR <span className="eyebrow__heart" aria-hidden="true">♡</span></motion.p>
      <motion.h1 id="hero-title" variants={heroMotion}>Hoy es tu día,<br />hoy celebramos<br /><em>que seas tú.</em></motion.h1>
      <motion.p className="hero__description" variants={heroMotion}>Un pequeño rincón para celebrar quién eres, lo que sueñas y todos los momentos que merecen quedarse.</motion.p>
      <motion.div className="birthday-countdown" aria-live="polite" aria-atomic="true" variants={heroMotion}><span className="birthday-countdown__icon" aria-hidden="true">♡</span><div><span className="birthday-countdown__eyebrow">CADA 7 DE NOVIEMBRE</span><p><strong>{days === 0 ? "¡Hoy!" : days}</strong><span>{days === 0 ? "es tu día, feliz cumpleaños" : days === 1 ? "día para tu cumpleaños" : "días para tu cumpleaños"}</span></p></div></motion.div>
      <motion.a className="button button--primary" href="#ninez" variants={heroMotion}>Este día es para ti <span className="button__arrow" aria-hidden="true">↓</span></motion.a>
    </motion.div>
    <motion.div className="hero__art" initial={reduce ? false : { opacity: 0, scale: .96, y: 16 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ amount: .3 }} transition={{ duration: reduce ? 0 : .9, delay: reduce ? 0 : .25, ease: [.2, .7, .2, 1] }}>
      <div className="hero__halo hero__halo--outer" /><div className="hero__halo hero__halo--inner" />
      <button className="hero__portrait photo-trigger" type="button" onClick={() => onPhoto(heroPhoto)} aria-label={`Ampliar fotografía: ${heroPhoto.text}`}><img src={heroPhoto.src} alt={heroPhoto.alt} fetchPriority="high" /><span className="hero__portrait-caption">{heroPhoto.title}</span></button>
      <span className="hero__spark hero__spark--one" aria-hidden="true">✳</span><span className="hero__spark hero__spark--two" aria-hidden="true">✧</span><span className="hero__spark hero__spark--three" aria-hidden="true">·</span><span className="hero__floating-heart" aria-hidden="true">♡</span><span className="hero__side-note">UN DÍA PARA CELEBRARTE</span>
    </motion.div>
    <a className="hero__scroll" href="#ninez"><span className="hero__scroll-line" /><span>DESLIZA PARA DESCUBRIR</span></a><span className="hero__chapter" aria-hidden="true">07 DE NOVIEMBRE <i /> TU DÍA</span>
  </section>;
}

function PhotoCard({ photo, index, onPhoto }) {
  const reduce = useReducedMotion();
  const tone = (index * 3 + Math.floor(index / photoTints.length)) % photoTints.length;
  const entrance = photoEntrances[index % photoEntrances.length];
  const variation = (index * 7) % 11 - 5;
  const hidden = { ...entrance.hidden };
  if (typeof hidden.x === "number") hidden.x += variation * 2;
  if (typeof hidden.y === "number") hidden.y += variation * 2;
  if (typeof hidden.rotate === "number") hidden.rotate += variation * .35;
  const variants = reduce ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : { hidden, visible: entrance.visible };
  return <motion.button className={`memory-photo photo-trigger ${photo.layout}`} data-tone={tone} style={{ "--photo-tint": photoTints[tone], "--shine-delay": `${tone * 90}ms` }} type="button" onClick={() => onPhoto(photo)} aria-label={`Ampliar fotografía: ${photo.text}`} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .12 }} variants={variants} transition={{ duration: reduce ? 0 : .62 + (tone % 3) * .08, delay: reduce ? 0 : (tone % 4) * .055, ease: [.2, .7, .2, 1] }} whileHover={reduce ? undefined : { y: -6, scale: 1.012, boxShadow: `0 22px 48px ${photoTints[tone]}66` }} whileTap={reduce ? undefined : { scale: .985 }}>
    <span className="memory-photo__visual"><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /><motion.span className="memory-photo__shine" aria-hidden="true" initial={{ opacity: 0 }} whileInView={{ opacity: reduce ? 0 : [0, .48, .1] }} viewport={{ amount: .2 }} transition={{ duration: reduce ? 0 : 1.25, delay: reduce ? 0 : (tone % 5) * .09 }} /></span><span>{photo.title}</span><small>{photo.text}</small>
  </motion.button>;
}

function PhotoChapter({ chapter, onPhoto, children }) {
  const reduce = useReducedMotion();
  return <section className={`photo-chapter${chapter.soft ? " photo-chapter--soft" : " section-shell"}`} id={chapter.id}>
    <div className={chapter.soft ? "section-shell" : ""}>
      <motion.div className="photo-chapter__heading" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .35 }} variants={reduce ? { visible: { opacity: 1, y: 0 } } : reveal} transition={{ duration: reduce ? 0 : .6 }}>
        <p className="eyebrow"><span className="eyebrow__line" /> {chapter.label}</p><h2>{chapter.title}</h2><p className="section-copy">{chapter.description}</p>
      </motion.div>
      <div className="memory-gallery" aria-label={chapter.ariaLabel}>
        {chapter.photos.map((photo, index) => <PhotoCard key={photo.src} photo={photo} index={index + ({ ninez: 0, vocacion: 4, ella: 9 }[chapter.id] ?? 0)} onPhoto={onPhoto} />)}
        {children}
      </div>
    </div>
  </section>;
}

function PhotoUpload({ onSaved }) {
  const [day, setDay] = useState("");
  const [status, setStatus] = useState("Las fotos se guardan en este dispositivo.");
  const inputRef = useRef(null);
  const save = async (fileList) => {
    const selected = Array.from(fileList || []);
    const files = selected.filter((file) => file.type.startsWith("image/") && file.size <= 40 * 1024 * 1024);
    const skipped = selected.length - files.length;
    if (!files.length) { setStatus("Elige imágenes de hasta 40 MB para agregarlas al álbum."); return; }
    const added = files.map((file) => ({ name: file.name, blob: file, day, createdAt: Date.now() }));
    onSaved(added.map((photo) => ({ ...photo, src: URL.createObjectURL(photo.blob) })));
    setStatus(`${files.length} ${files.length === 1 ? "foto agregada" : "fotos agregadas"} al álbum${skipped ? ` · ${skipped} archivo(s) omitido(s)` : ""}. Guardando en este dispositivo…`);
    try {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open("para-ti-photo-album", 1);
        request.onupgradeneeded = () => request.result.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      const tx = db.transaction("photos", "readwrite");
      const store = tx.objectStore("photos");
      added.forEach((photo) => store.add(photo));
      await new Promise((resolve, reject) => { tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error); });
      db.close();
      setStatus(`${files.length} ${files.length === 1 ? "foto agregada" : "fotos agregadas"}${skipped ? ` · ${skipped} archivo(s) omitido(s)` : ""}. Se conservarán en este dispositivo.`);
    } catch { setStatus("Las fotos ya están en el álbum abierto, pero el navegador no pudo conservarlas para la próxima visita."); }
  };
  const onFiles = (files) => { const selected = Array.from(files || []); if (selected.length) void save(selected); if (inputRef.current) inputRef.current.value = ""; };
  const reduce = useReducedMotion();
  return <motion.div className="photo-upload" id="agregar-fotos" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .2 }} variants={reduce ? { visible: { opacity: 1, y: 0 } } : reveal} transition={{ duration: reduce ? 0 : .55 }}>
    <div className="photo-upload__copy"><p className="eyebrow"><span className="eyebrow__line" /> MÁS MOMENTOS PARA GUARDAR</p><h3>¿Sumamos más fotos?</h3><p>Elige imágenes o arrástralas aquí. Aparecerán al final de este álbum, guardadas en este dispositivo.</p><label className="photo-upload__day-label" htmlFor="photo-upload-day">Fecha del recuerdo <span>(opcional)</span></label><input id="photo-upload-day" className="photo-upload__day" type="date" value={day} onChange={(event) => setDay(event.target.value)} /></div>
    <label className="photo-upload__drop" htmlFor="photo-upload-input" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onFiles(event.dataTransfer.files); }}><span className="photo-upload__symbol" aria-hidden="true">＋</span><span>Arrastra tus fotos aquí</span><span className="photo-upload__button">Elegir fotos</span><input ref={inputRef} id="photo-upload-input" className="photo-upload__input" type="file" accept="image/*" multiple aria-label="Elegir fotografías para agregar al álbum" onChange={(event) => onFiles(event.currentTarget.files)} /></label><p className="photo-upload__status" aria-live="polite">{status}</p>
  </motion.div>;
}

function VideoSection() {
  const refs = useRef([]);
  const [started, setStarted] = useState([]);
  const reduce = useReducedMotion();
  const variants = reduce ? { visible: { opacity: 1, y: 0 } } : reveal;
  const play = (index) => refs.current[index]?.play().catch(() => {});
  return <section className="film-section" id="video"><div className="film-section__inner section-shell">
    <motion.div className="film-section__copy" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .25 }} variants={variants} transition={{ duration: reduce ? 0 : .55 }}><p className="eyebrow"><span className="eyebrow__line" /> RECUERDOS EN MOVIMIENTO</p><h2>Momentos para<br />volver a <em>mirar.</em></h2><p className="section-copy">Dos recuerdos guardados para regresar a ellos cuando quieras.</p></motion.div>
    {videos.map((video, index) => <motion.div className={`film-frame${started[index] ? " has-started" : ""}`} key={video.src} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .15 }} variants={variants} transition={{ duration: reduce ? 0 : .55, delay: reduce ? 0 : index * .1 }}><video ref={(node) => { refs.current[index] = node; }} className="film-frame__video" controls playsInline preload="none" poster={video.poster} aria-label={video.alt} onPlay={() => setStarted((items) => { const next = [...items]; next[index] = true; return next; })}><source src={video.src} type="video/mp4" />Tu navegador no puede reproducir este video.</video><button className="film-frame__play" type="button" aria-label={`Reproducir video: ${video.title.toLowerCase()}`} aria-hidden={Boolean(started[index])} tabIndex={started[index] ? -1 : 0} onClick={() => play(index)}><span aria-hidden="true">▶</span><span>{video.title}</span></button></motion.div>)}
  </div></section>;
}

function Letter() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return <section className="letter-section" id="carta"><div className="letter-section__glow" aria-hidden="true" /><div className="letter-section__inner section-shell">
    <motion.div className="letter-section__intro" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .35 }} variants={reduce ? { visible: { opacity: 1, y: 0 } } : reveal} transition={{ duration: reduce ? 0 : .55 }}><p className="eyebrow"><span className="eyebrow__line" /> UNA CARTA PARA TI</p><h2>Unas palabras<br /><em>del corazón.</em></h2><p className="section-copy">Un deseo bonito para acompañar este nuevo año de vida.</p></motion.div>
    <div className="letter-wrap"><motion.div className={`envelope${open ? " is-open" : ""}`} id="love-letter" animate={open ? "open" : "closed"} variants={{ closed: { y: 0 }, open: { y: -8 } }} transition={{ duration: reduce ? 0 : .55 }}><div className="envelope__back" /><motion.div className="letter-paper" variants={{ closed: { y: 0 }, open: { y: "-39%" } }} transition={{ duration: reduce ? 0 : .55, delay: reduce || !open ? 0 : .15 }}><span className="letter-paper__to">Gissellita, mi amorsote:</span><p>Nunca me imaginé que podría llegar a amar tanto a alguien, hasta que apareció la Gissellita, mi amorsote único. ¿Qué haría sin esta mujer? Más bien, ¿qué haríamos todos los que te queremos sin esta dama tan preciosa? Esta página es para inmortalizarte, mi amor. Te amo y deseo que cumplas muy feliz todos los 07 de noviembre, mi vida. ❤️‍🩹</p><span className="letter-paper__from">Con todo mi amor,<br />Raúl Castillo <span aria-hidden="true">♡</span></span></motion.div><motion.div className="envelope__flap" variants={{ closed: { rotateX: 0 }, open: { rotateX: 180 } }} transition={{ duration: reduce ? 0 : .55 }} /><div className="envelope__front" /><span className="envelope__seal" aria-hidden="true">♡</span></motion.div><button className="button button--letter" type="button" aria-expanded={open} aria-controls="love-letter" onClick={() => setOpen(!open)}>{open ? "Cerrar esta carta" : "Abrir esta carta"} <span className="button__arrow" aria-hidden="true">{open ? "↓" : "↑"}</span></button></div>
  </div></section>;
}

function Lightbox({ photo, onClose, onChange }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!photo) return undefined;
    const key = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange(-1);
      if (event.key === "ArrowRight") onChange(1);
    };
    document.addEventListener("keydown", key);
    document.body.classList.add("has-lightbox");
    return () => { document.removeEventListener("keydown", key); document.body.classList.remove("has-lightbox"); };
  }, [photo, onClose, onChange]);
  return <AnimatePresence>{photo && <motion.div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Visor de fotografías" initial={reduce ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }}>
      <button className="lightbox__close" type="button" aria-label="Cerrar fotografía" onClick={onClose}>×</button><button className="lightbox__nav lightbox__nav--previous" type="button" aria-label="Fotografía anterior" onClick={() => onChange(-1)}>‹</button><figure className="lightbox__figure"><img className="lightbox__image" src={photo.src} alt={photo.alt} /><figcaption className="lightbox__caption">{photo.text}</figcaption></figure><button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Fotografía siguiente" onClick={() => onChange(1)}>›</button><p className="lightbox__hint">USA ← → PARA RECORRER · ESC PARA CERRAR</p>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function ScrollExperience() {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const easedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: .001 });
  const [showDock, setShowDock] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setShowDock(value > 420));
  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  return <>
    <motion.div className="scroll-progress" style={{ scaleX: reduce ? scrollYProgress : easedProgress }} aria-hidden="true" />
    <AnimatePresence>
      {showDock && <motion.nav className="scroll-dock" aria-label="Atajos para recorrer la página" initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .96 }} transition={{ duration: reduce ? 0 : .22 }}>
        <button type="button" onClick={() => jumpTo("inicio")} aria-label="Volver al inicio" title="Volver al inicio"><span aria-hidden="true">↑</span><small>Inicio</small></button>
        <span className="scroll-dock__divider" aria-hidden="true" />
        <button type="button" onClick={() => jumpTo("final")} aria-label="Ir al final de la página" title="Ir al final"><span aria-hidden="true">↓</span><small>Final</small></button>
      </motion.nav>}
    </AnimatePresence>
  </>;
}

function Ending() {
  const reduce = useReducedMotion();
  const variants = reduce ? { visible: { opacity: 1, y: 0, scale: 1 } } : reveal;
  return <section className="ending" id="final">
    <span className="ending__star ending__star--one" aria-hidden="true">✧</span><span className="ending__star ending__star--two" aria-hidden="true">✳</span>
    <motion.p className="eyebrow" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .6 }} variants={variants}><span className="eyebrow__line" /> 07 DE NOVIEMBRE · HOY Y SIEMPRE <span className="eyebrow__heart" aria-hidden="true">♡</span></motion.p>
    <motion.h2 initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .5 }} variants={variants} transition={{ duration: reduce ? 0 : .6, delay: .06 }}>Feliz<br /><em>cumpleaños.</em></motion.h2>
    <motion.p className="ending__note" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .5 }} variants={variants} transition={{ duration: reduce ? 0 : .55, delay: .1 }}>Te amo muchísimo y agradezco cada día que comparto contigo.<br /><br />— Raúl Castillo</motion.p>
    <motion.span className="ending__heart" aria-label="Un corazón para ti" initial={reduce ? false : { opacity: 0, scale: .6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .6 }} transition={{ duration: reduce ? 0 : .7, delay: .18 }}>♡</motion.span>
    <motion.a className="ending__top" href="#inicio" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .7 }} variants={variants}>Volver al principio <span aria-hidden="true">↑</span></motion.a>
    <motion.p className="ending__signature" initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ amount: .8 }} variants={variants}>HECHO CON AMOR, PARA TI</motion.p>
  </section>;
}

function App() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [uploaded, setUploaded] = useState([]);
  const allPhotos = useMemo(() => [heroPhoto, ...chapters.flatMap((chapter) => chapter.photos), ...uploaded], [uploaded]);
  const openPhoto = (photo) => setActivePhoto(photo);
  const movePhoto = (step) => setActivePhoto((current) => {
    const index = allPhotos.findIndex((photo) => photo.src === current?.src);
    return allPhotos[(index + step + allPhotos.length) % allPhotos.length];
  });
  useEffect(() => {
    let disposed = false;
    const read = async () => {
      try {
        const db = await new Promise((resolve, reject) => { const request = indexedDB.open("para-ti-photo-album", 1); request.onupgradeneeded = () => request.result.createObjectStore("photos", { keyPath: "id", autoIncrement: true }); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
        const request = db.transaction("photos", "readonly").objectStore("photos").getAll();
        request.onsuccess = () => { if (!disposed) setUploaded(request.result.sort((a, b) => a.createdAt - b.createdAt).map((item) => ({ src: URL.createObjectURL(item.blob), alt: "Foto añadida al álbum", title: "UN MOMENTO MÁS PARA GUARDAR", text: item.day ? `Un recuerdo del ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(`${item.day}T12:00:00`))}` : item.name, layout: "" }))); };
      } catch { /* IndexedDB is optional; the gallery remains usable without it. */ }
    };
    read();
    return () => { disposed = true; };
  }, []);
  return <><Header /><ScrollExperience /><main><Hero onPhoto={openPhoto} />{chapters.map((chapter) => <PhotoChapter key={chapter.id} chapter={chapter} onPhoto={openPhoto}>{chapter.id === "ella" && <>{uploaded.map((photo, index) => <PhotoCard key={`uploaded-${index}`} photo={photo} index={index + 22} onPhoto={openPhoto} />)}<PhotoUpload onSaved={(items) => setUploaded((current) => [...current, ...items.map((item) => ({ src: URL.createObjectURL(item.blob), alt: "Foto añadida al álbum", title: "UN MOMENTO MÁS PARA GUARDAR", text: item.day ? `Un recuerdo del ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(`${item.day}T12:00:00`))}` : item.name, layout: "" }))])} /></>}</PhotoChapter>)}<VideoSection /><Letter /><Ending /></main><footer className="site-footer"><a className="wordmark wordmark--footer" href="#inicio"><span className="wordmark__mark" aria-hidden="true">l.</span><span>para ti</span></a><p>Con todo mi amor, Raúl Castillo <span aria-hidden="true">♡</span></p><a href="#inicio">Volver arriba ↑</a></footer><Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} onChange={movePhoto} /></>;
}

export default App;
