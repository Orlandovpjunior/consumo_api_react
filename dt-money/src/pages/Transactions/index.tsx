import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";



export function Transations() {

    const {transactions} = useContext(TransactionContext)

    return (
        <div>
            <Header />
            <Summary />
            <TransactionsContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transactions => {
                            return(
                                <tr key={transactions.id}>
                                    <td width="50%">{transactions.description}</td>
                                    <td>
                                        <PriceHighLight variant={transactions.type}>
                                            {transactions.type == 'outcome' && '- '}
                                            {priceFormatter.format(transactions.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transactions.category}</td>
                                    <td>{dateFormatter.format(new Date(transactions.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}