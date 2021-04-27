import React, { useState, useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface IProps {
  data: any[];
}

const PieChart = (props: IProps) => {
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
      chart.coordinate('theta', {
        radius: 0.75,
      });

      chart.data(data);

      chart.scale('percent', {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      });

      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.interaction('element-active');
      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: '-30%',
          style: {
            textAlign: 'center',
            fontSize: 16,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent,
          };
        });
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

export default PieChart;
