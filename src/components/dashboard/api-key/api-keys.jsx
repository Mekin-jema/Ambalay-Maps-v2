import React, { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, Copy, RefreshCw, Trash, Plus } from "lucide-react";
import { NavUser } from "@/pages/dashboard/navbar/header-user";
import { Search } from "@/pages/dashboard/navbar/search";
import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
import { Header } from "@/pages/dashboard/navbar/main-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const initialClients = [
  {
    id: "4235352345342523446464",
    key: "XXXX-XXXX-XXXX",
    name: "Mekin ",
    createdAt: "2024-10-20",
    status: "Active",
    usageLimit: "1000 req/day",
    domain: "example.com",
    showKey: false,
  },
  {
    id: "523452354234523534252",
    key: "XXXX-XXXX-XXXX",
    name: "Bisrart",
    createdAt: "2024-10-18",
    status: "Suspended",
    usageLimit: "500 req/day",
    domain: "another.com",
    showKey: false,
  },
];

const ApiKeyManager = () => {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");

  const handleDelete = useCallback((id) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
  }, []);

  const handleCopy = useCallback((key) => {
    navigator.clipboard.writeText(key);
    // alert("API Key copied!");
  }, []);

  const handleToggleStatus = useCallback((id) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id
          ? { ...client, status: client.status === "Active" ? "Suspended" : "Active" }
          : client
      )
    );
  }, []);

  const handleRegenerate = useCallback((id) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === id ? { ...client, key: uuidv4() } : client))
    );
  }, []);

  const handleGenerateKey = useCallback(() => {
    setClients((prevClients) => [
      ...prevClients,
      {
        id: uuidv4(),
        key: uuidv4(),
        name: `Client ${prevClients.length + 1}`,
        createdAt: new Date().toISOString().split("T")[0],
        status: "Active",
        usageLimit: "1000 req/day",
        domain: "newdomain.com",
        showKey: false,
      },
    ]);
  }, []);

  const handleRevealKey = useCallback((id) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, showKey: !client.showKey } : client
      )
    );
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.domain.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const columns = useMemo(
    () => [
      { header: "Client ID", accessorKey: "id" },
      {
        header: "Masked Key",
        accessorKey: "key",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.showKey ? row.original.key : "****-****-****"}
            <Eye className="w-5 h-5 cursor-pointer text-blue-500" onClick={() => handleRevealKey(row.original.id)} />
          </div>
        ),
      },
      { header: "Key Name", accessorKey: "name" },
      { header: "Creation Date", accessorKey: "createdAt" },
      { header: "Status", accessorKey: "status" },
      { header: "Usage Limit", accessorKey: "usageLimit" },
      { header: "Domain", accessorKey: "domain" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Tooltip content="Copy Key">
              <Copy className="w-5 h-5 cursor-pointer text-green-500" onClick={() => handleCopy(row.original.key)} />
            </Tooltip>
            <Tooltip content="Regenerate Key">
              <RefreshCw className="w-5 h-5 cursor-pointer text-yellow-500" onClick={() => handleRegenerate(row.original.id)} />
            </Tooltip>
            <Tooltip content="Delete Client">
              <Trash className="w-5 h-5 cursor-pointer text-red-500" onClick={() => handleDelete(row.original.id)} />
            </Tooltip>
            <Button
              size="sm"
              className={row.original.status === "Active" ? "bg-red-500 text-white" : "bg-green-500 text-white"}
              onClick={() => handleToggleStatus(row.original.id)}
            >
              {row.original.status === "Active" ? "Suspend" : "Activate"}
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete, handleCopy, handleRegenerate, handleRevealKey, handleToggleStatus]
  );

  const table = useReactTable({
    data: filteredClients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="rounded-lg shadow-md  ">
       <Header>
                  {/* <TopNav links={topNav} /> */}
                  <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <DarkModeToggle />
                    <NavUser />
                  </div>
                </Header>
      <div className="flex justify-between items-center mb-4">
        <CardHeader className="text-2xl font-bold">API Key Manager</CardHeader>
        <Button onClick={handleGenerateKey} className="bg-[#00432f]"><Plus width={5} height={5}/>Generate API Key</Button>
      </div>
      <CardContent>

    
      <Input
        placeholder="Search by Name or Domain"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;