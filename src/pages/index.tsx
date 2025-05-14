import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpDialog } from "@/modals/SignUpDialog.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { toast } from "sonner";
import { Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Languages } from "lucide-react";
import i18n from "i18next"; // Using Lucide React for language icon

export default function Index() {
    const { t } = useTranslation();
    const service = useAuth();
    const [redirect, setRedirect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const loginSchema = z.object({
        email: z.string().min(1, t("login.validation.emailRequired")).email(t("login.validation.emailInvalid")),
        password: z.string().min(6, t("login.validation.passwordMin")),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';
        void i18n.changeLanguage(newLang);
    };

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
        try {
            await service.login({ user: data.email, password: data.password });
            setRedirect(true);
            toast.success(t("login.toastSuccess"));
        } catch (error) {
            toast.error(t("login.toastError"));
            console.error("Erro ao fazer login", error);
        }
    };

    if (redirect) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2"
                aria-label={t("toggleLanguage")}
            >
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">{i18n.language === 'en' ? 'Português' : 'English'}</span>
            </Button>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:items-start md:space-x-8">
                <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t("login.title")}</h1>
                    <p className="text-base sm:text-lg">{t("login.description")}</p>
                </div>

                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            type="text"
                            placeholder={t("login.emailPlaceholder")}
                            className="w-full p-2 border rounded"
                            {...register("email")}
                            onChange={(e) => e.target.value = e.target.value.toLowerCase()}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input
                            type="password"
                            placeholder={t("login.passwordPlaceholder")}
                            className="w-full p-2 border rounded"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            {t("login.loginButton")}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-600 hover:underline">{t("login.forgotPassword")}</a>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <SignUpDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
}