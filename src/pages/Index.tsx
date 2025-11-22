import { motion } from 'framer-motion';
import { DollarSign, Users, Activity, TrendingUp } from 'lucide-react';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { MetricCard } from '@/components/MetricCard';
import { ClientTable } from '@/components/ClientTable';
import { StatusChart } from '@/components/StatusChart';
import { RefreshButton } from '@/components/RefreshButton';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1PDilsmweoAEJYxsjUbyqLAAsVQmYDCkuJNzkEoPEkUA/export?format=csv';

const Index = () => {
  const { data, loading, error, refresh } = useGoogleSheets(SHEET_URL);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading data',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Calculate metrics
  const totalRevenue = data.reduce((sum, item) => {
    const price = parseFloat(item.Price.replace(/[^0-9.-]+/g, '')) || 0;
    return sum + price;
  }, 0);

  const totalClients = data.length;

  const activeClients = data.filter(item => 
    item.Status.toLowerCase().includes('active') || 
    item.Status.toLowerCase().includes('completed')
  ).length;

  const handleRefresh = () => {
    refresh();
    toast({
      title: 'Data synced',
      description: 'Dashboard updated with latest data from Google Sheets',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card p-6 md:p-8 lg:p-12">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Floating orbs for atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-20 right-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed bottom-20 left-20 w-96 h-96 bg-neon-magenta/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-3 font-display tracking-tight">
                CYBER<span className="text-neon-magenta">METRICS</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time data analytics dashboard
              </p>
            </div>
            <RefreshButton onClick={handleRefresh} loading={loading} />
          </div>
        </motion.div>

        {loading && data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-[60vh]"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
              />
              <p className="text-muted-foreground font-display">Loading dashboard data...</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                color="cyan"
                delay={0}
              />
              <MetricCard
                title="Total Clients"
                value={totalClients}
                icon={Users}
                color="magenta"
                delay={0.1}
              />
              <MetricCard
                title="Active Projects"
                value={activeClients}
                icon={Activity}
                color="purple"
                delay={0.2}
              />
              <MetricCard
                title="Conversion Rate"
                value={`${totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0}%`}
                icon={TrendingUp}
                color="green"
                delay={0.3}
              />
            </div>

            {/* Charts and Table Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <StatusChart data={data} />
              </div>
              <div className="lg:col-span-2">
                <ClientTable data={data} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-muted-foreground text-sm"
        >
          <p>Last updated: {new Date().toLocaleString()}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
