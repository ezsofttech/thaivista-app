import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowRight, ArrowUp, Bath, BedDouble, Building2, Clock, Facebook, Home, Instagram, KeyRound,
  Linkedin, Mail, MapPin, Maximize, Menu, MessageCircle, Phone, Search, TrendingUp, X, Tag,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import invest from "@/assets/invest.jpg";
import pApartment from "@/assets/p-apartment.jpg";
import pVilla from "@/assets/p-villa.jpg";
import pCommercial from "@/assets/p-commercial.jpg";
import pLand from "@/assets/p-land.jpg";
import pTownhouse from "@/assets/p-townhouse.jpg";
import logoAsset from "@/assets/thaivista-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THAIVISTA PROPERTIES — Buy, Sell, Rent & Invest in Property" },
      { name: "description", content: "Premium real-estate services from THAIVISTA PROPERTIES CO., LTD. Discover exceptional properties to buy, sell, rent and invest." },
      { property: "og:title", content: "THAIVISTA PROPERTIES — Buy, Sell, Rent & Invest" },
      { property: "og:description", content: "Find a place worth calling home. Premium property guidance for buying, selling, renting and investing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Home", "home"], ["Properties", "properties"], ["Buy", "services"], ["Sell", "services"],
  ["Rent", "search"], ["Invest", "invest"], ["About Us", "about"], ["Contact", "contact"],
] as const;

const PROPERTIES = [
  { img: hero, type: "Luxury Villa", name: "The Horizon Residence", loc: "Coastal Hills", beds: 5, baths: 6, area: "6,200 sq ft", price: "$4,850,000" },
  { img: pApartment, type: "Penthouse", name: "Skyline Terrace Penthouse", loc: "City Centre", beds: 3, baths: 3, area: "2,950 sq ft", price: "$2,300,000" },
  { img: pVilla, type: "Villa", name: "Palm Court Villa", loc: "Garden District", beds: 4, baths: 4, area: "4,100 sq ft", price: "$1,950,000" },
  { img: pTownhouse, type: "Townhouse", name: "Ashwood Townhouse", loc: "Riverside", beds: 3, baths: 2, area: "2,100 sq ft", price: "$4,200 / mo" },
  { img: pCommercial, type: "Commercial", name: "Meridian Office Suites", loc: "Business Quarter", beds: 0, baths: 4, area: "12,500 sq ft", price: "$6,400,000" },
  { img: pLand, type: "Land", name: "Seaview Development Plot", loc: "Northern Coast", beds: 0, baths: 0, area: "4.2 acres", price: "$1,250,000" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <a href="#home" className="flex items-center" aria-label="THAIVISTA PROPERTIES home">
      <img
        src={logoAsset.url}
        alt="Thaivista Properties Co., Ltd. — Buy, Sell, Rent, Invest"
        className={className}
      />
    </a>
  );
}

