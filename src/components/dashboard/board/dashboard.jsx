// import { Tooltip } from "@mui/material";
import { RecentAPIRequestsTable } from "@/pages/dashboard/board/recent-api-request-table";
import { UsageStatistics } from "@/pages/dashboard/board/usage-statistics";
import Billing from "@/pages/dashboard/board/total-api-request";
import { NavUser } from "@/pages/dashboard/navbar/header-user";
import { Search } from "@/pages/dashboard/navbar/search";
import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
import { Header } from "@/pages/dashboard/navbar/main-header";
import PricingPlans from "./plan";

const Board = () => {
  return (
    <div className="rounded-lg shadow-md p-2 ml-3">

      <Header>
        {/* <TopNav links={topNav} /> */}
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <DarkModeToggle />
          <NavUser />
        </div>
      </Header>
      <Billing />

      {/* Subscription Plan Section */}
     <PricingPlans />

      {/* Usage Statistics Section */}
      {/* <UsageStatistics /> */}

      {/* Recent API Requests Section */}
      <RecentAPIRequestsTable />
    </div>
  );
};

export default Board;
