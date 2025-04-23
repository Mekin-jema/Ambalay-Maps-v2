import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const usageStatisticsData = [
  { name: "Geocoding", value: 40 },
  { name: "Routing", value: 25 },
  { name: "Directions", value: 20 },
  { name: "Matrix", value: 15 },
];

const apiRequestsData = [
  { date: "Oct 14", requests: 120 },
  { date: "Oct 15", requests: 98 },
  { date: "Oct 16", requests: 150 },
  { date: "Oct 17", requests: 130 },
  { date: "Oct 18", requests: 170 },
];

const latencyData = [
  { time: "10:00", latency: 110 },
  { time: "11:00", latency: 130 },
  { time: "12:00", latency: 90 },
  { time: "13:00", latency: 140 },
  { time: "14:00", latency: 100 },
];

const totalRequests = 500;
const failedRequests = 100;
const errorRate = (failedRequests / totalRequests) * 100;

export function UsageStatistics() {
  return (
    <div className="dark:text-white">
      <h2 className="text-xl font-bold mb-4">Usage Statistics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - API Distribution */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>API Request Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageStatisticsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {usageStatisticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Daily API Requests */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Daily API Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiRequestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Latency Over Time */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Latency Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis unit="ms" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#ff8042"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Rate Metric */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">
                {errorRate.toFixed(2)}%
              </span>
              <span className="text-sm text-gray-500">
                {failedRequests} of {totalRequests} failed
              </span>
            </div>
            <Progress
              value={errorRate}
              className={errorRate > 10 ? "bg-red-500" : "bg-green-500"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
