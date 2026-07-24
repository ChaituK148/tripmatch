'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Compass, Star, ChevronRight, Globe, Sparkles, Zap } from 'lucide-react';

// Animated floating destination preview cards
const PREVIEW_DESTINATIONS = [
  { name: 'Tokyo', emoji: '🏙️', gradient: 'linear-gradient(135deg, #1a1a2e, #e94560)', delay: 0 },
  { name: 'Bali', emoji: '🌺', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', delay: 1.5 },
  { name: 'Swiss Alps', emoji: '🏔️', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', delay: 0.8 },
  { name: 'Santorini', emoji: '⛵', gradient: 'linear-gradient(135deg, #2166ac, #f4a460)', delay: 2 },
  { name: 'Maldives', emoji: '🏝️', gradient: 'linear-gradient(135deg, #0093E9, #80D0C7)', delay: 0.4 },
  { name: 'New York', emoji: '🗽', gradient: 'linear-gradient(135deg, #0f0c29, #f7971e)', delay: 1.2 },
];

const FEATURES = [
  { icon: Sparkles, title: '15 Personality Questions', desc: 'Crafted to reveal what truly moves you' },
  { icon: Globe, title: '17 World Destinations', desc: 'From hidden gems to iconic landmarks' },
  { icon: Zap, title: 'Instant Matching', desc: 'AI-powered trait analysis in seconds' },
  { icon: Star, title: 'Detailed Breakdowns', desc: 'See exactly why each destination fits you' },
];

function StarsBackground() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            '--opacity': s.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function OrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: '#3B82F6',
          top: '-10%',
          left: '-5%',
          '--duration': '25s',
        } as React.CSSProperties}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: '#F59E0B',
          bottom: '5%',
          right: '-5%',
          '--duration': '30s',
        } as React.CSSProperties}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          background: '#8B5CF6',
          top: '40%',
          left: '40%',
          '--duration': '20s',
        } as React.CSSProperties}
      />
    </div>
  );
}

function FloatingCard({ name, emoji, gradient, delay }: (typeof PREVIEW_DESTINATIONS)[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.8, duration: 0.6 }}
      className="destination-card glass rounded-2xl p-4 flex items-center gap-3 min-w-[160px] cursor-default"
      style={{
        animationName: delay % 2 === 0 ? 'float' : 'float-reverse',
        animationDuration: `${6 + delay}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: gradient }}
      >
        {emoji}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{name}</p>
        <div className="flex gap-0.5 mt-0.5">
          {[1,2,3,4,5].map((i) => (
            <Star key={i} size={8} className="fill-gold-400 text-gold-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <OrbBackground />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-gradient flex items-center justify-center">
            <Compass size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">TripMatch</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link
            href="/quiz"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Take the Quiz
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Hero Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <MapPin size={14} className="text-gold-400" />
                <span className="text-sm text-slate-300">17 destinations · 15 questions · 1 perfect match</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">Find your</span>
              <br />
              <span className="gradient-text-gold">dream</span>
              <br />
              <span className="text-white">destination</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300 leading-relaxed max-w-lg mb-10 lg:max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Not all destinations are created equal — and neither are travelers.
              Answer 15 personality questions and discover the places on Earth that
              were made for exactly who you are.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/quiz"
                id="start-quiz-btn"
                className="btn-glow inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-blue-gradient text-white font-semibold text-lg transition-all hover:scale-105 hover:brightness-110"
              >
                <Sparkles size={20} />
                Start the Quiz
                <ChevronRight size={20} />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 justify-center lg:justify-start mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { value: '17', label: 'Destinations' },
                { value: '15', label: 'Questions' },
                { value: '8', label: 'Trait Dimensions' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold gradient-text-blue">{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-2 gap-4 p-4">
              {PREVIEW_DESTINATIONS.map((dest) => (
                <FloatingCard key={dest.name} {...dest} />
              ))}
            </div>
            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-blue-500 opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            How it works
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A quiz that actually gets you — built on 8 personality dimensions and real travel science.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-gradient flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10"
        >
          <div className="text-5xl mb-4">✈️</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Ready to discover yourself?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            It takes about 3 minutes. Your next adventure is waiting.
          </p>
          <Link
            href="/quiz"
            id="final-cta-btn"
            className="btn-glow inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gold-gradient text-dark-900 font-bold text-lg hover:scale-105 transition-transform"
          >
            <Compass size={22} />
            Find My Destination
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8">
        <p className="text-slate-500 text-sm">
          Built with ❤️ by TripMatch · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
