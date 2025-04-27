
"use client";

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from 'next-themes'; // Assuming you're using shadcn/ui's ThemeProvider

interface Series {
  name: string;
  data: number[];
}

interface Options {
  chart: {
    height: number;
    type: 'heatmap';
    foreColor: string;
  };
  plotOptions: {
    heatmap: {
      shadeIntensity: number;
      radius: number;
      useFillColorAsStroke: boolean;
      colorScale: {
        ranges: {
          from: number;
          to: number;
          name: string;
          color: string;
        }[];
      };
    };
  };
  dataLabels: {
    enabled: boolean;
    style: {
      colors: string[];
    };
  };
  stroke: {
    width: number;
    colors: string[];
  };
  title: {
    text: string;
    style: {
      color: string;
    };
  };
  xaxis: {
    categories: string[];
    labels: {
      style: {
        colors: string;
      };
    };
  };
  yaxis: {
    labels: {
      style: {
        colors: string;
      };
    };
  };
  tooltip: {
    theme: string;
  };
}

const generateData = (num: number, ranges: { min: number; max: number }): number[] => {
  return Array.from({ length: num }, () =>
    Math.floor(Math.random() * (ranges.max - ranges.min + 1)) + ranges.min
  );
};

const HeatMap: React.FC = () => {
  const { theme } = useTheme(); // Get the current theme
  const isDarkMode = theme === 'dark'; // Check if dark mode is active

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';

  const [state] = useState<{
    series: Series[];
    options: Options;
  }>({
    series: [
      { name: 'Bole', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Piazza', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Akaki', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Lideta', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Kolfe Keranio', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Yeka', data: generateData(9, { min: 0, max: 100 }) },
      { name: 'Addis Ketema', data: generateData(9, { min: 0, max: 100 }) }
    ],
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        foreColor: textColor
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              { from: 0, to: 20, name: 'Low Requests', color: '#00A100' },
              { from: 21, to: 50, name: 'Moderate Requests', color: '#128FD9' },
              { from: 51, to: 80, name: 'High Requests', color: '#FFB200' },
              { from: 81, to: 100, name: 'Extreme Requests', color: '#FF0000' }
            ]
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: Array(9).fill(textColor) // Ensures all labels match text color
        }
      },
      stroke: {
        width: 1,
        colors: ['transparent'] // Removes any stroke background influence
      },
      title: {
        text: 'API Request Heatmap Across Addis Ababa',
        style: {
          color: textColor
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: {
            colors: textColor
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: textColor
          }
        }
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light'
      }
    }
  });

  return (
    <div style={{ padding: '10px', borderRadius: '10px' }}>
      <ReactApexChart options={state.options} series={state.series} type="heatmap" height={350} />
    </div>
  );
};

export default HeatMap;
