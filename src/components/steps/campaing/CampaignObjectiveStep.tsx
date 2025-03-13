import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Megaphone, MessageCircle, Store} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";
import {useState} from "react";
import {motion} from "framer-motion";

const descriptions: Record<string, { title: string; text: string }> = {
    recognition: {
        title: "🌟 Recognition",
        text: "Increase your brand recognition, making more people aware of your product or service.",
    },
    engagement: {
        title: "💬 Engagement",
        text: "Encourage interactions with your content, increasing likes, shares and comments.",
    },
    sales: {
        title: "🛒 Sales",
        text: "Boost your sales by promoting products directly to the public.",
    },
};

export function CampaignObjectiveStep({
                                          data,
                                          updateData,
                                      }: StepComponentProps<"objective">) {

    const [selected, setSelected] = useState<string>(data ?? "recognition");

    const handleChange = (value: string) => {
        if (value) {
            setSelected(value);
            updateData(value);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4 py-4">
            <ToggleGroup
                value={typeof data === "string" ? data : ""}
                onValueChange={handleChange}
                type="single"
                defaultValue="Recognition"
                className="flex flex-col gap-4"
            >
                <ToggleGroupItem value="recognition" aria-label="recognition"
                                 className="w-full flex items-center justify-start gap-2 text-left"
                >
                    <Megaphone className="h-4 w-4"/>
                    Recognition
                </ToggleGroupItem>

                <ToggleGroupItem value="engagement" aria-label="engagement"
                                 className="w-full flex items-center justify-start gap-2 text-left"
                >
                    <MessageCircle className="h-4 w-4"/>
                    Engagement
                </ToggleGroupItem>

                <ToggleGroupItem value="sales" aria-label="sales"
                                 className="w-full flex items-center justify-start gap-2 text-left"
                >
                    <Store className="h-4 w-4"/>
                    Sales
                </ToggleGroupItem>
            </ToggleGroup>

            <motion.div
                className={"hidden md:block"}
                key={selected}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3}}
            >
                <Card className="h-full p-6 border border-gray-200 shadow-lg rounded-lg bg-white">
                    <CardHeader>
                        <CardTitle>
                            {descriptions[selected].title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {descriptions[selected].text}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}