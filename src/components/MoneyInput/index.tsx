import {Input} from "@/components/ui/input";
import {ChangeEvent} from "react";

interface MoneyInputProps {
    value: number;
    onChange: (value: number) => void;
}

export default function MoneyInput({value, onChange}: MoneyInputProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, "");
        const numericValue = parseFloat(rawValue) / 100;
        onChange(numericValue);
    };

    const formattedValue = value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="flex items-center border rounded-lg px-3 w-full space-x-2">
            <span className="text-gray-500">R$</span>
            <Input
                type="text"
                value={formattedValue}
                onChange={handleChange}
                placeholder="0,00"
                className="border-none focus:ring-0 w-full text-center"
            />
            <span className="text-gray-500">BRL</span>
        </div>
    );
}