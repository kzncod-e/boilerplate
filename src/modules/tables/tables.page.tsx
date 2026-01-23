import BaseLayout from "@/components/global/base-layout";
import PageHeader from "@/components/global/page-header";
import { BasicTable } from "@/components/global/tables/basic-table";
import { influencerDummyData, invoiceDummyData } from "@/constants/table-data";
import React from "react";
import SocmedTable from "../dashboard/components/table-card";
import { dummySocmedMentionData } from "@/constants/dashboard";
import InfluentialAccountsTable from "@/components/global/tables/account-tabble";
import NewsDomainDistributionTable from "@/components/global/tables/new-domain-distribution-table";
const columns = ["invoice", "paymentStatus", "paymentMethod", "totalAmount"];

const data = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    totalAmount: "$250.00",
  },
];
const TablesPage = () => {
  return (
    <BaseLayout>
      <PageHeader
        title="Tables page"
        description="reusable tables components with dynamic props"
      />
      <div className="flex flex-col gap-5">
        <BasicTable
          columns={columns}
          caption="Invoices"
          data={data}
          pagination={{ pageSize: 3 }}
        />
        <SocmedTable data={dummySocmedMentionData} />
        <InfluentialAccountsTable
          title="account table"
          data={influencerDummyData}
        />
        <NewsDomainDistributionTable />
      </div>
    </BaseLayout>
  );
};

export default TablesPage;
