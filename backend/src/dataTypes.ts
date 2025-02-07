export type CallReason = "scheduling" | "rescheduling" | "cancellation";
export type CallStatus = "scheduled" | "transferred";
export type EscalationReasons =
  | "none"
  | "dob_mismatch"
  | "first_name_mismatch"
  | "last_name_mismatch";

export type FailureReasons =
  | "dob_mismatch"
  | "first_name_mismatch"
  | "last_name_mismatch";

export interface RawCallRecord {
  callId: string;
  phoneNumber: string;
  startTime: Date;
  endTime: Date;
  reason: CallReason;
  status: CallStatus;
  failure_reason: EscalationReasons;
}

export type RawCallRecords = RawCallRecord[];

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

export interface InputYear {
  year: number;
}
