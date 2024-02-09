"use client";

import { FC } from "react";

type Props = {
  data: Data<BaseDataEntry>;
};

import { PieChart } from "react-minimal-pie-chart";
import { BaseDataEntry, Data } from "react-minimal-pie-chart/types/commonTypes";
const Chart: FC<Props> = ({ data }) => {
  return <PieChart animate data={data} />;
};

export default Chart;
