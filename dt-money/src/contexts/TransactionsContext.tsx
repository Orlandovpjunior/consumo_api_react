import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransations: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransations(query?: string) {
        const response = await api.get<Transaction[]>('transactions')

        if (query) {
            const lowerQuery = query.toLowerCase().trim()

            const filtered = response.data.filter((transaction) =>
                transaction.description.toLowerCase().includes(lowerQuery)
            )

            setTransactions(filtered)
        } else {
            setTransactions(response.data)
        }
    }

    useEffect(() => {
        fetchTransations();
    }, [])
    return (
        <TransactionContext.Provider value={{
            transactions,
            fetchTransations
        }}>
            {children}
        </TransactionContext.Provider>
    )
}