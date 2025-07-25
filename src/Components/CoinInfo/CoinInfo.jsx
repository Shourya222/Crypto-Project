import { Line } from "react-chartjs-2";
import Alert from "../Alert/ErrorAlert";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import { chartDays } from "../../helpers/constants";



function CoinInfo({historicData,setDays,setCoinInterval,days,currency}){

    function handleDayChange(e){
        const daysSelected = e.target.options[e.target.selectedIndex].value;
        if (daysSelected == 1){
            setCoinInterval('');
        } else{
            setCoinInterval('daily');
        }
        setDays(e.target.options[e.target.selectedIndex].value);
    }

    Chart.register(CategoryScale);

    if(!historicData){
        return <Alert message="No data available"/>
    }

    return(
        <div
            className="flex flex-col h-[500px] items-center justify-center mt-6 p-6 w-full"
        >
            <Line
                data={{
                    labels: historicData.prices.map(coinPrice => {
                        let date = new Date(coinPrice[0]); //Converting unix time stamp to date
                        let time = date?.getHours() > 12 ? `${date?.getHours() - 12}:${date?.getMinutes()} PM` : `${date?.getHours()}:${date?.getMinutes()} AM`
                        return days === 1 ? time : date?.toLocaleDateString();
                    }), 
                    datasets: [
                        {
                            label: `Price (Past ${days} ${days === 1 ? 'Day' : 'Days'}) in ${currency.toUpperCase()}`,
                            data: historicData.prices.map(coinPrice => coinPrice[1]),
                        }
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius : 0
                        }
                    }
                }}
            />
            <div className="flex justify-center mt-10 w-full">
                <select className="select select-success" onChange={handleDayChange}>
                    {chartDays.map((day,index) => {
                        return(
                            <option selected={days == day.value} key={index} value={day.value}>{day.label}</option>
                        )
                    })

                    }
                </select>
            </div>
        </div>
    )
}

export default CoinInfo;
