import { motion } from 'framer-motion';
import { SheetData } from '@/hooks/useGoogleSheets';
import { Badge } from '@/components/ui/badge';

interface ClientTableProps {
  data: SheetData[];
}

export const ClientTable = ({ data }: ClientTableProps) => {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('active') || statusLower.includes('completed')) {
      return 'bg-neon-green/20 text-neon-green border-neon-green/30';
    }
    if (statusLower.includes('pending')) {
      return 'bg-neon-purple/20 text-neon-purple border-neon-purple/30';
    }
    return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6 rounded-xl overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 font-display flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow" />
        Client Directory
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                Client
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                Email
              </th>
              <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                Price
              </th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border/30 hover:bg-card/30 transition-colors group"
              >
                <td className="py-4 px-4">
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {row.Client}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground text-sm">
                    {row.Email}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-neon-cyan font-semibold font-display">
                    {row.Price}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge variant="outline" className={`${getStatusColor(row.Status)} border`}>
                    {row.Status}
                  </Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