function Label({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
      <span className="gold-rule" />
      <span className="eyebrow">{children}</span>
      {center && <span className="gold-rule" />}
    </div>
  );
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ["home", "search", "about", "services", "properties", "invest", "contact"];
      let cur = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      {/* NAVBAR */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink-deep/95 py-4 backdrop-blur" : "bg-transparent py-7"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
            {NAV.map(([label, id]) => (
              <a key={label} href={`#${id}`}
                className={`text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:text-gold-rich ${active === id && label !== "Sell" && label !== "Rent" ? "text-gold-rich" : "text-on-ink-muted"}`}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-gold hidden !px-6 !py-3 xl:inline-flex">Enquire Now</a>
          <button className="text-on-ink xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink-deep px-6 py-7 animate-in fade-in">
          <div className="flex items-center justify-between">
            <Logo />
            <button className="text-on-ink" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <nav className="mt-14 flex flex-col gap-6">
            {NAV.map(([label, id]) => (
              <a key={label} href={`#${id}`} onClick={() => setOpen(false)} className="font-serif text-3xl text-on-ink hover:text-gold-rich">{label}</a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-gold mt-auto">Enquire Now</a>
        </div>
      )}

      <main>
        {/* HERO */}
        <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-deep">
          <img src={hero} alt="Modern luxury villa with infinity pool at golden hour" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover animate-in zoom-in-105 duration-[2500ms]" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pb-36 pt-40 lg:px-10">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Label>Premium Real Estate Services</Label>
              <h1 className="mt-8 text-5xl leading-[1.02] text-on-ink sm:text-7xl lg:text-[6.5rem]">
                Find a Place<br /><em className="text-gold-rich">Worth Calling Home.</em>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-on-ink-muted sm:text-lg">
                Discover exceptional properties for living, investing and building your future with THAIVISTA PROPERTIES.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#properties" className="btn-gold">Explore Properties <ArrowRight className="h-4 w-4" /></a>
                <a href="#contact" className="btn-outline-light">Talk to an Expert</a>
              </div>
              <p className="mt-12 text-[0.7rem] tracking-[0.5em] text-on-ink-muted">BUY &nbsp;•&nbsp; SELL &nbsp;•&nbsp; RENT &nbsp;•&nbsp; INVEST</p>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section id="search" className="relative z-10 -mt-20 px-6 lg:px-10">
          <SearchPanel />
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-28 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-36">
          <div className="reveal relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/40 lg:block" />
            <img src={about} alt="Elegant double-height living room" loading="lazy" width={1024} height={1280} className="relative aspect-[4/5] w-full object-cover" />
          </div>
          <div className="reveal">
            <Label>About Thaivista</Label>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">Property Decisions Deserve <em className="text-gold">More Than Just a Listing.</em></h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              THAIVISTA PROPERTIES CO., LTD. is positioned as a trusted real-estate partner helping clients discover, buy, sell, rent and invest in property with clarity and confidence.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We take time to understand what matters to you, then guide every step with care, discretion and a long-term view.
            </p>
            <a href="#contact" className="btn-outline-dark mt-10">Discover Our Story</a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-ivory py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal text-center">
              <Label center>Our Services</Label>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">Everything You Need<br /><em className="text-gold">Under One Roof.</em></h2>
            </div>
            <div className="mt-20 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Home, "Buy", "Find properties that match your lifestyle, location and investment goals."],
                [Tag, "Sell", "Present and position your property professionally to reach the right buyers."],
                [KeyRound, "Rent", "Discover quality rental opportunities with a simple and guided experience."],
                [TrendingUp, "Invest", "Explore property opportunities with a long-term investment perspective."],
              ].map(([Icon, title, text], i) => {
                const I = Icon as typeof Home;
                return (
                  <article key={title as string} className="reveal group relative bg-ivory p-10 transition-colors duration-500 hover:bg-background" style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                    <I className="h-9 w-9 text-gold" strokeWidth={1} />
                    <p className="mt-10 font-serif text-sm text-muted-foreground">0{i + 1}</p>
                    <h3 className="mt-1 text-3xl tracking-wide">{title as string}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{text as string}</p>
                    <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section id="properties" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Label>Featured Properties</Label>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">Selected <em className="text-gold">Residences & Spaces</em></h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Demo listings shown for illustration only. Contact us for current availability.</p>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.map((p, i) => (
              <article key={p.name} className="reveal group" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <span className="absolute left-4 top-4 bg-background/95 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em]">{p.type}</span>
                  <span className="absolute right-4 top-4 bg-ink-deep/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-on-ink">Demo</span>
                </div>
                <div className="border-b border-border pb-6 pt-6">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"><MapPin className="h-3 w-3 text-gold" />{p.loc}</p>
                  <h3 className="mt-3 text-2xl">{p.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
                    {p.beds > 0 && <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" strokeWidth={1.25} />{p.beds} Beds</span>}
                    {p.baths > 0 && <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" strokeWidth={1.25} />{p.baths} Baths</span>}
                    <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" strokeWidth={1.25} />{p.area}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-serif text-2xl text-gold">{p.price}</span>
                    <button onClick={() => toast("Property details coming soon", { description: "Please enquire for full information." })} className="text-xs uppercase tracking-[0.2em] underline-offset-8 hover:text-gold hover:underline">View Property</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 text-center"><a href="#contact" className="btn-outline-dark">View All Properties</a></div>
        </section>

        {/* WHY */}
        <section className="bg-ink-deep py-28 text-on-ink lg:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
            <div className="reveal">
              <Label>Why Thaivista</Label>
              <h2 className="mt-6 text-5xl leading-tight lg:text-7xl">A Better Way<br /><em className="text-gold-rich">to Move Forward.</em></h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {[
                ["Personalized Guidance", "Advice shaped around your goals, timing and lifestyle."],
                ["Professional Property Support", "Careful handling of every viewing, negotiation and detail."],
                ["Clear & Transparent Process", "Straightforward communication at every stage."],
                ["Long-Term Client Relationships", "We stay with you well beyond a single transaction."],
              ].map(([t, d], i) => (
                <div key={t} className="reveal border-t border-on-ink/15 py-10 sm:pr-10">
                  <p className="font-serif text-6xl text-gold-rich">0{i + 1}</p>
                  <h3 className="mt-5 text-2xl">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-ink-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="reveal text-center">
            <Label center>Browse by Category</Label>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">Spaces for <em className="text-gold">Every Ambition</em></h2>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[[pVilla, "Luxury Homes"], [pApartment, "Apartments"], [pCommercial, "Commercial Spaces"], [pLand, "Land & Investment"]].map(([img, t], i) => (
              <a key={t} href="#properties" className="reveal group relative block aspect-[3/4] overflow-hidden bg-ink" style={{ transitionDelay: `${i * 80}ms` }}>
                <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-card-overlay opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="block h-px w-0 bg-gold-rich transition-all duration-700 group-hover:w-16" />
                  <h3 className="mt-4 text-3xl text-on-ink transition-transform duration-500 group-hover:-translate-y-1">{t}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* INVEST */}
        <section id="invest" className="grid bg-ink lg:grid-cols-2">
          <img src={invest} alt="Modern glass tower at dusk" loading="lazy" width={1280} height={1280} className="h-80 w-full object-cover lg:h-full" />
          <div className="reveal flex flex-col justify-center px-6 py-24 text-on-ink sm:px-12 lg:px-20 lg:py-36">
            <Label>Investment</Label>
            <h2 className="mt-6 text-5xl leading-tight lg:text-6xl">Invest In Property.<br /><em className="text-gold-rich">Invest In Possibility.</em></h2>
            <p className="mt-8 max-w-lg leading-relaxed text-on-ink-muted">
              Whether you are looking for long-term value, a strategic property purchase or your next investment opportunity, explore options with a team that takes a thoughtful view of every decision.
            </p>
            <a href="#contact" className="btn-gold mt-10 self-start">Explore Investment Opportunities</a>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-ivory py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="reveal text-center">
              <Label center>How It Works</Label>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">A Simpler <em className="text-gold">Property Journey</em></h2>
            </div>
            <ol className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
              <span className="absolute left-0 right-0 top-7 hidden h-px bg-gold/40 md:block" aria-hidden />
              {["Tell Us What You Need", "Explore The Right Options", "Make An Informed Decision", "Move Forward With Confidence"].map((s, i) => (
                <li key={s} className="reveal relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-ivory font-serif text-xl text-gold">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl">{s}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="reveal text-center">
            <Label center>Client Voices</Label>
            <h2 className="mt-6 text-4xl sm:text-5xl">What Clients <em className="text-gold">Say</em></h2>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Sample testimonials</p>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              ["Professional, attentive and extremely easy to work with.", "A. Somchai", "Property Client"],
              ["They understood exactly what we were looking for and made the whole process feel calm.", "L. Martin", "Home Buyer"],
              ["Clear advice, honest communication and genuine care from start to finish.", "K. Nara", "Investor"],
            ].map(([q, n, r], i) => (
              <figure key={n} className="reveal border-t border-gold pt-8" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="tracking-[0.3em] text-gold">★★★★★</p>
                <blockquote className="mt-6 font-serif text-2xl leading-snug">“{q}”</blockquote>
                <figcaption className="mt-8 text-sm"><span className="font-semibold">{n}</span><span className="block text-muted-foreground">{r}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-ink-deep py-32 text-center lg:py-44">
          <img src={pTownhouse} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="reveal relative mx-auto max-w-3xl px-6">
            <h2 className="text-5xl leading-tight text-on-ink lg:text-7xl">Your Next Property <em className="text-gold-rich">Could Be Closer Than You Think.</em></h2>
            <p className="mt-8 text-on-ink-muted">Whether you're buying, selling, renting or investing, let's start the conversation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#properties" className="btn-gold">Explore Properties</a>
              <a href="#contact" className="btn-outline-light">Contact Us</a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[1fr_1.3fr] lg:px-10 lg:py-36">
          <div className="reveal">
            <Label>Contact</Label>
            <h2 className="mt-6 text-4xl sm:text-5xl">Let's Talk <em className="text-gold">Property.</em></h2>
            <p className="mt-6 font-serif text-xl">THAIVISTA PROPERTIES CO., LTD.</p>
            <p className="mt-1 text-xs tracking-[0.4em] text-gold">BUY | SELL | RENT | INVEST</p>
            <ul className="mt-10 space-y-6 text-sm">
              {[[Phone, "Phone", "+00 000 000 000"], [Mail, "Email", "hello@thaivista.example"], [MapPin, "Office Address", "Office address to be confirmed"], [Clock, "Business Hours", "Mon – Sat, 9:00 – 18:00"]].map(([Icon, l, v]) => {
                const I = Icon as typeof Phone;
                return (
                  <li key={l as string} className="flex gap-4 border-b border-border pb-6">
                    <I className="mt-0.5 h-5 w-5 text-gold" strokeWidth={1.25} />
                    <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{l as string}</p><p className="mt-1">{v as string}</p></div>
                  </li>
                );
              })}
            </ul>
          </div>
          <EnquiryForm />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-ink-deep text-on-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div>
              <Logo className="h-16 w-auto" />
              <p className="mt-6 font-serif text-lg">THAIVISTA PROPERTIES CO., LTD.</p>
              <p className="mt-1 text-xs tracking-[0.4em] text-gold-rich">BUY | SELL | RENT | INVEST</p>
            </div>
            <nav className="grid grid-cols-2 gap-x-14 gap-y-3 sm:grid-cols-4" aria-label="Footer">
              {NAV.map(([l, id]) => <a key={l} href={`#${id}`} className="text-sm text-on-ink-muted hover:text-gold-rich">{l === "About Us" ? "About" : l}</a>)}
            </nav>
            <div className="flex gap-3">
              {[[Facebook, "Facebook"], [Instagram, "Instagram"], [Linkedin, "LinkedIn"], [MessageCircle, "WhatsApp"]].map(([Icon, l]) => {
                const I = Icon as typeof Facebook;
                return <a key={l as string} href="#" aria-label={l as string} className="flex h-10 w-10 items-center justify-center border border-on-ink/20 text-on-ink-muted transition-colors hover:border-gold hover:text-gold-rich"><I className="h-4 w-4" strokeWidth={1.25} /></a>;
              })}
            </div>
          </div>
          <div className="mt-16 flex flex-col justify-between gap-2 border-t border-on-ink/10 pt-8 text-xs text-on-ink-muted sm:flex-row">
            <p>© 2026 THAIVISTA PROPERTIES CO., LTD.</p><p>All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-gold text-primary-foreground shadow-soft transition-all duration-500 hover:bg-gold-rich ${scrolled ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

function SearchPanel() {
  const [mode, setMode] = useState<"Buy" | "Rent">("Buy");
  const [loading, setLoading] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Search received", { description: "Browse our featured properties below." });
      document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };
  const sel = "field appearance-none cursor-pointer";
  return (
    <form onSubmit={submit} className="mx-auto max-w-6xl bg-ivory p-8 shadow-soft lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl">Find Your Ideal Property</h2>
        <div className="flex border border-gold" role="tablist">
          {(["Buy", "Rent"] as const).map((m) => (
            <button type="button" key={m} onClick={() => setMode(m)} aria-pressed={mode === m}
              className={`px-6 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${mode === m ? "bg-gold text-primary-foreground" : "text-gold"}`}>{m}</button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid items-end gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="block"><span className="eyebrow !text-[0.6rem] !text-muted-foreground">Property Type</span>
          <select className={sel} defaultValue=""><option value="" disabled>Any type</option><option>Villa</option><option>Apartment</option><option>Townhouse</option><option>Commercial</option><option>Land</option></select></label>
        <label className="block"><span className="eyebrow !text-[0.6rem] !text-muted-foreground">Location</span>
          <input className="field" placeholder="City, district or area" /></label>
        <label className="block"><span className="eyebrow !text-[0.6rem] !text-muted-foreground">Budget</span>
          <select className={sel} defaultValue=""><option value="" disabled>Any budget</option>
            {mode === "Buy" ? <><option>Under $500k</option><option>$500k – $1M</option><option>$1M – $3M</option><option>$3M+</option></> : <><option>Under $2,000 / mo</option><option>$2,000 – $5,000 / mo</option><option>$5,000+ / mo</option></>}
          </select></label>
        <button type="submit" disabled={loading} className="btn-gold h-14 md:col-span-2 lg:col-span-1">
          <Search className="h-4 w-4" /> {loading ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
}

function EnquiryForm() {
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "interest", string>>>({});
  const [loading, setLoading] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const err: Partial<Record<"name" | "email" | "interest", string>> = {};
    if (!String(fd.get("name") || "").trim()) err.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(fd.get("email") || ""))) err.email = "Please enter a valid email";
    if (!String(fd.get("interest") || "")) err.interest = "Please choose an option";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setLoading(false);
      form.reset();
      toast.success("Enquiry sent", { description: "Thank you — our team will be in touch shortly." });
    }, 900);
  };
  const L = ({ children }: { children: ReactNode }) => <span className="eyebrow !text-[0.6rem] !text-muted-foreground">{children}</span>;
  const E = ({ k }: { k: "name" | "email" | "interest" }) => errors[k] ? <span className="mt-1 block text-xs text-destructive">{errors[k]}</span> : null;
  return (
    <form onSubmit={submit} noValidate className="reveal grid gap-8 bg-ivory p-8 sm:grid-cols-2 sm:p-12">
      <label className="block"><L>Full Name *</L><input name="name" className="field" aria-invalid={!!errors.name} /><E k="name" /></label>
      <label className="block"><L>Email *</L><input name="email" type="email" className="field" aria-invalid={!!errors.email} /><E k="email" /></label>
      <label className="block"><L>Phone</L><input name="phone" type="tel" className="field" /></label>
      <label className="block"><L>I'm Interested In *</L>
        <select name="interest" defaultValue="" className="field appearance-none" aria-invalid={!!errors.interest}>
          <option value="" disabled>Select</option><option>Buying</option><option>Selling</option><option>Renting</option><option>Investing</option>
        </select><E k="interest" /></label>
      <label className="block sm:col-span-2"><L>Preferred Location</L><input name="location" className="field" /></label>
      <label className="block sm:col-span-2"><L>Message</L><textarea name="message" rows={4} className="field resize-none" /></label>
      <button type="submit" disabled={loading} className="btn-gold sm:col-span-2 sm:justify-self-start">
        <Building2 className="h-4 w-4" strokeWidth={1.5} /> {loading ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
