import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  suffix = '',
  duration = 2.5,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        // Format number with spaces for thousands if needed, though for small numbers it doesn't matter much
        ref.current.textContent = Math.floor(latest).toLocaleString('fr-FR') + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="tabular-nums tracking-tight">0{suffix}</span>;
};

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '%',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-6 rounded-2xl hover:bg-white/50 hover:backdrop-blur-sm transition-colors duration-300"
    >
      <div className="text-3xl lg:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 mb-3">
        <StatsCounter value={value} suffix={suffix} />
      </div>
      <p className="text-gray-600 font-medium text-base lg:text-lg">{label}</p>
    </motion.div>
  );
};
