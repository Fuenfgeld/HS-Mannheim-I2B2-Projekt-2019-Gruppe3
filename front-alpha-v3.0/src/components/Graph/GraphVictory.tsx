import React from 'react';
import {
    VictoryLine,
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryVoronoiContainer
} from 'victory';
import CostumTheme from './CostumTheme'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class GraphVictory extends React.Component{
render() {
    let data = this.props.data;
    return (
            < VictoryChart
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                theme={CostumTheme}
                containerComponent={<VictoryVoronoiContainer/>}

                height={400}
                width={500}


            >
                <VictoryAxis
                    dependetAxis
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickValues={[0, 2500, 5000, 7500, 10000]}

                />

                <VictoryLine
                    data={data}
                    x={"name"}
                    y={"pv"}
                    labelComponent ={<VictoryTooltip
                    text={(d)=>d.pv }
                    dy={10}/>}
                />
                <VictoryBar
                    data={data}
                    x={"label"}
                    y={"pv"}
                />
            </VictoryChart>
    );
}}
