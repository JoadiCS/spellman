import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useContent from '../../hooks/useContent.js';
import Button from '../ui/button.jsx';
import { formatHookWords } from '../../utils/helpers.js';

const HeroSection = () => {
  const { data } = useContent('hero');
  const hero = data?.[0];
  const words = useMemo(() => formatHookWords(hero?.hookWords || 'people, planet, progress'), [hero?.hookWords]);
  const backgroundVideo = hero?.backgroundVideoUrl || '/home-bg.mp4';
  const videoPoster = hero?.videoPosterUrl || hero?.imageUrl;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return undefined;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-neutral-900 py-0 text-white">
      {backgroundVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={videoPoster}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : hero?.imageUrl ? (
        <img src={hero.imageUrl} alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24">
        <motion.p className="text-sm uppercase tracking-[0.3em] text-primary-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {hero?.subtitle || 'Environmental Advocacy Collective'}
        </motion.p>
        <motion.h1
          className="text-5xl font-bold leading-tight md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {hero?.title || 'Stand up for the future of our shared planet.'}
        </motion.h1>
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-primary-300 md:text-4xl"
        >
          {words[index]}
        </motion.div>
        <motion.p className="max-w-2xl text-lg text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {hero?.description ||
            'Harness bold storytelling, grassroots action, and immersive data to protect climate justice for everyone.'}
        </motion.p>
        <div className="flex flex-wrap gap-4">
          <Button>{hero?.buttonText || 'Donate Now'}</Button>
          <Button variant="secondary">{hero?.secondaryButtonText || 'Our Mission'}</Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-xs uppercase tracking-[0.3em] text-white/80">
        Scroll
      </div>
    </section>
  );
};

export default HeroSection;
