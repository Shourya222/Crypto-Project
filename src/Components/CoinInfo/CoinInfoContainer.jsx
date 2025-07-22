import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { fetchCoinHistoricData } from "../../services/fetchCoinHistoricData";
import CoinInfo from "./CoinInfo";
import PageLoader from "../PageLoader/PageLoader";
import Alert from "../Alert/ErrorAlert";
import { CurrencyContext } from "../../context/CurrencyContext";

function CoinInfoContainer({coinId}){
    const {currency} = useContext(CurrencyContext);

    const [days,setDays] = useState(7);
    const [interval, setCoinInterval] = useState('daily');

    const{data: historicData, isLoading, isError} = useQuery({
        queryKey : ["coinHistoricData",coinId,currency,days,interval], //if any of this element in array changes, fetching is retriggered
        queryFn : () => fetchCoinHistoricData(coinId,interval,days,currency),
        cacheTime: 1000 * 60 * 2,
        staleTime: 100 * 60 * 2,
    })
    if(isLoading){
        return <PageLoader/>
    }

    if(isError){
        return <Alert message="Error fetching data"/>
    }

    return(
        <div>
            <CoinInfo 
            historicData={historicData} 
            setDays={setDays} 
            setCoinInterval={setCoinInterval}
            days = {days}
            currency = {currency}
            />
        </div>
    )
}

export default CoinInfoContainer;