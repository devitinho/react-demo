import { useState } from 'react'
import Chart from 'react-apexcharts'

export const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData
  const [dateFormat, setDateFormat] = useState('24h')
  console.log(chartData)

  const determineTimeFormat = () => {
    switch(dateFormat) {
      case '24h':
        return day
      case '7d':
        return week
      case '1y':
        return year
      default:
        return day
    }
  }

  const determineColor = () => {
    const timeFormat = determineTimeFormat() || []
    return timeFormat[timeFormat.length - 1]?.y - timeFormat[0]?.y > 0
    ? '#26C281'
    : '#ed3419'
  }
  
  const options = {
    colors: [determineColor()],
    title: {
      text: symbol,
      align: 'center',
      styles: {
        fontSize: '24px'
      }
    },
    chart: {
      id: 'stock data',
      animation: {
        speed: 1300
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM'
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = button => {
    const classes = 'btn m-1'
    if (button === dateFormat) {
      return `${classes} btn-primary`
    } else {
      return `${classes} btn-outline-primary`
    }
  }

  return <div className="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} type="area" width="100%" />
    <div>
      {
        ['24h', '7d', '1y'].map(format => (
          <button 
            key={format} 
            className={renderButtonSelect(format)} 
            onClick={() => setDateFormat(format)}>
              {format}
          </button>
        ))
      }
    </div>
  </div>
}