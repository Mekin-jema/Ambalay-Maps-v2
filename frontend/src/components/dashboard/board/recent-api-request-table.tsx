import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

// Define the type for the request data
interface APIRequest {
  timestamp: string;
  type: string;
  status: string;
  responseTime: string;
}

const recentRequests: APIRequest[] = [
  {
    timestamp: "2024-10-20 10:15 AM",
    type: "Geocoding",
    status: "Success",
    responseTime: "120ms",
  },
  {
    timestamp: "2024-10-20 10:20 AM",
    type: "Routing",
    status: "Failed",
    responseTime: "300ms",
  },
  {
    timestamp: "2024-10-20 10:25 AM",
    type: "Directions",
    status: "Success",
    responseTime: "98ms",
  },
  {
    timestamp: "2024-10-20 10:30 AM",
    type: "Matrix",
    status: "Success",
    responseTime: "150ms",
  },
];

export function RecentAPIRequestsTable() {
  return (
    <div className="p-2 rounded-2xl shadow-lg font-sora">
      <h2 className="text-2xl font-bold mb-4">Recent API Requests</h2>
      <Table className="min-w-full rounded-b-[15px] overflow-hidden dark:bg-[#16423C] p-4 border border-gray-200 dark:border-white/20 font-sora">
        <TableHeader>
          <TableRow className="border-b border-gray-300 dark:border-white">
            <TableHead className="bg-[#D19EDB] text-black dark:text-white px-4 py-2 text-left">
              Timestamp
            </TableHead>
            <TableHead className="bg-[#D19EDB] text-black dark:text-white px-4 py-2 text-left">
              Request Type
            </TableHead>
            <TableHead className="bg-[#D19EDB] text-black dark:text-white px-4 py-2 text-left">
              Status
            </TableHead>
            <TableHead className="bg-[#D19EDB] text-black dark:text-white px-4 py-2 text-left">
              Response Time
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recentRequests.map((request, index) => (
            <TableRow
              key={index}
              className="border-b-[0.5px] border-gray-200 dark:border-gray-300 transition-colors"
            >
              <TableCell className="px-4 py-3 text-left">
                {request.timestamp}
              </TableCell>
              <TableCell className="px-4 py-3 text-left">
                {request.type}
              </TableCell>
              <TableCell className="px-4 py-3 text-left">
                <span
                  className={`px-8 py-2 rounded-full text-sm font-sora font-medium ${
                    request.status === "Success"
                      ? "bg-[#3A7B52] text-white"
                      : "bg-[#9A3939] text-white"
                  }`}
                >
                  {request.status}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3 text-left font-sora">
                {request.responseTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
