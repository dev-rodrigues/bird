import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import InputMask from "react-input-mask";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function SignUpDialog({isOpen, setIsOpen}: Props) {

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Criar nova conta
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[80vw] max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Criar uma nova conta</DialogTitle>
                    <p className="text-sm text-gray-600">É rápido e fácil.</p>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                    <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="Nome"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthdate">Data de nascimento</Label>
                            <Input id="birthdate" type="date" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <InputMask mask="999.999.999-99" placeholder="000.000.000-00">
                                {(inputProps) => <Input id="cpf" type="text" {...inputProps} />}
                            </InputMask>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <InputMask
                                mask="(99) 999999-9999"
                                placeholder="(00) 000000-000"
                            >
                                {(inputProps) => <Input id="phone" type="tel" {...inputProps} />}
                            </InputMask>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Nova senha</Label>
                            <Input id="password" type="password" placeholder="Nova senha"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirmação de senha</Label>
                            <Input id="password" type="password" placeholder="Confirmação"/>
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
                    <Button type="submit" className="w-full">
                        Cadastre-se
                    </Button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                                e.preventDefault(); // Evita a navegação padrão do link
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