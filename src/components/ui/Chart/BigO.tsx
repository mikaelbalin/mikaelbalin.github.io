"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./Chart";

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

const chartConfig: ChartConfig = {
  O1: {
    label: "O(1)",
    color: "var(--chart-1)",
  },
  OLogN: {
    label: "O(log n)",
    color: "var(--chart-2)",
  },
  ON: {
    label: "O(n)",
    color: "var(--chart-3)",
  },
  ONLogN: {
    label: "O(n log n)",
    color: "var(--chart-4)",
  },
  ON2: {
    label: "O(n^2)",
    color: "var(--chart-5)",
  },
  O2N: {
    label: "O(2^n)",
    color: "var(--chart-6)",
  },
  ONFactorial: {
    label: "O(n!)",
    color: "var(--chart-7)",
  },
};

const chartData = (() => {
  const data = [];

  for (let i = 1; i <= 20; i++) {
    data.push({
      elements: i,
      O1: 1,
      OLogN: Math.log(i),
      ON: i - 1,
      ONLogN: i * Math.log(i),
      ON2: Math.pow(i - 1, 2),
      O2N: Math.pow(2, i) - 2,
      ONFactorial: factorial(i) - 1,
    });
  }

  return data;
})();

export const BigO = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Big O Complexity Chart</CardTitle>
        <CardDescription>
          Visualizing algorithm time complexity growth rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="elements"
              label={{
                value: "Input Size (n)",
              }}
              tickLine={false}
              tick={false}
            />
            <YAxis
              label={{
                value: "Operations",
                angle: -90,
              }}
              domain={[0, 20]}
              allowDataOverflow
              tick={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.entries(chartConfig).map(([key]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
