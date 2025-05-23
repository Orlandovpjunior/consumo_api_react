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

interface CreateTransactionInput{
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransations: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransations(query?: string) {
        const response = await api.get<Transaction[]>('transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
          },
        })
      
        setTransactions(response.data)
    }

    async function createTransaction(data: CreateTransactionInput){

        const {description, price, category, type} = data
        const response = await api.post('transactions', {
                    description,
                    price,
                    category,
                    type,
                    createdAt: new Date()
                })
        
        setTransactions(state => [response.data, ... state])
    }
      

    useEffect(() => {
        fetchTransations();
    }, [])
    return (
        <TransactionContext.Provider value={{
            transactions,
            fetchTransations,
            createTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}