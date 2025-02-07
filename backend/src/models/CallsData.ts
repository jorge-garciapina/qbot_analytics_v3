import mongoose, { Schema, Document, Model } from "mongoose";

import {
  CallReason,
  RawCallRecord,
  CallStatus,
  EscalationReasons,
} from "../dataTypes";

const callReasons: ReadonlyArray<CallReason> = [
  "scheduling",
  "rescheduling",
  "cancellation",
];
const validStatus: ReadonlyArray<CallStatus> = ["scheduled", "transferred"];
const escalationReasons: ReadonlyArray<EscalationReasons> = [
  "none",
  "dob_mismatch",
  "first_name_mismatch",
  "last_name_mismatch",
];

// Define the schema
export const callSchema: Schema = new Schema({
  callId: {
    type: String,
    required: true,
    immutable: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    immutable: true,
  },
  startTime: {
    type: Date,
    required: true,
    immutable: true,
  },
  endTime: {
    type: Date,
    required: true,
    immutable: true,
  },
  reason: {
    type: String,
    required: true,
    enum: callReasons,
    immutable: true,
  },
  status: {
    type: String,
    required: true,
    enum: validStatus,
    immutable: true,
  },
  failure_reason: {
    type: String,
    required: true,
    enum: escalationReasons,
    immutable: true,
  },
});

// Create the model
export const Call: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
  "Call",
  callSchema
);

export async function saveYearlyRecords({
  schemaName,
  records,
}: {
  schemaName: string;
  records: RawCallRecord[];
}) {
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  await DynamicCallModel.insertMany(records); // Save all records to the specified collection
}

//----------------------------------------------------------------------------------
export async function getLoginData(inputYear?: number) {
  const year = inputYear || new Date().getFullYear();
  // Dynamically create the model for the year's collection
  const schemaName = `calls_${year}`;
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  // Calculate the start date for the last 40 days of the year
  const startDate = new Date(Date.UTC(year, 11, 31));
  startDate.setUTCDate(startDate.getUTCDate() - 40);

  // Query the database for calls with startTime >= startDate
  const recentCalls = await DynamicCallModel.find({
    startTime: { $gte: startDate },
  });

  return recentCalls;
}

