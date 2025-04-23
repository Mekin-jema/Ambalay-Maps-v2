import React from "react";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Line, Tooltip,
} from "recharts";
import { MapPin, Compass, Layers, BarChart as BarChartIcon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Main } from "../main";

const apiData = [
  { name: "Matrix ", value: 25, color: "#4ade80", icon: <Layers /> },
  { name: "Direction", value: 35, color: "#3b82f6", icon: <Compass /> },
  { name: "Routing", value: 30, color: "#f472b6", icon: <BarChartIcon /> },
  { name: "Geocoding", value: 25, color: "#f97316", icon: <MapPin /> },
];

const mockData = [
  { id: 1, title: "Geocoding Request", value: "244,234", icon: <MapPin className="text-muted-foreground h-5 w-5" /> },
  { id: 2, title: "Routing", value: "34,523", icon: <Compass className="text-muted-foreground h-5 w-5" /> },
  { id: 3, title: "Directions", value: "343,545", icon: <BarChartIcon className="text-muted-foreground h-5 w-5" /> },
  { id: 4, title: "Matrix", value: "4,573", icon: <Layers className="text-muted-foreground h-5 w-5" /> },
];

const performanceData = [
  { day: "Mon", requests: 600 },
  { day: "Tue", requests: 500 },
  { day: "Wed", requests: 700 },
  { day: "Thu", requests: 650 },
  { day: "Fri", requests: 580 },
  { day: "Sat", requests: 480 },
];

const weeklyOverviewData = [
  { name: "Mon", sales: 30 },
  { name: "Tue", sales: 40 },
  { name: "Wed", sales: 50 },
  { name: "Thu", sales: 70 },
  { name: "Fri", sales: 60 },
  { name: "Sat", sales: 45 },
];

const Billing = () => {
  return (
    <Main className=" p-2 h-full  rounded-xl ">

      {/* /* Top Stat Cards */}
      <Card className="rounded-2xl  border-none h-[155px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 h-full pt-6">
          {mockData.map((item) => (
            <Card
              key={item.id}
              className="bg-[#E9EFEC] dark:bg-background w-full rounded-xl hover:scale-105 transition-all duration-300 h-full"
            >
              <div className="flex gap-3 items-center justify-between p-3">
                <p className="text-sm font-semibold">{item.title}</p>
                {item.icon}
              </div>
              <CardContent className="flex items-center h-full">
                <div className="text-3xl font-extrabold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
      <h2 className="font-bold text-[24px] my-3 font-nunito">Summary</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {/* API Distribution with Icons */}
        <Card className="rounded-2xl p-2 relative bg-[#E9EFEC] dark:bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">API Request Distribution</CardTitle>
          </CardHeader>
          <CardContent className="relative" >
            <div className="relative w-[250px] mx-auto">
              <PieChart width={250} height={250}>
                <Pie
                  data={apiData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {apiData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>

              {/* Overlay icons positioned at the center of each slice */}
              {apiData.map((entry, index) => {
                const total = apiData.reduce((sum, d) => sum + d.value, 0);
                const startAngle = apiData.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                const midAngle = startAngle + ((entry.value / total) * 360) / 2;
                const radian = (midAngle * Math.PI) / 180;
                const x = 125 + 70 * Math.cos(radian); // 70 is radius midpoint for icon placement
                const y = 125 + 70 * Math.sin(radian);

                return (
                  <div
                    key={index}
                    className="absolute bg-opacity-40 rounded-full p-1 flex items-center justify-center"
                    style={{
                      left: `${x - 12}px`, // center the icon horizontally
                      top: `${y - 12}px`,  // center the icon vertically
                    }}
                  >
                    {entry.icon}
                  </div>
                );
              })}
            </div>

            {/* /* Legends */}
            <ul className="text-sm grid grid-cols-2  ">
              {apiData.map((entry, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: entry.color }}
                  ></div>
                  <span className="">{entry.name}</span>
                  <span className="">{entry.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>

        </Card>

        {/* Weekly Performance Chart */}
        <Card className=" rounded-2xl   bg-[#E9EFEC] dark:bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart width={280} height={200} data={performanceData}>
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip />
              <Area type="monotone" dataKey="requests" stroke="#4f46e5" fillOpacity={1} fill="url(#colorReq)" />
            </AreaChart>
            <p className="mt-4 text-center text-green-400 text-lg">4,800+ Requests</p>
          </CardContent>
        </Card>

        {/* Weekly Overview Bar Chart */}
        <Card className=" rounded-2xl   bg-[#E9EFEC] dark:bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={280} height={200} data={weeklyOverviewData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <RechartsTooltip />
              <Bar dataKey="sales" fill="#3b82f6" barSize={30} radius={[8, 8, 0, 0]} />
              <Line type="monotone" dataKey="sales" stroke="#f472b6" strokeWidth={2} />
            </BarChart>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold text-green-400">30%</p>
              <p className="text-sm text-gray-400">Sales performance up by 30% vs last month</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </Main>
  );
};

export default Billing;
