import DataBoundary from "@/server/components/DataBoundary";
import PageClient from "./pageClient";
export default function ProfilePage() {
  return <DataBoundary resources={["profiles", "addresses", "links"]}>
    <div className="mb-6 space-y-2"><h1 className="text-3xl font-bold">Perfil profissional</h1><p>Cadastre suas informações uma vez e escolha o que utilizar em cada currículo.</p></div>
    <PageClient />
  </DataBoundary>;
}
