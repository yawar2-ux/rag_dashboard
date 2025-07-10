import React from "react";
import SideNav from "./Side_nav/Side_nav";
import TopNav from "./Top_nav/Top_nav";
import EmailDashboard from "./Email_Dashboard/Email_dashboard";
 
function Dashboard() {

    return (
        <div>
            <TopNav />
            <SideNav />
            <EmailDashboard />
        </div>
    )
}
export default Dashboard;