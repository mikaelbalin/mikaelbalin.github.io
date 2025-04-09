import { Meta, StoryObj } from "@storybook/react";
import {
  Area,
  AreaChart,
  Bar,
  Line,
  BarChart,
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { IconTrendingUp } from "@tabler/icons-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./Chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Card";

export default {
  component: ChartContainer,
} satisfies Meta<typeof ChartContainer>;

type Story = StoryObj<typeof ChartContainer>;

const chartData = [
  { month: "January", desktop: 0, mobile: 0, other: 0 },
  { month: "February", desktop: 305, mobile: 200, other: 100 },
  { month: "March", desktop: 237, mobile: 120, other: 150 },
  { month: "April", desktop: 73, mobile: 190, other: 50 },
  { month: "May", desktop: 209, mobile: 130, other: 100 },
  { month: "June", desktop: 214, mobile: 140, other: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  other: {
    label: "Other",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const Default: Story = {
  args: {},
  render: function Render() {
    return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  },
};

export const AreaStory: Story = {
  args: {},
  render: function Render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Area Chart - Stacked Expanded</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
              }}
              stackOffset="expand"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="other"
                type="natural"
                fill="var(--color-other)"
                fillOpacity={0.1}
                stroke="var(--color-other)"
                stackId="a"
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <IconTrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  },
};

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

const bigOChartConfig = {
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

const getBigOData = () => {
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
};

export const BigOComplexity: Story = {
  args: {},
  render: function Render() {
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
            <LineChart data={getBigOData()}>
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
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month
                <IconTrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  },
};
