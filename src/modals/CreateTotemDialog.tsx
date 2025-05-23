import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {createTotem} from "@/services/totemService.ts";
import {toast} from "sonner";
import {queryClient} from "@/main.tsx";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    latitude: z.string().refine(val => !isNaN(parseFloat(val)), "Latitude must be a number"),
    longitude: z.string().refine(val => !isNaN(parseFloat(val)), "Longitude must be a number"),
});

export function CreateTotemDialog() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const {mutate} = useMutation({
        mutationFn: createTotem,
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['totem'],
                })
                .catch(() => {
                    toast.error("Error invalidating campaign query");
                })
                .finally(() => {
                    toast.success("Totem created successfully");
                    reset();
                });
        },
        onError: () => {
            toast.error("Failed to create totem. Please try again.");
        }
    });

    const onSubmit = (data: { latitude: string; longitude: string; name: string }) => {
        mutate(data);
    };

    return (
        <div className="flex items-center gap-4 w-full">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Create a new viewing point
                    </Button>
                </DialogTrigger>
                <DialogContent className="z-50 max-w-4xl w-full p-8">
                    <DialogHeader>
                        <DialogTitle>Create a new viewing point</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Name:</label>
                            <Input {...register("name")} placeholder="Name" className="w-full"/>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-bold text-gray-700">Latitude</label>
                                <Input {...register("latitude")} placeholder="Latitude" className="w-full"/>
                                {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-bold text-gray-700">Longitude</label>
                                <Input {...register("longitude")} placeholder="Longitude" className="w-full"/>
                                {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
                            </div>
                        </div>
                        <Button type="submit" className="mt-4 w-full">
                            Save
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