//----------------------------------------------------------------------------------
export async function getYearlyData(inputYear: number) {
  const year = inputYear;
  // Dynamically create the model for the year's collection
  const schemaName = `calls_${year}`;

  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  const monthlyData = await DynamicCallModel.aggregate([
    {
      // Match calls within the given year
      $match: {
        startTime: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      // Group by status and month
      $group: {
        _id: {
          status: "$status",
          month: { $month: "$startTime" }, // Extract the month from the startTime
        },
        count: { $sum: 1 }, // Count the number of calls
      },
    },
    {
      // Transform the data into a more usable format
      $group: {
        _id: "$_id.status",
        monthlyCounts: {
          $push: {
            month: "$_id.month",
            count: "$count",
          },
        },
      },
    },
    {
      // Reshape the final output
      $project: {
        _id: 0,
        status: "$_id",
        countsByMonth: {
          $arrayToObject: {
            $map: {
              input: "$monthlyCounts",
              as: "entry",
              in: {
                k: {
                  $let: {
                    vars: {
                      months: [
                        "january",
                        "february",
                        "march",
                        "april",
                        "may",
                        "june",
                        "july",
                        "august",
                        "september",
                        "october",
                        "november",
                        "december",
                      ],
                    },
                    in: {
                      $arrayElemAt: [
                        "$$months",
                        { $subtract: ["$$entry.month", 1] },
                      ],
                    },
                  },
                },
                v: "$$entry.count",
              },
            },
          },
        },
      },
    },
  ]);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  function findElement(callReason: string) {
    return monthlyData.find((element) => element.status === callReason);
  }

  const scheduledCallsByMonth = months.reduce((accumulator, month) => {
    const monthVolume = findElement("scheduled").countsByMonth[month];
    accumulator.push(monthVolume);
    return accumulator;
  }, [] as number[]);

  const transferredCallsByMonth = months.reduce((accumulator, month) => {
    const monthVolume = findElement("transferred").countsByMonth[month];
    accumulator.push(monthVolume);
    return accumulator;
  }, [] as number[]);

  const callReasonsVolume = {
    months: months,
    scheduledCallsByMonth: scheduledCallsByMonth,
    transferredCallsByMonth: transferredCallsByMonth,
    year: year,
  };

  return callReasonsVolume;
}

//----------------------------------------------------------------------------------
export async function handlingOverviewTotalData({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();

  if (initialDateYear === finalDateYear) {
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    /**
     * In this part, the code filters the data by range and agregates the
     * information of the CALL STATUS
     */
    const intervalData = await DynamicCallModel.aggregate([
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      {
        $group: {
          _id: "$status", // Group by the "status" field
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
    ]);

    /**
     * In this part, the code creates an object to display the status information
     * in a concise way
     */
    const handlingOverviewTotal = intervalData.reduce(
      (accumulator, current) => {
        if (current._id === "transferred") {
          accumulator.handledByHuman = current.count;
        } else if (current._id === "scheduled") {
          accumulator.handledByAI = current.count;
        }
        accumulator.total += current.count;

        return accumulator;
      },

      {
        total: 0,
        handledByAI: 0,
        handledByHuman: 0,
      }
    );

    const handledByAIPercentage =
      (handlingOverviewTotal.handledByAI / handlingOverviewTotal.total) * 100;

    const handledByHumanPercentage =
      (handlingOverviewTotal.handledByHuman / handlingOverviewTotal.total) *
      100;

    return {
      ...handlingOverviewTotal,
      handledByAIPercentage: handledByAIPercentage,
      handledByHumanPercentage: handledByHumanPercentage,
    };
  }

  return [];
}

//----------------------------------------------------------------------------------
/**
 * OPTION 1: In the case the system needs the data associated with each day in an object structure
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 *   "2025-01-01": {
 *       "callsHandledByHuman": 29,
 *       "callsHandledByAI": 98,
 *       "total": 127
 *   },
 *   "2025-01-02": {
 *       "callsHandledByHuman": 60,
 *       "callsHandledByAI": 80,
 *       "total": 140
 *   }, ...
 *   }
 */
export async function handlingOverviewDailyData({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();
  if (initialDateYear === finalDateYear) {
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    /**
     * In this part, the code filters the data by day and agregates the
     * information of the CALL STATUS
     */
    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter by time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Group by day and sum the status values
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } }, // Extract day
          callsHandledByHuman: {
            $sum: { $cond: [{ $eq: ["$status", "transferred"] }, 1, 0] }, // Count transferred
          },
          callsHandledByAI: {
            $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] }, // Count scheduled
          },
        },
      },
      // 3. Add total count for each day
      {
        $addFields: {
          totalCalls: { $add: ["$callsHandledByHuman", "$callsHandledByAI"] }, // Calculate total count
        },
      },
      // 4. Sort by day
      {
        $sort: { _id: 1 }, // Sort by day in ascending order
      },
    ]);

    /**
     * In this part, the code creates an object whose keys are the days in the
     * provided interval that contains the information about the callsHandledByHuman
     * and callsHandledByAI
     */
    const handlingOverviewDaily = aggregation.reduce((accumulator, current) => {
      const currentDay = current._id;
      accumulator[currentDay] = {
        callsHandledByHuman: current.callsHandledByHuman,
        callsHandledByAI: current.callsHandledByAI,
        total: current.totalCalls,
      };
      return accumulator;
    }, {});

    return handlingOverviewDaily;
  }

  return [];
}

//----------------------------------------------------------------------------------
/**
 * OPTION 2: This function will retrieve the data in the same format as it is expected to build the
 * charts using Apache E-charts
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 * chartKeys: ["2025-01-01", "2025-01-02", ...],
 * callsHandledByAI: [98, 80,...]
 * callsHandledByHuman: [29, 60,...]
 *   }
 */
