import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RefreshButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const RefreshButton = ({ onClick, loading }: RefreshButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        disabled={loading}
        className="bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/50 hover:border-primary backdrop-blur-xl font-display uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
        size="lg"
      >
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
        </motion.div>
        {loading ? 'Syncing...' : 'Sync Data'}
      </Button>
    </motion.div>
  );
};
