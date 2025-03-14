import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { configureStatus } from "@/services/campaignService";
import { queryClient } from "@/main";

const reasonSchema = z.object({
    reason: z.string().min(5, "Reason is required and should have at least 5 characters"),
});

interface Props {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    campaignId: number;
}

export function CampaignDetailReason({ isOpenModal, setIsOpenModal, campaignId }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(reasonSchema),
    });

    const { mutate } = useMutation({
        mutationFn: ({ id, status, reason }: { id: number; status: string; reason: string }) =>
            configureStatus(id, status, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["campaigns", campaignId] })
                .catch(() => {
                    toast.error("Error invalidating campaign query");
                })
                .finally(() => {
                    toast.success("Campaign updated successfully");
                });
            setIsOpenModal(false);
            reset();
        },
    });

    const onSubmit = (data: { reason: string }) => {
        mutate({ id: campaignId, status: "DENIED", reason: data.reason });
    };

    return (
        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Rejection Reason</DialogTitle>
                    <DialogDescription>
                        To deny a campaign, you must provide a justification.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="reason">Reason</Label>
                            <Input id="reason" {...register("reason")} className="w-full" />
                        </div>
                        {errors.reason && (
                            <p className="text-red-500 text-sm">{errors.reason.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
