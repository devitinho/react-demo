import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../api/finnHub'
import { StockChart } from '../components/StockChart'
import { StockData } from '../components/StockData'

export const StockDetailPage = () => {
  const [chartData, setChartData] = useState([])
  const { symbol } = useParams()

  const formatData = data => data.t.map((el, index) => ({
    x: el * 1000,
    y: Math.floor(data.c[index])
  }))

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const totalSeconds = 24 * 60 * 60
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay
      if (date.getDate() === 6) {
        oneDay = currentTime - 2 * totalSeconds
      } else if (date.getDate() === 0) {
        oneDay = currentTime - 3 * totalSeconds
      } else {
        oneDay = currentTime - totalSeconds
      }
      const oneWeek = currentTime - 7 * totalSeconds
      const oneYear = currentTime - 365 * totalSeconds
      try {
        const responses = await Promise.all(
          [oneDay, oneWeek, oneYear].map(fromTime => finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: fromTime,
              to: currentTime,
              resolution: 30 
            }
          }))
        )
        const [dayData, weekData, yearData] = responses.map(({ data }) => formatData(data))
        setChartData({
          day: dayData,
          week: weekData,
          year: yearData
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [symbol])

  return <div>
    {chartData && (
      <div>
        <StockChart chartData={chartData} symbol={symbol} />
        <StockData symbol={symbol} />
      </div>
    )}
  </div>
}