export async function handlingOverviewChartData({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();
  if (initialDateYear === finalDateYear) {
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter by time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Group by day and sum the status values
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          callsHandledByHuman: {
            $sum: { $cond: [{ $eq: ["$status", "transferred"] }, 1, 0] },
          },
          callsHandledByAI: {
            $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] },
          },
        },
      },
      // 3. Add total count for each day
      {
        $addFields: {
          totalCalls: { $add: ["$callsHandledByHuman", "$callsHandledByAI"] },
        },
      },
      // 4. Sort by day
      {
        $sort: { _id: 1 },
      },
    ]);

    // Aggregate into the final object
    const handlingOverviewDaily = aggregation.reduce(
      (accumulator, current) => {
        const currentDay = current._id;
        const totalCallsHandledByAI = current.callsHandledByAI;
        const totalCallsHandledByHuman = current.callsHandledByHuman;
        const totalCalls = current.totalCalls;

        const aiPercentage =
          totalCalls > 0 ? (totalCallsHandledByAI / totalCalls) * 100 : 0;
        const humanPercentage =
          totalCalls > 0 ? (totalCallsHandledByHuman / totalCalls) * 100 : 0;

        accumulator.chartKeys.push(currentDay);
        accumulator.callsHandledByAI.push(totalCallsHandledByAI);
        accumulator.callsHandledByHuman.push(totalCallsHandledByHuman);
        accumulator.callsHandledByAIPercentage.push(aiPercentage);
        accumulator.callsHandledByHumanPercentage.push(humanPercentage);
        return accumulator;
      },
      {
        chartKeys: [],
        callsHandledByAI: [],
        callsHandledByHuman: [],
        callsHandledByAIPercentage: [],
        callsHandledByHumanPercentage: [],
      }
    );

    return handlingOverviewDaily;
  }

  return {
    chartKeys: [],
    callsHandledByAI: [],
    callsHandledByHuman: [],
    callsHandledByAIPercentage: [],
    callsHandledByHumanPercentage: [],
  };
}

//----------------------------------------------------------------------------------
/**
 * This function retrieves the data related with the call durations
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 * chartKeys: ["2025-01-01", "2025-01-02", ...],
 * callsHandledByAIAverageDuration: [98.8481, 80.3215,...]
 * callsHandledByHumanAverageDuration: [29.8743, 60.2884,...]
 *   }
 */
export async function avarageCallDurationData({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();
  if (initialDateYear === finalDateYear) {
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter calls by the time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Add a duration field to each document
      {
        $addFields: {
          durationInSeconds: {
            $divide: [{ $subtract: ["$endTime", "$startTime"] }, 1000], // Calculate duration in seconds
          },
        },
      },
      // 3. Group by day and call status, calculate totals and counts
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } }, // Group by day
            status: "$status", // Group by status
          },
          totalDuration: { $sum: "$durationInSeconds" }, // Total duration for the day and status
          totalCount: { $sum: 1 }, // Count of calls for the day and status
        },
      },
      // 4. Reshape the data into a day-based structure
      {
        $group: {
          _id: "$_id.day", // Group by day
          dailyStats: {
            $push: {
              status: "$_id.status",
              averageDuration: { $divide: ["$totalDuration", "$totalCount"] }, // Average duration for each status
            },
          },
        },
      },
      // 5. Transform the data into the desired format
      {
        $project: {
          _id: 0,
          day: "$_id", // Use the day as a field
          callsHandledByAIAverageDuration: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$dailyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "scheduled"] }, // Extract scheduled (AI-handled)
                    },
                  },
                  0,
                ],
              },
              { averageDuration: 0 },
            ],
          },
          callsHandledByHumanAverageDuration: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$dailyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "transferred"] }, // Extract transferred (human-handled)
                    },
                  },
                  0,
                ],
              },
              { averageDuration: 0 },
            ],
          },
        },
      },
      // 6. Flatten the average duration fields
      {
        $project: {
          day: 1,
          callsHandledByAIAverageDuration:
            "$callsHandledByAIAverageDuration.averageDuration",
          callsHandledByHumanAverageDuration:
            "$callsHandledByHumanAverageDuration.averageDuration",
        },
      },

      // 7. Sort by day in ascending order
      {
        $sort: { day: 1 }, // Sort by day in ascending order
      },
    ]);

    const callsAverageDuration = aggregation.reduce(
      (accumulator, current) => {
        accumulator.chartKeys.push(current.day);
        accumulator.callsHandledByAIAverageDuration.push(
          current.callsHandledByAIAverageDuration
        );
        accumulator.callsHandledByHumanAverageDuration.push(
          current.callsHandledByHumanAverageDuration
        );

        return accumulator;
      },
      {
        chartKeys: [],
        callsHandledByAIAverageDuration: [],
        callsHandledByHumanAverageDuration: [],
      }
    );

    const totalCalls = callsAverageDuration.chartKeys.length;

    const callsHandledByAIPercentage =
      callsAverageDuration.callsHandledByAIAverageDuration.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / totalCalls;

    const callsHandledByHumanPercentage =
      callsAverageDuration.callsHandledByHumanAverageDuration.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / totalCalls;

    return {
      ...callsAverageDuration,
      callsHandledByAIPercentage: callsHandledByAIPercentage,
      callsHandledByHumanPercentage: callsHandledByHumanPercentage,
    };
  }

  return {};
}

