import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {Card} from 'antd'

export default class ColumnChart extends Component {

    getOptions=()=>{
        return {
            title: {
                text: '汇总'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 50, 20]
            },          
            {
                name: '库存',
                type: 'bar',
                data: [10, 30, 56, 10, 20, 20]
            }
        ]
        }
    }
    render() {
        return (
            <div>
                <Card title='柱状图1'>
                    <ReactEcharts style={{height: '500px'}} option={this.getOptions()}></ReactEcharts>
                </Card>
            </div>
        )
    }
}
