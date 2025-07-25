import { useContext, useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";

function CoinTable() {
  const {currency} = useContext(CurrencyContext)
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => fetchCoinData(page, currency),
    // retry: 2,
    // retryDelay: 1000,
    cacheTime: 1000 * 60 * 2,
    scaleTime: 1000 * 60 * 2,
  });


  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const navigate = useNavigate();

  function handleCoinRedirect(id){
    navigate(`/details/${id}`)
  }

  return (
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto ">
        <div className="w-full bg-yellow-400 text-black flex gap-3 py-4 px-2 font-semibold items-center justify-center">
          {/* Header of the tabel */}
          <div className="basis-[35%]">Coin</div>
          <div className="basis-[25%]">{`Price (in ${currency})`}</div>
          <div className="basis-[20%]">24h change</div>
          <div className="basis-[20%]">Market Cap</div>
        </div>

        <div className="flex flex-col w-[80vw] mx-auto">
            {isLoading && <div>Loading...</div>}
          {data &&
            data.map((coin) => {
              return (
                <div
                  onClick={() => handleCoinRedirect(coin.id)}
                  key={coin.id}
                  className="w-full bg-transparent text-white flex gap-3 py-4 px-2 font-semibold items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-start gap-3 basis-[35%]">
                    <div className="w-[4rem] h-[4rem]">
                      <img src={coin.image} className="w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-3xl">{coin.name} </div>
                      <div className="text-xl">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="basis-[25%] break-words overflow-hidden text-ellipsis whitespace-nowrap">{coin.low_24h}</div>
                  <div className="basis-[20%] break-words overflow-hidden text-ellipsis whitespace-nowrap">{coin.price_change_24h}</div>
                  <div className="basis-[20%] break-words overflow-hidden text-ellipsis whitespace-nowrap">{coin.market_cap}</div>
                </div>
              );
            })}
        </div>

        <div className="flex gap-4 justify-center items-center">
          <button
            disabled={page===1}
            onClick={() => setPage(page - 1)}
            className="btn btn-primary btn-wide text-white text-2xl"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="btn btn-secondary btn-wide text-white text-2xl"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CoinTable;
