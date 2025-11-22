import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'cyan' | 'magenta' | 'purple' | 'green';
  delay?: number;
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'cyan',
  delay = 0 
}: MetricCardProps) => {
  const colorClasses = {
    cyan: 'text-neon-cyan border-neon-cyan/20',
    magenta: 'text-neon-magenta border-neon-magenta/20',
    purple: 'text-neon-purple border-neon-purple/20',
    green: 'text-neon-green border-neon-green/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card p-6 rounded-xl relative overflow-hidden group"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-card/50 border ${colorClasses[color]}`}>
            <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[0]}`} />
          </div>
          {trend && (
            <span className="text-sm text-muted-foreground">{trend}</span>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-muted-foreground mb-2 font-display uppercase tracking-wide">
          {title}
        </h3>
        
        <p className={`text-3xl font-bold ${colorClasses[color].split(' ')[0]} font-display`}>
          {value}
        </p>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 ${
        color === 'cyan' ? 'bg-neon-cyan' :
        color === 'magenta' ? 'bg-neon-magenta' :
        color === 'purple' ? 'bg-neon-purple' :
        'bg-neon-green'
      }`} />
    </motion.div>
  );
};
