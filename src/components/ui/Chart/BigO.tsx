"use client";

import { Line, CartesianGrid, LineChart, XAxis, YAxis } from "recharts";
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

const bigOChartConfig: ChartConfig = {
  O1: {
    label: "O(1)",
    color: "green",
  },
  OLogN: {
    label: "O(log n)",
    color: "blue",
  },
  ON: {
    label: "O(n)",
    color: "orange",
  },
  ONLogN: {
    label: "O(n log n)",
    color: "purple",
  },
  ON2: {
    label: "O(n^2)",
    color: "red",
  },
  O2N: {
    label: "O(2^n)",
    color: "brown",
  },
  ONFactorial: {
    label: "O(n!)",
    color: "black",
  },
};

const bigOData = (() => {
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
        <CardTitle>Area Chart - Stacked Expanded</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={bigOChartConfig}
          className="min-h-[200px] w-full"
        >
          <LineChart data={bigOData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="elements"
              label={{
                value: "Elements",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Operations",
                angle: -90,
                position: "insideLeft",
              }}
              domain={[0, 20]}
              type="number"
              allowDataOverflow
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="O1" stroke="green" />
            <Line type="monotone" dataKey="OLogN" stroke="blue" />
            <Line type="monotone" dataKey="ON" stroke="orange" />
            <Line type="monotone" dataKey="ONLogN" stroke="purple" />
            <Line type="monotone" dataKey="ON2" stroke="red" />
            <Line type="monotone" dataKey="O2N" stroke="brown" />
            <Line type="monotone" dataKey="ONFactorial" stroke="black" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
