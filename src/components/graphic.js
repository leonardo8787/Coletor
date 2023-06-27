import React from 'react';
import BarChartExample from './BarChartExample';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  datasets: [{
    data: [20, 45, 28, 80, 99, 43],
  }]
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const BarChartExample = () => {
  return (
    <View>
      <BarChart
        data={data}
        width={300}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
      />
    </View>
  );
}

export default BarChartExample;

