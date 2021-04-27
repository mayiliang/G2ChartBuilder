import React, { useState, useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;

interface IProps {
  data: any[];
}

const RadarChart = (props: IProps) => {
  const { data = [] } = props;
  const [chart, setChart]: any[] = useState();
  const ref: any = useRef();

  useEffect(() => {
    let newChart: any = chart;
    if (newChart) {
      changeData(newChart, data);
    } else {
      newChart = renderChart();
    }
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [chart, data, renderChart]);

  const getData = (data: any[]) => {
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['a', 'b'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });
    return dv.rows;
  };

  const renderChart = () => {
    if (ref.current) {
      const chart = new Chart({
        container: ref.current,
        autoFit: true,
        // height: 400,
        // width: 800,
        padding: 100,
        pixelRatio: window.devicePixelRatio,
      });
      chart.data(getData(data));
      chart.scale('score', {
        min: 0,
        max: 80,
      });
      chart.coordinate('polar', {
        radius: 0.8,
      });
      chart.axis('item', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'circle',
            style: {
              lineDash: null,
            },
          },
          alternateColor: 'rgba(0, 0, 0, 0.04)',
        },
      });

      chart
        .point()
        .position('item*score')
        .color('user')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1,
        });
      chart
        .line()
        .position('item*score')
        .color('user')
        .size(2);

      chart.render();

      setChart(chart);
      return chart;
    }
    return null;
  };

  const changeData = (chart: any, data: any[]) => {
    chart.changeData(data);
  };

  return <div style={{ height: 600 }} ref={ref}></div>;
};

export default RadarChart;
