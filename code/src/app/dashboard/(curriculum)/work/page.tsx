import DataBoundary from "@/server/components/DataBoundary";
import PageClient from "./pageClient";
export default function Page() { return <DataBoundary resources={["work"]}><PageClient /></DataBoundary>; }
