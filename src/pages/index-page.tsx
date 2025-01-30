import DemoComponent from "@/components/demo";
import { Link } from "react-router";

export default function IndexPage() {
  return(
    <div>
      <DemoComponent />

      <main className="p-4 space-y-16">
        <h1 className="text-4xl text-center"> React Template </h1>

        <h4 className="text-2xl text-center">Esta página é só um teste para verificar se as dependências estão funcionando.</h4>

        <Link className="block w-fit underline text-blue-400 mx-auto" to="/about"> Ir para /about </Link>
      </main>
    </div>
  )
}