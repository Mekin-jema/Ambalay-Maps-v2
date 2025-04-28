"use client";

import React, { useMemo } from "react";
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { Download, Plus, Trash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Main } from "../utils/main";

// Types
interface Invoice {
  date: string;
  amount: string;
  status: string;
}

interface PaymentMethod {
  id: number;
  type: string;
  details: string;
}

const BillingSubscription: React.FC = () => {
  const [currentPlan, setCurrentPlan] = React.useState("Pro Plan - $20/month");
  const [promoCode, setPromoCode] = React.useState("");
  const [isPromoValid, setIsPromoValid] = React.useState(false);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = React.useState(false);
  const [newPaymentType, setNewPaymentType] = React.useState("");
  const [newPaymentDetails, setNewPaymentDetails] = React.useState("");
  const [confirmDelete, setConfirmDelete] = React.useState<number | null>(null);

  const plans = [
    { name: "Basic - $10/month", description: "Ideal for individuals. Includes basic features." },
    { name: "Pro - $20/month", description: "For small teams. Includes advanced features." },
    { name: "Enterprise - $50/month", description: "For large teams. Includes all features and priority support." },
  ];

  const invoices: Invoice[] = [
    { date: "2024-02-01", amount: "$20", status: "Paid" },
    { date: "2024-01-01", amount: "$20", status: "Paid" },
  ];

  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    { id: 1, type: "Visa", details: "**** 1234" },
    { id: 2, type: "PayPal", details: "johndoe@example.com" },
  ]);

  const handlePromoCodeApply = () => {
    setIsPromoValid(promoCode === "DISCOUNT20");
  };

  const handleRemovePaymentMethod = (id: number) => {
    setConfirmDelete(id);
  };

  const confirmDeletion = () => {
    if (confirmDelete !== null) {
      setPaymentMethods((methods) => methods.filter((method) => method.id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentType && newPaymentDetails) {
      setPaymentMethods((prev) => [
        ...prev,
        { id: Date.now(), type: newPaymentType, details: newPaymentDetails },
      ]);
      setShowAddPaymentMethod(false);
      setNewPaymentType("");
      setNewPaymentDetails("");
    }
  };

  // TanStack React Table v8 Setup
  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Action",
        id: "action",
        cell: () => (
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Main>
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-semibold">{currentPlan}</p>
          <Select onValueChange={(value) => setCurrentPlan(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent className="bg-slate-600 text-white">
              {plans.map((plan, idx) => (
                <SelectItem key={idx} value={plan.name}>
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-sm">{plan.description}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History & Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      {/* (same as before, no changes) */}
      {/* ... your payment methods, promo code, add modal, delete modal ... */}

    </Main>
  );
};

export default BillingSubscription;
