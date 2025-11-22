import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GoogleSheetsButton = () => {
  const handleClick = () => {
    // Replace with your Google Sheets URL
    window.open('https://docs.google.com/spreadsheets/d/1PDilsmweoAEJYxsjUbyqLAAsVQmYDCkuJNzkEoPEkUA', '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleClick}
        className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-500/50 hover:border-green-400 backdrop-blur-xl font-display uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
        size="lg"
      >
        <ExternalLink className="w-5 h-5 mr-2" />
        Google Sheets
      </Button>
    </motion.div>
  );
};
