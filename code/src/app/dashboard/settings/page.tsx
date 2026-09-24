import { accountService } from "@/server/services/account.service";
import PageClient from "./pageClient";
export default async function Page() {
  const account = await accountService.get();
  return <PageClient account={account} />;
}
