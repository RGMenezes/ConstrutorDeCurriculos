import DataBoundary from "@/server/components/DataBoundary";
import PageClient from "./pageClient";
export default function Page() { return <DataBoundary resources={["languages"]}><PageClient /></DataBoundary>; }
