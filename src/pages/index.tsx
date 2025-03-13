import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SignUpDialog} from "@/modals/SignUpDialog.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import {toast} from "sonner";
import {Navigate} from "react-router";

const loginSchema = z.object({
    email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Index() {
    const service = useAuth();
    const [redirect, setRedirect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            await service.login({user: data.email, password: data.password});
            setRedirect(true);
            toast.success("Successfully logged in");
        } catch (error) {
            toast.error("Error on login. Please check your credentials");
            console.error("Erro ao fazer login", error);
        }
    };

    if (redirect) {
        return <Navigate to="/dashboard" replace/>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:items-start md:space-x-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <h1 className="text-5xl text-center font-bold mb-4">Bird</h1>
                    <p className="text-lg text-center">
                        Bird helps you connect with people in a simple and direct way.
                    </p>
                </div>

                <div className="md:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            type="text"
                            placeholder="E-mail"
                            className="w-full p-2 border rounded"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            To Enter
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 hover:underline">Forgot your password?</a>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <SignUpDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </div>
                </div>
            </div>
        </div>
    );
}