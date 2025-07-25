import { useQuery } from "@tanstack/react-query";
import parse from 'html-react-parser';
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../services/fetchCoinDetails";
import { CurrencyContext } from "../context/CurrencyContext";
import PageLoader from "../Components/PageLoader/PageLoader";
import CoinInfoContainer from "../Components/CoinInfo/CoinInfoContainer";

function CoinDetailsPage() {
  const { coinId } = useParams();
  const {currency} = useContext(CurrencyContext)
  

  const {
    isError,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["coins", coinId],
    queryFn: () => fetchCoinDetails(coinId),
    cacheTime: 1000 * 60 * 2,
    staleTime: 100 * 60 * 2,
  });


  if (isLoading) {
    return <PageLoader/>
  }

  if (isError) {
    return <div>Error: something went wrong</div>;
  }

  return (
        
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 w-full flex flex-col items-center mt-6 p-4 md:mt-0 border-r-2 border-gray-500">
        <img alt={data?.name} src={data?.image?.large} className="h-52 mb-5" />
        <h1 className="text-4xl font-bold ">
            {data?.name}
        </h1>
        <p className="w-full px-6 py-4 text-justify"
        >
            {parse(data?.description?.en)}
        </p>
        <div 
            className="w-full flex flex-col md:flex-row md:justify-around gap-1 md:ml-3"
        >
            <div
                className="flex items-center mb-4 md:mb-0"
            >
                <h2 className="text-xl font-bold ">Rank</h2>
                <span className="ml-3 text-xl ">{data?.market_cap_rank}</span>
            </div>
            <div
                className="flex items-center mb-4 md:mb-0"
            >
                <h2 className="text-xl font-bold pl-0 border-l-0 border-gray-500 md:border-l-2 md:pl-2">Current Price</h2>
                <span className="ml-3 text-xl">{data?.market_data.current_price[currency]}</span>
            </div>

        </div>
      </div>

      <div className="md:2/3 w-full p-6">
        <CoinInfoContainer coinId={coinId}/>
      </div>

    </div>
  );
}

export default CoinDetailsPage;
