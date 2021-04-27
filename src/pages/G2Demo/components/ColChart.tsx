import React, { useState, useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface IProps {
  data: any[];
}

const ColChart = (props: IProps) => {
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
      chart.data(data);
      chart.scale('sales', {
        nice: true,
      });

      chart.interval().position('year*sales');

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

export default ColChart;