//----------------------------------------------------------------------------------
/**
 * This function retrieves the call volume in different hours of the day (from 00:00 to 23:00) of the
 * selected interval of time (between "initialDate" and "endDate")
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 *   hourOfTheDay: ["00:00", "01:00", "02:00",...],
 *   callsHandledByHuman: [46, 65, 60,...],
 *   callsHandledByAI: [109, 118, 98,...],
 *   total: [155, 183, 158,...],
 * }
 */
export async function peakCallTimesData({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();

  if (initialDateYear === finalDateYear) {
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter calls by the time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Group calls by hour of the day and status
      {
        $group: {
          _id: {
            hour: { $dateToString: { format: "%H:00", date: "$startTime" } }, // Extract hour
            status: "$status", // Group by status (scheduled or transferred)
          },
          totalCalls: { $sum: 1 }, // Count total calls
        },
      },
      // 3. Reshape the data into an hour-based structure
      {
        $group: {
          _id: "$_id.hour", // Group by hour
          hourlyStats: {
            $push: {
              status: "$_id.status",
              count: "$totalCalls",
            },
          },
        },
      },
      // 4. Transform the data into the desired format
      {
        $project: {
          _id: 0,
          hourOfTheDay: "$_id", // Use the hour as a field
          callsHandledByHuman: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$hourlyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "transferred"] }, // Human-handled calls
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
          callsHandledByAI: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$hourlyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "scheduled"] }, // AI-handled calls
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
        },
      },
      // 5. Flatten the count fields and calculate the total
      {
        $project: {
          hourOfTheDay: 1,
          callsHandledByHuman: "$callsHandledByHuman.count",
          callsHandledByAI: "$callsHandledByAI.count",
          total: {
            $add: ["$callsHandledByHuman.count", "$callsHandledByAI.count"], // Total calls per hour
          },
        },
      },
      // 6. Sort by hourOfTheDay in ascending order
      {
        $sort: { hourOfTheDay: 1 },
      },
    ]);

    const callsVolumePeak = aggregation.reduce(
      (accumulator, current) => {
        accumulator.hourOfTheDay.push(current.hourOfTheDay);
        accumulator.callsHandledByHuman.push(current.callsHandledByHuman);
        accumulator.callsHandledByAI.push(current.callsHandledByAI);
        accumulator.total.push(current.total);
        return accumulator;
      },
      {
        hourOfTheDay: [],
        callsHandledByHuman: [],
        callsHandledByAI: [],
        total: [],
      }
    );

    // Find the maximum value
    const peakVolume = Math.max(...callsVolumePeak.total);
    const peakHour = callsVolumePeak.total.indexOf(peakVolume);

    return { ...callsVolumePeak, peakHour: peakHour, peakVolume: peakVolume };
  }

  return [];
}
