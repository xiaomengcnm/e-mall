import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class main extends Component {
    Options = ()=>{
        return {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
              }
            ]
          };
    }
    render() {
        return (
            <div>
                <ReactEcharts className="react_for_echarts" option={this.Options()} style={{ height: "350px", width: "48%" }}></ReactEcharts>
            </div>
        )
    }
}
