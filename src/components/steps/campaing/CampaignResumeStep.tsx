import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import InputContainer from "@/components/InputContainer";
import {Input} from "@/components/ui/input.tsx";
import {StepComponentProps, StepData} from "@/modals/CreateCampaignDialogTypes.ts";
import {formater} from "@/modals/utlis/formater.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function CampaignResumeStep({state}: StepComponentProps<keyof StepData>) {

    return (
        <Card>
            <CardHeader>
                <CardDescription>Your ad campaign settings.</CardDescription>
            </CardHeader>
            <CardContent>

                <div className={"mb-4"}>
                    <InputContainer label={"Ad name"}>
                        <Input value={state.budget?.name} disabled />
                    </InputContainer>
                </div>

                <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4"}>
                    <InputContainer label={"Objective"}>
                        <Input
                            value={state.objective?.toUpperCase()}
                            disabled
                        />
                    </InputContainer>
                    <InputContainer label={"Budget Type"}>
                        <Input
                            value={state.budget?.type.toUpperCase()}
                            disabled
                        />
                    </InputContainer>

                    <InputContainer label={"Budget Value"}>
                        <Input
                            value={`R$ ${formater(state.budget?.amount ?? 0)}`}
                            disabled
                        />
                    </InputContainer>
                </div>

                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-4"}>
                    <InputContainer label={"Start date"}>
                        <Input
                            value={state.budget?.schedule_start}
                            disabled
                        />
                    </InputContainer>
                    <InputContainer label={"End date"}>
                        <Input
                            value={state.budget?.schedule_end}
                            disabled
                        />
                    </InputContainer>
                </div>

                <InputContainer label={"Selected location"}>
                    <ScrollArea className="max-h-max[50px] rounded-md border">
                        {state.localization?.map((it, index) => (
                            <div key={index}>
                                {`${it.name} (${it.lng} / ${it.lat})`}
                            </div>
                        ))}
                    </ScrollArea>
                </InputContainer>

            </CardContent>
        </Card>
    );
}
