import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Light from "../../components/Devices/Light";
import LoaderSuspense from "../../components/Loader/LoaderSuspense";
import { useGetDevices } from "../../services/api/useDevices";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Devices() {
  const { isLoading, isSuccess, data } = useGetDevices();

  if (!isSuccess || data === undefined || data[0] === undefined) {
    return null;
  }

  // Filter devices without capabilities, we not handle it for the moment
  const devices = data.filter((d) => d.capabilities.length > 0);

  return (
    <LoaderSuspense isFetching={isLoading}>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={72}
        breakpoints={{ "4xl": 1800, "3xl": 1700, "2xl": 1500, xl: 1300, lg: 1100, md: 900, sm: 680, xs: 480, xxs: 0 }}
        cols={{ "4xl": 10, "3xl": 9, "2xl": 8, xl: 7, lg: 6, md: 5, sm: 4, xs: 3, xxs: 2 }}
        isResizable={false}
        isDraggable={false}
      >
        {devices.map((device, index) => {
          // We asume that only lights are handled for now
          return <Light key={device.id} data-grid={{ x: index, y: 0, w: 1, h: 2 }} device={device} />;
        })}
      </ResponsiveReactGridLayout>
    </LoaderSuspense>
  );
}
