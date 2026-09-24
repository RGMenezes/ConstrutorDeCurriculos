import DataBoundary from "@/server/components/DataBoundary";
import PageClient from "./pageClient";
export default function Page() { return <DataBoundary resources={["profiles", "addresses", "links", "work", "formation", "skills", "languages", "feedbacks", "curriculums"]}><PageClient /></DataBoundary>; }
