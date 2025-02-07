import { ReactNode } from "react";

export interface RawCallRecord {
  callId: string;
  phoneNumber: string;
  startTime: string; // Dates are received as strings from JSON
  endTime: string;
  reason: "scheduling" | "rescheduling" | "cancellation";
  status: "scheduled" | "transferred";
  failure_reason:
    | "none"
    | "dob_mismatch"
    | "first_name_mismatch"
    | "last_name_mismatch";
}

export type RawCallRecords = RawCallRecord[];

interface HandlingOverviewDaily {
  chartKeys: string[];
  callsHandledByAI: number[];
  callsHandledByAIPercentage: number[];

  callsHandledByHuman: number[];
  callsHandledByHumanPercentage: number[];
}

interface HandlingOverviewTotal {
  total: number;
  handledByAI: number;
  handledByHuman: number;
  handledByAIPercentage: number;
  handledByHumanPercentage: number;
}

interface AverageDurationDaily {
  callsHandledByAIAverageDuration: number[];
  callsHandledByHumanAverageDuration: number[];
  callsHandledByAIPercentage: number;
  callsHandledByHumanPercentage: number;
  chartKeys: string[];
}

interface PeakTimes {
  hourOfTheDay: string[];
  callsHandledByHuman: number[];
  callsHandledByAI: number[];
  peakHour: number;
  peakVolume: number;
  total: number[];
}

export interface CallRecordsMigration {
  handlingOverviewDaily: HandlingOverviewDaily;
  handlingOverviewTotal: HandlingOverviewTotal;
  averageDurationDaily: AverageDurationDaily;
  peakTimes: PeakTimes;
}

export interface YearCallRecords {
  months: string[];
  year: number;
  scheduledCallsByMonth: number[];
  transferredCallsByMonth: number[];
}

export interface CallRecord {
  callId: string;
  phoneNumber: string;
  startTime: Date;
  endTime: Date;
  reason: "scheduling" | "rescheduling" | "cancellation";
  status: "scheduled" | "transferred";
  failure_reason:
    | "none"
    | "dob_mismatch"
    | "first_name_mismatch"
    | "last_name_mismatch";

  chartKeys?: string[];
  callsHandledByAI?: number[];
  callsHandledByHuman?: number[];
}

export type CallRecords = CallRecord[];

export interface ComponentDataInput {
  callRecords: CallRecord[];
}

export interface AggregatedData {
  totalCalls: number;
  callReasons: {
    scheduling: number;
    rescheduling: number;
    cancellation: number;
  };
  timeDistribution: {
    morning: { scheduling: number; rescheduling: number; cancellation: number };
    evening: { scheduling: number; rescheduling: number; cancellation: number };
    night: { scheduling: number; rescheduling: number; cancellation: number };
  };

  // New fields for outcomes
  totalScheduledCalls: number;
  totalTransferredCalls: number;
  transferredFailureReasons: {
    none: number;
    dob_mismatch: number;
    first_name_mismatch: number;
    last_name_mismatch: number;
  };

  // NEW FIELDS REQUESTED:
  transferredPercentage: number; // percentage of transferred calls
  averageDurationScheduledCalls: number; // average duration of scheduled calls in seconds
  averageDurationTransferredCalls: number; // average duration of transferred calls in seconds
}

export type CallReasons = {
  scheduling: number;
  rescheduling: number;
  cancellation: number;
};

export type TimeFrame = "night" | "morning" | "evening";

// Simplified structure for day/timeFrame grouping used in stacked bar charts.
export type SimpleDayTimeDistribution = {
  morning: number;
  evening: number;
  night: number;
};

export interface CallRecordsContextType {
  callRecords: RawCallRecords | null;
  loading: boolean;
  error: string | null;
  fetchCallRecords: (year: number, timeInterval?: number) => Promise<void>;
}

export interface ComponentInput {
  year?: number;
  daysInterval: number;
}

export interface ComponentInputMigration {
  initialDate: string;
  endDate: string;
  refreshTrigger: number;
  renderModal: (modalContent: ReactNode) => void;
}

//--------------CHART TYPES--------------

export interface TitleType {
  text: string;
  left: string;
  triggerEvent: boolean;
}

export interface ToolTipType {
  trigger: string;
  axisPointer: { type: string };
}

export interface AxisTextStyleType {
  color: string;
  fontWeight: string;
  fontSize: number;
}

export interface XAxisType {
  data: string[];
  name?: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: {
    color: string;
    fontWeight: string;
    fontSize: number;
  };
}

export interface YAxisType {
  name: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: AxisTextStyleType;
}

export interface LegendType {
  orient: string;
  right: string;
  bottom: number;
  textStyle: {
    color: string;
    fontSize: number;
  };
}

type BarCharDataType = number[];
type PieCharDataType = { value: number; name: string }[];

interface BaseSeries {
  name: string;
  type: string;
  data: BarCharDataType | PieCharDataType;
}

interface BarSeries extends BaseSeries {
  stack?: string; // Optional for bar charts
}

interface LineSeries extends BaseSeries {
  type: "line";
}

interface PieSeries extends BaseSeries {
  type: "pie";
  radius?: string; // Optional property for pie charts
}

export type SeriesItem = BarSeries | LineSeries | PieSeries;

export type ChartOptions = {
  title: TitleType;
  tooltip: ToolTipType;
  legend: LegendType;
  xAxis?: XAxisType;
  yAxis?: YAxisType;
  series: SeriesItem[];
};

interface ChartTotal {
  name: string;
  value: number;
}

export type ChartTotals = ChartTotal[];

export interface ModalChartInput {
  options: ChartOptions;
  initialDate: string;
  endDate: string;
}
export interface DashboardChartProps {
  options: ChartOptions;
  totals?: ChartTotals;
  openModal: () => void;
}

export interface UpperSectionInput {
  title: string;
  openModal: () => void;
}

export interface ActionToolbarInput {
  openModal: () => void;
}

//--------------MODAL TYPES--------------

/**
 * Interface for the processed yearly data.
 * This ensures that every object in processedData has a consistent structure.
 */
export interface TrendsYearData {
  months: string[];
  scheduledCallsByMonth: number[];
  transferredCallsByMonth: number[];
  year: number;
  isPending: boolean;
}

/**
 * Interface for the date range.
 */
export interface DateRange {
  initialDate: string;
  endDate: string;
}

export interface TrendsData {
  isPending: boolean;
  months: string[];
  scheduledCallsByMonth: number[];
  transferredCallsByMonth: number[];
  year: number;
}
