import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {any} from "prop-types";


const testStyle = {
  color: 'black',
  backgroundColor: 'beige',
};


function getIntroOfPage(label) {
  if (label === 'Page A') {
    return 'Page A is about mens clothing';
  } if (label === 'Page B') {
    return 'Page B is about womens dress';
  } if (label === 'Page C') {
    return 'Page C is about womens bag';
  } if (label === 'Page D') {
    return 'Page D is about household goods';
  } if (label === 'Page E') {
    return 'Page E is about food';
  } if (label === 'Page F') {
    return 'Page F is about baby food';
  }
}

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}
class GraphReChart extends React.Component{
render() {
    let data = this.props.data;
    let renderLineChart = (
  <LineChart width={400} height={200} data={data}>
    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
      <Tooltip content={<CustomTooltip/>}
               wrapperStyle={testStyle}  />
  </LineChart>
);
  return (
    <div>
        Learn ReCharts
        {renderLineChart}
    </div>
  );
}

}
export default GraphReChart;
