import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Props} from "@/modals/utlis/types.ts";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {createCompany} from "@/services/companyService.ts";
import {toast} from "sonner";
import ReactInputMask from "react-input-mask";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";

interface FormData {
    companyName: string
    fantasyName: string
    cnpj: string
    email: string
    phone: string
    password: string
    confirmPassword: string
}

export function SignUpDialog({isOpen, setIsOpen}: Props) {
    const { t } = useTranslation();

    const signUpSchema = z.object({
        companyName: z.string().min(1, t("signUp.companyName.error")),
        fantasyName: z.string().min(1, t("signUp.fantasyName.error")),
        cnpj: z.string().min(1, t("signUp.cnpj.error")),
        email: z.string().email(t("signUp.email.error.invalid")),
        phone: z.string().min(1, t("signUp.phone.error")),
        password: z.string().min(6, t("signUp.password.error.minLength")),
        confirmPassword: z.string().min(1, t("signUp.confirmPassword.error.required")),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t("signUp.confirmPassword.error.mismatch"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isLoading},
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            companyName: '',
            fantasyName: '',
            cnpj: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        }
    })

    const {mutate} = useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            toast.success(t("signUp.success.title"), {
                description: t("signUp.success.description"),
            });
            reset();
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error(t("signUp.error.title"), {
                description: error.message || t("signUp.error.description"),
            });
        },
    });

    const onSubmit = (form: FormData) => {
        mutate(form)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
            <DialogTrigger asChild>
                <Button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    {t("login.registerButton")}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-[90vw] sm:max-w-2xl max-h-screen overflow-y-auto p-6"
                onInteractOutside={(event) => event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{t("signUp.title")}</DialogTitle>
                    <p className="text-sm text-gray-600">{t("signUp.subtitle")}</p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">{t("signUp.companyName.label")}</Label>
                        <Input
                            id="companyName"
                            placeholder={t("signUp.companyName.placeholder")}
                            {...register("companyName")}
                        />
                        {errors.companyName && (
                            <span className="text-red-600 text-sm">
                                {errors.companyName.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fantasyName">{t("signUp.fantasyName.label")}</Label>
                        <Input
                            id="fantasyName"
                            placeholder={t("signUp.fantasyName.placeholder")}
                            {...register("fantasyName")}
                        />
                        {errors.fantasyName && (
                            <span className="text-red-600 text-sm">
                                {errors.fantasyName.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cnpj">{t("signUp.cnpj.label")}</Label>
                        <Controller
                            name="cnpj"
                            control={control}
                            render={({field}) => (
                                <ReactInputMask
                                    mask="99.999.999/9999-99"
                                    {...field}
                                >
                                    {(inputProps) => (
                                        <Input
                                            id="cnpj"
                                            type="text"
                                            {...inputProps}
                                            placeholder={t("signUp.cnpj.placeholder")}
                                        />
                                    )}
                                </ReactInputMask>
                            )}
                        />
                        {errors.cnpj && (
                            <span className="text-red-600 text-sm">
                                {errors.cnpj.message}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("signUp.email.label")}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t("signUp.email.placeholder")}
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className="text-red-600 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">{t("signUp.phone.label")}</Label>
                            <Controller
                                name="phone"
                                control={control}
                                render={({field}) => (
                                    <ReactInputMask
                                        mask="(99)99999-9999"
                                        {...field}
                                    >
                                        {(inputProps) => (
                                            <Input
                                                id="phone"
                                                type="text"
                                                {...inputProps}
                                                placeholder={t("signUp.phone.placeholder")}
                                            />
                                        )}
                                    </ReactInputMask>
                                )}
                            />
                            {errors.phone && (
                                <span className="text-red-600 text-sm">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("signUp.password.label")}</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder={t("signUp.password.placeholder")}
                                {...register("password")}
                            />
                            {errors.password && (
                                <span className="text-red-600 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">{t("signUp.confirmPassword.label")}</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder={t("signUp.confirmPassword.placeholder")}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-600 text-sm">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        {t("signUp.terms.text", {
                            terms: <a href="#" className="text-blue-600 hover:underline">
                                {t("signUp.terms.terms")}
                                   </a>,
                            privacyPolicy: <a href="#" className="text-blue-600 hover:underline">
                                {t("signUp.terms.privacyPolicy")}
                                           </a>,
                            cookiePolicy: <a href="#" className="text-blue-600 hover:underline">
                                {t("signUp.terms.cookiePolicy")}
                                          </a>
                        })}
                    </p>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? t("signUp.submitButton.loading") : t("signUp.submitButton.default")}
                    </Button>
                </form>

                <div className="text-center mt-1">
                    <p className="text-sm text-gray-600">
                        {t("login.alreadyHaveAccount")}{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                            }}
                        >
                            {t("login.logIn")}
                        </a>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}