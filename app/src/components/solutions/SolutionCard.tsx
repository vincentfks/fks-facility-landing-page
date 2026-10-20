import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

export interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  delay?: number;
  color?: 'primary' | 'secondary' | 'accent';
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  icon: Icon,
  title,
  description,
  path,
  delay = 0,
  color = 'primary',
}) => {
  const colorConfigs = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      hoverBg: 'group-hover:bg-primary-100',
      border: 'hover:border-primary-200',
      iconBg: 'bg-primary-100',
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      hoverBg: 'group-hover:bg-secondary-100',
      border: 'hover:border-secondary-200',
      iconBg: 'bg-secondary-100',
    },
    accent: {
      bg: 'bg-accent-50',
      text: 'text-accent-600',
      hoverBg: 'group-hover:bg-accent-100',
      border: 'hover:border-accent-200',
      iconBg: 'bg-accent-100',
    },
  };

  const config = colorConfigs[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link to={path} className="block h-full">
        <div className={cn(
          "relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden",
          config.border,
          "hover:shadow-xl"
        )}>
          {/* Gradient blob background effect on hover */}
          <div className={cn(
            "absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
            color === 'primary' && "bg-primary-400",
            color === 'secondary' && "bg-secondary-400",
            color === 'accent' && "bg-accent-400",
          )} />

          <div className="flex flex-col h-full relative z-10">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
              config.bg,
              config.text
            )}>
              <Icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>

            <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
              {description}
            </p>

            <div className={cn(
              "flex items-center font-semibold text-sm transition-all duration-300",
              config.text,
              "group-hover:translate-x-2"
            )}>
              <span className="mr-2">Découvrir la solution</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
