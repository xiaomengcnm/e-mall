import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class dealData extends Component {
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
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }
            ]
          };
    }
    Options2 =()=>{
        return {
            title: {
              text: 'Step Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Step Start', 'Step Middle', 'Step End']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Step Start',
                type: 'line',
                step: 'start',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Step Middle',
                type: 'line',
                step: 'middle',
                data: [220, 282, 201, 234, 290, 430, 410]
              },
              {
                name: 'Step End',
                type: 'line',
                step: 'end',
                data: [450, 432, 401, 454, 590, 530, 510]
              }
            ]
          };
    }
    Options4 =()=>{
        return {
            title: {
              text: 'Funnel'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}%'
            },
            toolbox: {
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            legend: {
              data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
            },
            series: [
              {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                  show: true,
                  position: 'inside'
                },
                labelLine: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: 'solid'
                  }
                },
                itemStyle: {
                  borderColor: '#fff',
                  borderWidth: 1
                },
                emphasis: {
                  label: {
                    fontSize: 20
                  }
                },
                data: [
                  { value: 60, name: 'Visit' },
                  { value: 40, name: 'Inquiry' },
                  { value: 20, name: 'Order' },
                  { value: 80, name: 'Click' },
                  { value: 100, name: 'Show' }
                ]
              }
            ]
          };
    }
    render() {
        return (
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
                <ReactEcharts className="react_for_echarts" option={this.Options()} style={{ height: "350px", width: "48%" }}></ReactEcharts>
                <ReactEcharts className="react_for_echarts" option={this.Options2()} style={{ height: "350px", width: "48%" }}></ReactEcharts>
                <ReactEcharts className="react_for_echarts" option={this.Options4()} style={{ height: "350px", width: "48%" }}></ReactEcharts>
            </div>
        )
    }
}
