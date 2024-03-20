import React from "react"
import { IFibonacci } from "@/types/fibonacci"

interface IFibonacciHook {
  form: IFibonacci
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  generateFibonacciTable: () => number[][]
}

export function useFibonacci(): IFibonacciHook {
    const [form, setForm] = React.useState<IFibonacci>({
        row: 0,
        column: 0,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function generateFibonacciTable(): number[][] {
        const rowCount = parseInt(form.row.toString())
        const colCount = parseInt(form.column.toString())

        if (isNaN(rowCount) || isNaN(colCount) || rowCount <= 0 || colCount <= 0) {
            return [[]] // Return empty array if invalid input
        }

        const fibonacciArray: number[] = [0, 1]
        for (let i = 2; i < rowCount * colCount; i++) {
            const nextFibonacci = fibonacciArray[i - 1] + fibonacciArray[i - 2]
            fibonacciArray.push(nextFibonacci)
        }

        const result: number[][] = []

        for (let i = 0; i < rowCount; i++) {
            const row: number[] = []
            for (let j = 0; j < colCount; j++) {
                row.push(fibonacciArray[i * colCount + j])
            }
            result.push(row)
        }

        return result
    }

    return {
        form,
        handleChange,
        generateFibonacciTable,
    };
}
