import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import InputContainer from "@/components/InputContainer";
import {Input} from "@/components/ui/input.tsx";
import {StepComponentProps} from "@/modals/CreateCampaignDialogTypes.ts";

export default function CampaignResumeStep({state}: StepComponentProps<"resume">) {

    return (
        <Card>
            <CardHeader>
                <CardDescription>Your ad campaign settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <InputContainer label={"Objective"}>
                    <Input
                        value={state?.objective}
                        disabled
                    />
                </InputContainer>

            </CardContent>
        </Card>
    );
}
