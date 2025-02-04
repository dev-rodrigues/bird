import {useState} from "react";
import {SignUpDialog} from "@/components/modals/SignUpDialog.tsx";

export default function Index() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:items-start md:space-x-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold mb-4">Bird</h1>
                    <p className="text-lg">A Bird ajuda você a se conectar com as pessoas de forma simples e direta, levando sua mensagem para as ruas com nossos telões de LED que chamam a atenção de todos que passam.</p>
                </div>

                <div className="md:w-1/2">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Email ou telefone"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha?</a>
                    </div>

                    <div className="mt-6 border-t pt-4">

                        <SignUpDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>

        </div>
    )
}