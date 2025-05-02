import React, {useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {StripeCardElementChangeEvent} from "@stripe/stripe-js";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useController, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import api from "@/lib/api.ts";
import {Label} from "@/components/ui/label";
import MoneyInput from "@/components/MoneyInput";
import {v4 as uuidv4} from 'uuid';
import {queryClient} from "@/main.tsx";
import {toast} from "sonner";

interface CreditResponse {
    clientSecret: string;
}

const schema = z.object({
    amount: z
        .number()
        .min(100, "Minimum amount is R$100"),
});

type FormData = z.infer<typeof schema>;

const AddCreditDialog: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {amount: 0},
    });

    const {field} = useController({
        name: "amount",
        control,
    });

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card field not found in the form.");
            return;
        }

        setProcessing(true);

        const amountInCents = Math.round(Number(data.amount) * 100);

        const paymentIntentIdRequest = uuidv4();

        try {
            const response = await api.post<CreditResponse>("/payments/create-payment-intent", {
                amount: amountInCents,
                paymentIntentIdRequest: paymentIntentIdRequest
            });

            const clientSecret = response.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {card: cardElement},
            });

            if (result.error) {
                setError(result.error.message ?? "Payment failed. Please try again.");
            } else {
                setOpen(false);
            }


            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Failed to create payment intent.");
        } finally {
            queryClient.invalidateQueries({queryKey: ["payments"]})
                .catch(() => {
                    toast.error("Error invalidating payments query");
                })

            reset();
            setProcessing(false);
        }
    };

    const handleCardChange = (event: StripeCardElementChangeEvent) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} className="bg-green-500 hover:bg-green-600 text-white">
                    Add Credit
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]" onInteractOutside={(event) => event.preventDefault()}>
                <div className="flex justify-between items-center">
                    <DialogTitle>Add Credit</DialogTitle>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="amount">Amount (R$)</Label>

                        <MoneyInput
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-1">Card</Label>
                        <CardElement onChange={handleCardChange}/>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button type="submit" className="w-full" disabled={processing}>
                        Confirm Payment
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCreditDialog;
