import {
  RawCallRecord,
  CallStatus,
  CallReason,
  EscalationReasons,
} from "../dataTypes";

const config = {
  years: [2020, 2021, 2022, 2023, 2024],
  months: [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ],
  callSettings: {
    scheduledDuration: { min: 30, max: 180 },
    transferredDuration: { min: 0, max: 30 },
    callsPerDay: { min: 10, max: 50 },
    statusProbabilities: {
      scheduled: 0.7,
      rescheduling: 0.2,
      transferred: 0.1,
    },
    reasonProbabilities: {
      scheduling: 0.5,
      rescheduling: 0.3,
      cancellation: 0.2,
    },
    preferredTimeSlots: [
      { start: 6, end: 12 },
      { start: 18, end: 24 },
    ],
    phoneNumberStart: 1001,
  },
};

let phoneNumberSuffix = config.callSettings.phoneNumberStart;

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(): number {
  return Math.random();
}

function generateRandomStartTime(
  year: number,
  month: number,
  day: number,
  preferredSlots: { start: number; end: number }[]
): Date {
  let hour: number;
  if (getRandomFloat() < 0.7) {
    const slot = preferredSlots[getRandomInt(0, preferredSlots.length - 1)];
    hour = getRandomInt(slot.start, slot.end - 1);
  } else {
    const nonPreferredSlots = [
      { start: 0, end: 6 },
      { start: 12, end: 18 },
    ];
    const slot =
      nonPreferredSlots[getRandomInt(0, nonPreferredSlots.length - 1)];
    hour = getRandomInt(slot.start, slot.end - 1);
  }
  const minute = getRandomInt(0, 59);
  const second = getRandomInt(0, 59);
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

function generateCallId(
  year: number,
  month: number,
  day: number,
  sequence: number
): string {
  return `A${year}B${sequence}`;
}

function generatePhoneNumber(): string {
  const number = phoneNumberSuffix++;
  return `555-000-${number.toString().padStart(4, "0")}`;
}

function assignFailureReason(
  status: CallStatus,
  reason: CallReason
): EscalationReasons {
  if (status === "scheduled") return "none";
  const failureReasons: EscalationReasons[] = [
    "dob_mismatch",
    "first_name_mismatch",
    "last_name_mismatch",
  ];
  return failureReasons[getRandomInt(0, failureReasons.length - 1)];
}

export async function generateCallRecords(
  year: number,
  numberOfEntries: number
): Promise<RawCallRecord[]> {
  let totalRecords = 0;
  let sequenceNumber = 1;
  const records: RawCallRecord[] = [];

  for (let i = 0; i < numberOfEntries; i++) {
    const monthIndex = getRandomInt(0, 11); // 0 = January, 11 = December
    const daysInMonth = config.months[monthIndex].days;
    const day = getRandomInt(1, daysInMonth);

    const statusRandom = getRandomFloat();
    const reasonRandom = getRandomFloat();

    const reason: CallReason =
      reasonRandom < config.callSettings.reasonProbabilities.scheduling
        ? "scheduling"
        : reasonRandom <
          config.callSettings.reasonProbabilities.scheduling +
            config.callSettings.reasonProbabilities.rescheduling
        ? "rescheduling"
        : "cancellation";

    const status: CallStatus =
      reason === "rescheduling" || statusRandom >= 0.9
        ? "transferred"
        : "scheduled";

    const startTime = generateRandomStartTime(
      year,
      monthIndex,
      day,
      config.callSettings.preferredTimeSlots
    );

    const durationSeconds =
      status === "scheduled"
        ? getRandomInt(
            config.callSettings.scheduledDuration.min,
            config.callSettings.scheduledDuration.max
          )
        : getRandomInt(
            config.callSettings.transferredDuration.min,
            config.callSettings.transferredDuration.max
          );

    const endTime = new Date(startTime.getTime() + durationSeconds * 1000);

    const failure_reason = assignFailureReason(status, reason);

    const callId = generateCallId(year, monthIndex + 1, day, sequenceNumber);
    const phoneNumber = generatePhoneNumber();

    // Create RawCallRecord
    const callRecord: RawCallRecord = {
      callId,
      phoneNumber,
      startTime,
      endTime,
      reason,
      status,
      failure_reason,
    };

    records.push(callRecord);
    sequenceNumber++;
  }

  return records;
}
