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

    const {
        control,
        register,
        handleSubmit,
        formState: {errors, isLoading},
        reset,
        watch,
    } = useForm<FormData>({
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
            toast.success("Conta criada com sucesso!", {
                description: "Sua empresa foi cadastrada com sucesso.",
            });
            reset();
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Erro ao criar conta", {
                description: error.message || "Ocorreu um erro ao tentar criar a conta.",
            });
        },
    });

    const onSubmit = (form: FormData) => {
        mutate(form)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Create new account
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[80vw] max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Criar uma nova conta</DialogTitle>
                    <p className="text-sm text-gray-600">É rápido e fácil.</p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">

                    <div className="space-y-2">
                        <Label htmlFor="companyName">Razão Social</Label>
                        <Input
                            id="companyName"
                            placeholder="Nome legal da empresa"
                            {...register("companyName", {required: "Campo obrigatório"})}
                        />
                        {errors.companyName && (
                            <span className="text-red-600 text-sm">
                                {errors.companyName.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fantasyName">Nome Fantasia</Label>
                        <Input
                            id="fantasyName"
                            placeholder="Nome comercial da empresa"
                            {...register("fantasyName", {required: "Campo obrigatório"})}
                        />
                        {errors.fantasyName && (
                            <span className="text-red-600 text-sm">
                                {errors.fantasyName.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Controller
                            name="cnpj"
                            control={control}
                            rules={{required: "Campo obrigatório"}}
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
                                            placeholder="00.000.000/0000-00"
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
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@empresa.com.br"
                                {...register("email", {required: "Campo obrigatório"})}
                            />
                            {errors.email && (
                                <span className="text-red-600 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{required: "Campo obrigatório"}}
                                render={({field}) => (
                                    <ReactInputMask
                                        mask="(99)9999-9999"
                                        {...field}
                                    >
                                        {(inputProps) => (
                                            <Input
                                                id="cnpj"
                                                type="text"
                                                {...inputProps}
                                                placeholder="(00)0000-0000"
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
                            <Label htmlFor="password">Nova senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Crie uma senha"
                                {...register("password", {required: "Campo obrigatório"})}
                            />
                            {errors.password && (
                                <span className="text-red-600 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmação de senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme a senha"
                                {...register("confirmPassword", {
                                    required: "Campo obrigatório",
                                    validate: (value) => value === watch('password') || "As senhas não coincidem"
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-600 text-sm">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        Ao clicar em Cadastre-se, você concorda com nossos{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Termos
                        </a>
                        ,{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Política de Privacidade
                        </a>{" "}
                        e{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Política de Cookies
                        </a>
                        . Você poderá receber notificações por SMS e cancelar isso quando quiser.
                    </p>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Carregando" : "Cadastre-se"}
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                            }}
                        >
                            Entrar
                        </a>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}