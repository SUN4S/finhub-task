import "./PriceChart.scss";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DateTime } from "luxon";

// Creates a line chart to document price change
export const PriceChart = (props: {
  Close: Array<number>;
  Time: Array<number>;
}) => {
  // Creating an array of object that recharts can interpret
  const priceArray =
    props.Close &&
    props.Close.map((item, index) => {
      return {
        close: item,
        // Using Luxon to format provided date from unix to MM-dd
        date: DateTime.fromSeconds(props.Time[index]).toFormat("MM-dd"),
      };
    });
  return (
    <div className="lineChartContainer" data-testid="lineChart">
      <ResponsiveContainer width="100%" minWidth="200px" height="100%">
        <LineChart
          data={priceArray}
          style={{ position: "relative", top: 8, right: 15 }}
        >
          <XAxis
            type="category"
            dataKey="date"
            tick={{ fontSize: 14, fill: "var(--primary)" }}
          />
          <YAxis
            type="number"
            dataKey="close"
            tick={{ fontSize: 14, fill: "var(--primary)" }}
            interval={0}
            tickCount={5}
            domain={["auto", "auto"]}
            allowDecimals={true}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#FFF",
              padding: "4px 8px 0 8px",
              border: "1px solid var(--primary)",
              color: "var(--primary)",
              borderRadius: "5px",
            }}
            itemStyle={{
              color: "var(--primary)",
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
