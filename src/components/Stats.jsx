import { calculateCoffeeStats, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"
import { useAuth } from "../context/AuthContext"
function StatsCard(props){
    const { lg, title, children } = props
    return (
        <div className= {"card stat-card " + (lg ? "col-span-2" : "")}>
            <h4>{title}</h4>
             {children}
        </div>
    )
}




export default function Stats(){
    const {globalData}  = useAuth()
    const stats = calculateCoffeeStats(globalData)
    const caffeineLevel = calculateCoffeeStats(globalData)
    const warningLevel = caffeineLevel < statusLevels["low"].maxLevel ? "low" : 
    caffeineLevel < statusLevels["moderate"].maxLevel ? "moderate" : "high"


    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple"/>
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatsCard lg  title="Active Caffeine Level">
                    <div className="status">
                        <p><span className="stat-text">{caffeineLevel.average_coffees}</span>mg</p>
                        <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background}}>{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatsCard>
                <StatsCard  title="Daily Caffeine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
                </StatsCard>
                <StatsCard title="Avg # of Coffees"  >
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatsCard>
                <StatsCard  title="Daily Cost ($)" >
                    <p>$<span className="stat-text">{stats.daily_cost}</span>mg</p>
                </StatsCard>
                <StatsCard  title="Total Cost ($)" >
                    <p>$<span className="stat-text">{stats.total_cost}</span>mg</p>
                </StatsCard>
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
                        return (
                            <tr  key={coffeeIndex}>
                                <td>{coffee.coffeeName}</td>
                                <td>{coffee.count}</td>
                                <td>{coffee.percentage}</td>
                            </tr>
                        )
                       })}
                    </tbody>
                </table>
            </div>

        </>
    )
}