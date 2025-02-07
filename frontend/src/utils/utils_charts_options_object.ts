import {
  ToolTipType,
  AxisTextStyleType,
  XAxisType,
  YAxisType,
  LegendType,
  TitleType,
} from "../types/data_types";

export function generateChartTitle(title: string): TitleType {
  return {
    text: title,
    left: "center",
    triggerEvent: true, // Enables event triggering for the title
  };
}

export function generateToolTip(): ToolTipType {
  return { trigger: "axis", axisPointer: { type: "shadow" } };
}

export function axisTextStyle(): AxisTextStyleType {
  return {
    color: "#333",
    // fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
  };
}

export function generateXAxis({
  data,
  name,
}: {
  data: string[];
  name: string;
}): XAxisType {
  return {
    data: data,
    name: name,
    type: "category",
    nameLocation: "center",
    nameGap: 50,
    nameTextStyle: {
      color: "#333",
      // fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 14,
    },
  };
}

export function generateYAxis(name: string): YAxisType {
  return {
    name: name,
    type: "value",
    nameLocation: "center",
    nameGap: 50,
    nameTextStyle: axisTextStyle(),
  };
}

export function generateLegend(): LegendType {
  return {
    orient: "horizontal", // 'horizontal' is the default
    right: "center",
    bottom: 0,
    textStyle: {
      color: "#333",
      fontSize: 14,
    },
  };
}
