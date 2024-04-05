import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { isMobileView } from '../../helper/commonHelper';


export default function CommonLineChart({data, toolTipText, xAxisKey, dataKey, className}) {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="tooltip bg-white rounded-lg p-3 text-center font-[600]">
             <p className="tooltipLabel">{`${label}`}</p>
             <p className="tooltipLabel text-black">{`${toolTipText} : ${payload[0]?.payload?.[dataKey]} ${dataKey==='totalBounceRate'? '%': ''}`}</p>
            </div>
          )
         }
      
        return null
      }

    return (
      <ResponsiveContainer className={className}>
        <LineChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 40,
            right: isMobileView()? 30 : 50,
            left: isMobileView() ? 0 : 20,
            bottom: isMobileView()? 50 : 100,
          }}
        >
          <CartesianGrid vertical={false}/>
          <XAxis dataKey={xAxisKey} stroke='#FFFFFF' includeHidden tick={{fontSize: 12 }}/>
          <YAxis tickCount={5} axisLine={false} stroke='#FFFFFF' tick={{fontSize: 12 }}/>
          <Tooltip content={<CustomTooltip />}  itemStyle={{color:'#000000', textTransform:'capitalize'}} contentStyle={{borderRadius:'10px', textAlign:'center', fontWeight:'600'}} cursor={{ stroke: 'none', strokeWidth: 0 }}/>
          {/* <Legend /> */}
          <Line type="linear" dataKey={dataKey} stroke="#FF9A6C" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}
