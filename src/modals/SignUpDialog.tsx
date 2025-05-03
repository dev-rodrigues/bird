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
            toast.success("Account successfully created!", {
                description: "Your company has been successfully registered.",
            });
            reset();
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Error creating account", {
                description: error.message || "An error occurred while trying to create the account.",
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
                    Create new account
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-[90vw] sm:max-w-2xl max-h-screen overflow-y-auto p-6"
                onInteractOutside={(event) => event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Create a new account</DialogTitle>
                    <p className="text-sm text-gray-600">It&apos;s quick and easy.</p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">

                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            placeholder="Legal name of the company"
                            {...register("companyName", {required: "This field is required"})}
                        />
                        {errors.companyName && (
                            <span className="text-red-600 text-sm">
                                {errors.companyName.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fantasyName">Trade Name</Label>
                        <Input
                            id="fantasyName"
                            placeholder="Business name of the company"
                            {...register("fantasyName", {required: "This field is required"})}
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
                            rules={{required: "This field is required"}}
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@company.com"
                                {...register("email", {required: "This field is required"})}
                            />
                            {errors.email && (
                                <span className="text-red-600 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{required: "This field is required"}}
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
                                                placeholder="(00)00000-0000"
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
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {required: "This field is required"})}
                            />
                            {errors.password && (
                                <span className="text-red-600 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword", {
                                    required: "This field is required",
                                    validate: (value) => value === watch('password') || "Passwords do not match"
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
                        By clicking Sign Up, you agree to our{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms
                        </a>
                        ,{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Cookie Policy
                        </a>
                        . You may receive SMS notifications and can opt out at any time.
                    </p>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Loading" : "Sign Up"}
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                            }}
                        >
                            Log In
                        </a>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
