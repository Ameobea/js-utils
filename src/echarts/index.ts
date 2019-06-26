import { EChartOption } from 'echarts';

import MobileZoomHandle from './MobileZoomHandle';

export const seriesDefaults = {
  symbol: 'circle',
  showSymbol: false,
  type: 'line',
  smooth: false,
  animation: false,
} as const;

export const getBaseConfigDefaults = (mobile: boolean): EChartOption => ({
  backgroundColor: '#1d2126',
  legend: { show: true, textStyle: { color: '#fff' } },
  grid: {
    bottom: 75,
    top: mobile ? 25 : 75,
    left: mobile ? 17 : 75,
    right: mobile ? 13 : 75,
  },
  tooltip: { trigger: 'axis' },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0, 1],
      showDetail: true,
      fillerColor: '#2d2f33',
      bottom: 5,
      textStyle: { color: '#fff' },
      filterMode: 'none',
      realtime: false,
      ...(mobile ? { handleIcon: MobileZoomHandle, handleSize: '80%' as any } : {}),
    },
  ],
  animation: true,
});
