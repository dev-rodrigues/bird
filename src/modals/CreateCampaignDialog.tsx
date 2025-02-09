import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {CampaignObjectiveStep} from "@/components/steps/campaing/CampaignObjectiveStep.tsx";
import {ReactNode, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {motion} from "framer-motion";
import CampaignResumeStep from "@/components/steps/campaing/CampaignResumeStep.tsx";
import CampaignBudgetAndScheduleStep from "@/components/steps/campaing/CampaignBudgetAndScheduleStep.tsx";
import CampaignLocalizationStep from "@/components/steps/campaing/CampaignLocalizationStep.tsx";
import {Props} from "@/modals/utlis/types.ts";
import {Step, StepComponentProps, StepData} from "@/modals/CreateCampaignDialogTypes.ts";

export function CreateCampaignDialog({isOpen, setIsOpen}: Props) {
    const [step, setStep] = useState(0);
    const [stepData, setStepData] = useState<StepData>({});

    const steps: Step<keyof StepData>[] = [
        {
            label: "Choose the campaign objective",
            component: CampaignObjectiveStep as unknown as (props: StepComponentProps<keyof StepData>) => ReactNode,
            key: "objective",
        },
        {
            label: "Budget and Schedule",
            component: CampaignBudgetAndScheduleStep as unknown as (props: StepComponentProps<keyof StepData>) => ReactNode,
            key: "budget",
        },
        {
            label: "Localization",
            component: CampaignLocalizationStep,
            key: "localization",
        },
        {
            label: "Resume",
            component: CampaignResumeStep as unknown as (props: StepComponentProps<keyof StepData>) => ReactNode,
            key: "resume",
        },
    ];

    const isLastStep = step === steps.length - 1;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const onCloseModal = () => {
        setStep(0);
        setStepData({});
        setIsOpen(!isOpen);
    };

    const updateStepData = <K extends keyof StepData>(key: K, data: StepData[K]) => {
        setStepData((prev) => ({
            ...prev,
            [key]: data,
        }));
    };

    const submitData = () => {
        onCloseModal();
    };

    const CurrentStepComponent = steps[step].component;

    return (
        <Dialog open={isOpen} onOpenChange={onCloseModal}>
            <DialogTrigger asChild>
                <Button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Criar nova campanha
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[80vw] max-w-4xl min-h-[400px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Create a new campaign</DialogTitle>
                </DialogHeader>

                <Card>
                    <h2 className="text-xl text-center font-semibold">{steps[step].label}</h2>
                    <CardContent className="min-h-full">
                        <motion.div
                            key={step}
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -50}}
                            transition={{duration: 0.3}}
                        >
                            <CurrentStepComponent
                                state={stepData}
                                data={stepData[steps[step].key]}
                                updateData={(data: StepData[keyof StepData]) => updateStepData(steps[step].key, data)}
                            />
                        </motion.div>

                        <Separator/>

                        <div className="flex justify-between mt-4">
                            <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                                Voltar
                            </Button>
                            {isLastStep ? (
                                <Button onClick={submitData}>Finalizar</Button>
                            ) : (
                                <Button onClick={nextStep}>Próximo</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}