'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Bar } from "recharts";
import { Download } from "lucide-react";

// import Header from "@/components/layout/Header";
// import { NavUser } from "@/pages/dashboard/navbar/header-user";
// import { Search } from "@/pages/dashboard/navbar/search";
// import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
// import { Header } from "@/pages/dashboard/navbar/main-header";
import { Main } from "../utils/main";
import HeatMap from "./heatmap";

// Define types for the mock data
interface ApiUsageData {
  date: string;
  Geocode: number;
  Routing: number;
  Directions: number;
  Matrix: number;
}

interface ErrorLog {
  timestamp: string;
  requestType: string;
  errorMessage: string;
  responseTime: string;
  detailedLog: string;
}

interface GeographicData {
  city: string;
  calls: number;
}

// Mock data for API usage metrics
const apiUsageData: ApiUsageData[] = [
  { date: "2024-02-20", Geocode: 50, Routing: 30, Directions: 20, Matrix: 40 },
  { date: "2024-02-21", Geocode: 60, Routing: 35, Directions: 25, Matrix: 45 },
  { date: "2024-02-22", Geocode: 55, Routing: 40, Directions: 30, Matrix: 50 },
  { date: "2024-02-23", Geocode: 70, Routing: 45, Directions: 35, Matrix: 55 },
];

const errorLogs: ErrorLog[] = [
  { timestamp: "2024-02-20 12:30:45", requestType: "GET", errorMessage: "Timeout error", responseTime: "500ms", detailedLog: "Request took too long." },
  { timestamp: "2024-02-21 14:22:30", requestType: "POST", errorMessage: "Invalid JSON format", responseTime: "200ms", detailedLog: "Malformed request body." },
  { timestamp: "2024-02-22 10:05:12", requestType: "GET", errorMessage: "Unauthorized", responseTime: "150ms", detailedLog: "API key missing." },
  { timestamp: "2024-02-23 08:50:55", requestType: "DELETE", errorMessage: "Resource not found", responseTime: "180ms", detailedLog: "Attempt to delete non-existent item." },
];

const geographicData: GeographicData[] = [
  { city: "Bole", calls: 50 },
  { city: "Yeka", calls: 40 },
  { city: "Kirkos", calls: 30 },
  { city: "Arada", calls: 20 },
  { city: "Lideta", calls: 10 },
];

const AnalyticsLogs: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("Daily");

  const handleDownloadReport = () => {
    // Existing download functionality
  };

  return (
    <Main>

      {/* <Header>
  
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <DarkModeToggle />
          <NavUser />
        </div>
      </Header> */}

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">Analytics & Logs</h2>
        <div className="flex space-x-4">
          <Button className="bg-[#00432F] hover:bg-[#237a60]" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="flex space-x-4 border-b">
          <TabsTrigger
            value="analytics"
            className="  data-[state=active]:text-[#00432f] data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="error-logs"
            className="  data-[state=active]:text-[#00432f] data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Error Logs
          </TabsTrigger>
          <TabsTrigger
            value="geographic-usage"
            className="  data-[state=active]:text-[#00432f] data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Geographic Usage
          </TabsTrigger>
          <TabsTrigger
            value="heatmap"
            className="  data-[state=active]:text-[#00432f] data-[state=active]:font-bold data-[state=active]:underline data-[state=active]:underline-offset-4"
          >
            Heatmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-xl font-bold">Real-time API Usage Metrics</h2>
          <LineChart width={800} height={300} data={apiUsageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Tooltip />
            <Line type="monotone" dataKey="Geocode" stroke="#8884d8" />
            <Line type="monotone" dataKey="Routing" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Directions" stroke="#ff7300" />
            <Line type="monotone" dataKey="Matrix" stroke="#00432f" />
          </LineChart>
        </TabsContent>

        <TabsContent value="error-logs" className="space-y-4">
          <h2 className="text-xl font-bold">Error Logs & Debugging</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Timestamp</th>
                  <th className="px-4 py-2 border">Request Type</th>
                  <th className="px-4 py-2 border">Error Message</th>
                  <th className="px-4 py-2 border">Response Time</th>
                  <th className="px-4 py-2 border">Detailed Log</th>
                </tr>
              </thead>
              <tbody>
                {errorLogs.map((log, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{log.timestamp}</td>
                    <td className="px-4 py-2 border">{log.requestType}</td>
                    <td className="px-4 py-2 border">{log.errorMessage}</td>
                    <td className="px-4 py-2 border">{log.responseTime}</td>
                    <td className="px-4 py-2 border">{log.detailedLog}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="geographic-usage" className="space-y-4">
          <h2 className="text-xl font-bold">Geographic API Usage Map</h2>
          <BarChart width={800} height={300} data={geographicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Legend />
            <Tooltip />
            <Bar dataKey="calls" fill="#00432f" />
          </BarChart>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <h2 className="text-xl font-bold">Latency Heatmap</h2>
          <HeatMap />
        </TabsContent>
      </Tabs>
    </Main>
  );
};

export default AnalyticsLogs;
