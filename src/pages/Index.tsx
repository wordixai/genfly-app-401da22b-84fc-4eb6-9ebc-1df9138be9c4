import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Bitcoin, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const fetchCryptoData = async () => {
  // Mock data since we can't make real API calls in this environment
  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      current_price: 42000,
      price_change_percentage_24h: 2.5,
      sparkline_in_7d: {
        price: Array(7).fill(0).map((_, i) => 40000 + Math.random() * 5000)
      }
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      current_price: 2500,
      price_change_percentage_24h: 1.8,
      sparkline_in_7d: {
        price: Array(7).fill(0).map((_, i) => 2000 + Math.random() * 1000)
      }
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      current_price: 0.45,
      price_change_percentage_24h: -0.5,
      sparkline_in_7d: {
        price: Array(7).fill(0).map((_, i) => 0.4 + Math.random() * 0.1)
      }
    }
  ];
};

const CryptoCard = ({ crypto }: { crypto: any }) => {
  const chartData = crypto.sparkline_in_7d.price.map((price: number, index: number) => ({
    day: index + 1,
    price
  }));

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </CardTitle>
        </div>
        <Bitcoin className="h-6 w-6 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">
            ${crypto.current_price.toLocaleString()}
          </div>
          <div className={`flex items-center ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Cryptocurrency Tracker
          </h1>
          <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
            <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium">USD</span>
          </div>
        </div>
        
        <div className="grid gap-4">
          {cryptos?.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;