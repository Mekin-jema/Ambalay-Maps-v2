'use client';
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard, Banknote } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation"; // useSearchParams from Next.js

interface Bank {
  id: string;
  name: string;
}

interface Plan {
  title: string;
  description: string;
  price: string;
  features: string[];
  current: boolean;
}

interface Feature {
  title: string;
  description: string;
  price: string;
}

const banks: Bank[] = [
  { id: "nib", name: "Ethiopian Nib Bank" },
  { id: "coupon", name: "Coupon" },
  { id: "dashen", name: "Dashen Bank" },
  { id: "cbe", name: "Commercial Bank of Ethiopia" },
  { id: "abyssinia", name: "Bank of Abyssinia" },
];

const plans: Plan[] = [
  {
    title: "Basic Routing",
    description: "Get started with basic routing services for your app.",
    price: "499.99birr/month",
    features: ["200request/day", "200request/day", "200request/day"],
    current: true,
  },
  {
    title: "Advanced Routing",
    description: "Include traffic-aware routing and real-time updates.",
    price: "1299.99birr/month",
    features: ["200request/day", "200request/day", "200request/day"],
    current: false,
  },
  {
    title: "Enterprise Routing",
    description: "Include traffic-aware routing and real-time updates.",
    price: "1299.99birr/month",
    features: ["200request/day", "200request/day", "200request/day"],
    current: false,
  },
];

const additionalFeatures: Feature[] = [
  {
    title: "Geocoding API",
    description: "Get started with basic routing services for your app.",
    price: "$200",
  },
  {
    title: "Map tile optimization",
    description: "Include traffic-aware routing and real-time updates.",
    price: "$200",
  },
];

export default function PricingPlans() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");

  const paymentMethods = [
    {
      id: "cbe",
      name: "Commercial Bank of Ethiopia",
      icon: <Banknote className="mr-2 h-4 w-4" />,
      details: "Account number: 123-456-789-543",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      details: "Pay with Visa, Mastercard, etc.",
    },
  ];

  const [searchParams] = useSearchParams(); // For Next.js

  return (
    <Dialog >
      <div>
        <h2 className="text-2xl font-bold mb-4">Choose your plan</h2>
        <div className="grid md:grid-cols-3 gap-[25px]">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className="text-center  bg-[#E9EFEC] dark:bg-background"
            >
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p className="text-sm">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center justify-center text-sm"
                    >
                      <CheckCircle
                        className="h-4 w-4 text-white mr-2"
                        fill="#770E9C"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="text-lg font-bold">{plan.price}</div>

                {plan.current ? (
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="!rounded-[7px] dark:bg-[#F9F9F9] dark:text-[#37474F] bg-[#16423C] text-white"
                    >
                      Current Plan
                    </Button>
                  </DialogTrigger>
                ) : (
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="!rounded-[7px] dark:bg-[#F9F9F9] dark:text-[#37474F] bg-[#16423C] text-white"
                    >
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Additional Features</h2>
        <div className="flex gap-3">
          {additionalFeatures.map((feature, i) => (
            <Card key={i} className="bg-[#E9EFEC] dark:bg-background w-[300px]">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
                <div className="text-md font-bold">{feature.price}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DialogContent
        className="max-w-md backdrop-blur-sm !rounded-[20px] !border-none !p-6 shadow-lg bg-black/50"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-[24px] font-sora">
            Order Summary
          </DialogTitle>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardContent className="space-y-4 px-0">
            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product total</span>
                <span>124.50</span>
              </div>
              <Separator className="dark:bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span>12.25</span>
              </div>
              <Separator className="dark:bg-slate-300" />
              <div className="flex justify-between font-medium">
                <span className="font-sora font-bold text-[#16423C] dark:text-white">
                  Total
                </span>
                <span className="font-sora font-bold text-[#16423C] dark:text-white">
                  $112.25
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="bank">Select Payment Method</Label>
              <Select onValueChange={setSelectedBank} value={selectedBank}>
                <SelectTrigger id="bank" className="w-full">
                  <SelectValue
                    placeholder="Choose a bank"
                    className="dark:bg-[#438179]"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#E9EFEC] dark:bg-[#438179] border-none">
                  {banks.map((bank) => (
                    <SelectItem
                      key={bank.id}
                      value={bank.id}
                      className="font-sora dark:hover:bg-[#76c4b9d2] border-none"
                    >
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedBank && (
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">
                    Account Number / Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="Enter your account/card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="pl-10 dark:bg-[#438179]"
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="px-0">
            <Button
              className="w-full bg-[#16423C] dark:bg-[#021815] text-white"
              disabled={!selectedBank || !cardNumber}
            >
              Finish
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
