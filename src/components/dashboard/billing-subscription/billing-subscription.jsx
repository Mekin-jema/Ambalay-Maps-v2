import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Trash } from "lucide-react";
import { Main } from "@/pages/dashboard/main";
import { useTable } from "react-table"; // Import react-table

import { NavUser } from "@/pages/dashboard/navbar/header-user";
import { Search } from "@/pages/dashboard/navbar/search";
import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
import { Header } from "@/pages/dashboard/navbar/main-header";

const BillingSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState("Pro Plan - $20/month");
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState("");
  const [newPaymentDetails, setNewPaymentDetails] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const plans = [
    { name: "Basic - $10/month", description: "Ideal for individuals. Includes basic features." },
    { name: "Pro - $20/month", description: "For small teams. Includes advanced features." },
    { name: "Enterprise - $50/month", description: "For large teams. Includes all features and priority support." },
  ];

  const invoices = [
    { date: "2024-02-01", amount: "$20", status: "Paid" },
    { date: "2024-01-01", amount: "$20", status: "Paid" },
  ];

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", details: "**** 1234" },
    { id: 2, type: "PayPal", details: "johndoe@example.com" },
  ]);

  const handlePromoCodeApply = () => {
    setIsPromoValid(promoCode === "DISCOUNT20");
  };

  const handleRemovePaymentMethod = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeletion = () => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== confirmDelete));
    setConfirmDelete(null);
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentType && newPaymentDetails) {
      setPaymentMethods([
        ...paymentMethods,
        { id: Date.now(), type: newPaymentType, details: newPaymentDetails },
      ]);
      setShowAddPaymentMethod(false);
      setNewPaymentType("");
      setNewPaymentDetails("");
    }
  };

  // Set up columns and data for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => invoices, [invoices]);

  // Use react-table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Main>
            <Header>
                        {/* <TopNav links={topNav} /> */}
                        <div className="ml-auto flex items-center space-x-4">
                          <Search />
                          <DarkModeToggle />
                          <NavUser />
                        </div>
                      </Header>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-semibold">{currentPlan}</p>
          <Select onValueChange={(value) => setCurrentPlan(value)}  >
            <SelectTrigger className="w-[200px] ">
              <SelectValue placeholder="Select a plan " />
            </SelectTrigger>
            <SelectContent className="bg-slate-600 text-white" >
              {plans.map((plan, index) => (
                <SelectItem key={index} value={plan.name}>
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

      <Card>
        <CardHeader>
          <CardTitle>Billing History & Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table {...getTableProps()}>
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.render("Header")}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 rounded-lg">
              <p className="text-sm">{method.type} - {method.details}</p>
              <Button variant="outline" size="sm" onClick={() => handleRemovePaymentMethod(method.id)} className="border-none">
                <Trash className="h-4 w-4 text-red-700" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setShowAddPaymentMethod(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Confirm Deletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Are you sure you want to delete this payment method?</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="bg-yellow-300" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                <Button variant="destructive" className="bg-gray-600" onClick={confirmDeletion}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAddPaymentMethod && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md dark:bg-slate-300 dark:text-black bg-slate-500 text-white">
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter Payment Type" value={newPaymentType} onChange={(e) => setNewPaymentType(e.target.value)} />
              <Input placeholder="Enter Payment Details" value={newPaymentDetails} onChange={(e) => setNewPaymentDetails(e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button variant="" className="dark:text-black bg-slate-400" onClick={() => setShowAddPaymentMethod(false)}>Cancel</Button>
                <Button variant="" className="dark:text-black bg-slate-400" onClick={handleAddPaymentMethod}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Promotional Coupons & Discounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button onClick={handlePromoCodeApply}>Apply</Button>
          </div>
          {isPromoValid ? (
            <p className="text-sm text-green-600">Promo code applied successfully!</p>
          ) : (
            promoCode && <p className="text-sm text-red-600">Invalid promo code.</p>
          )}
        </CardContent>
      </Card>
    </Main>
  );
};

export default BillingSubscription;
