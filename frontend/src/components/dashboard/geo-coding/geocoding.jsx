import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const GeocodingService = () => {
  const [addresses, setAddresses] = useState([
    "1600 Pennsylvania Ave NW, Washington, DC 20500",
    "221B Baker Street, London, NW1 6XE, UK",
    "Eiffel Tower, Champ de Mars, 5 Avenue Anatole, 75007 Paris, France",
  ]);
  const [recentRequests, setRecentRequests] = useState([]);

  // Simulate API call for geocoding (Replace with real API)
  const fetchGeocode = async (address) => {
    return {
      address,
      latitude: (Math.random() * 180 - 90).toFixed(6),
      longitude: (Math.random() * 360 - 180).toFixed(6),
    };
  };

  // Handle CSV Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const newAddresses = results.data.flat().filter((row) => row !== "");
        setAddresses(newAddresses);
      },
    });
  };

  // Process Geocoding Requests
  const processGeocoding = async () => {
    const geocodeResults = await Promise.all(addresses.map(fetchGeocode));

    // Update recent requests (keep last 10)
    setRecentRequests((prev) =>
      [...geocodeResults, ...prev].slice(0, 10)
    );

    setAddresses([]);
  };

  // Export data
  const exportData = (format) => {
    if (recentRequests.length === 0) return;

    if (format === "csv") {
      const csv = Papa.unparse(recentRequests);
      const blob = new Blob([csv], { type: "text/csv" });
      saveAs(blob, "geocode_results.csv");
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(recentRequests, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, "geocode_results.json");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(recentRequests);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Geocode Results");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "geocode_results.xlsx");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* File Upload */}
      <div className="border p-4 rounded-md">
        <h2 className="text-lg font-semibold">Bulk Geocoding</h2>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        <Button className="bg-[#00432F] hover:bg-[#237a60] text-white mt-3"  onClick={processGeocoding} disabled={addresses.length === 0}>
          Process Geocoding
        </Button>
      </div>

      {/* Recent Requests */}
      <div className="p-4 rounded-md">
        <h2 className="text-lg font-semibold">Recent Geocoding Requests</h2>
        {recentRequests.length > 0 ? (
          <table className="w-full border mt-3">
            <thead>
              <tr>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Latitude</th>
                <th className="p-2 text-left">Longitude</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">{item.address}</td>
                  <td className="p-2">{item.latitude}</td>
                  <td className="p-2">{item.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent requests.</p>
        )}
      </div>

      {/* Export Data */}
      <div className="border p-4 rounded-md">
        <h2 className="text-lg font-semibold">Export Data</h2>
        <div className="flex space-x-2 mt-3">
          <Button className="bg-[#00432F] hover:bg-[#237a60] text-white" onClick={() => exportData("csv")}>Export CSV</Button>
          <Button className="bg-[#00432F] hover:bg-[#237a60] text-white" onClick={() => exportData("json")}>Export JSON</Button>
          <Button className="bg-[#00432F] hover:bg-[#237a60] text-white" onClick={() => exportData("excel")}>Export Excel</Button>
        </div>
      </div>
    </div>
  );
};

export default GeocodingService;
