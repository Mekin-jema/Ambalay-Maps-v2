'use client';

// import { Tooltip } from "@mui/material";
// import { RecentAPIRequestsTable } from "@/pages/dashboard/board/recent-api-request-table";
// import Billing from "@/pages/dashboard/board/total-api-request";
// import { UsageStatistics } from "@/pages/dashboard/board/usage-statistics";
// import { NavUser } from "@/pages/dashboard/navbar/header-user";
// import { Search } from "@/pages/dashboard/navbar/search";
// import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
// import { Header } from "@/pages/dashboard/navbar/main-header";
import PricingPlans from "./plan";
import { RecentAPIRequestsTable } from "./recent-api-request-table";
import Billing from "./total-api-request";
import { UsageStatistics } from "./usage-statistics";

const Board = () => {
  return (
    <div className="rounded-lg shadow-md p-2 ml-3">

      {/* <Header>

        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <DarkModeToggle />
          <NavUser />
        </div>
      </Header> */}
      <Billing />

      {/* Subscription Plan Section */}
     <PricingPlans />

      {/* Usage Statistics Section */}
      <UsageStatistics />

      {/* Recent API Requests Section */}
      <RecentAPIRequestsTable />
    </div>
  );
};

export default Board;
