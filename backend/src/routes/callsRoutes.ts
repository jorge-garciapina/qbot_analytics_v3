import express, { Router, Request, Response } from "express";
import {
  Call,
  saveYearlyRecords,
  getLoginData,
  getYearlyData,
  handlingOverviewTotalData,
  handlingOverviewDailyData,
  handlingOverviewChartData,
  avarageCallDurationData,
  peakCallTimesData,
} from "../models/CallsData"; // Import the Call model
import { generateCallRecords } from "../data_logic/generateDataInDB";

const router: Router = express.Router();




router.post("/generate_data", async (req: Request, res: Response) => {
  const { year, numberOfEntries } = req.body;

  try {
    const records = await generateCallRecords(
      Number(year),
      Number(numberOfEntries)
    );

    const schemaName = `calls_${year}`; // Dynamically create the collection name

    await saveYearlyRecords({
      schemaName,
      records,
    });

    res.status(200).json({
      message: `Successfully generated ${records.length} records for the year ${year}.`,
    });
  } catch (error) {
    console.error("Error generating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------------------------------------------------
/**
 * This route is created to get all the call entries of the provided year
 */
router.get(
  "/yearly_data",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const year = Number(req.query.year);

      const yearlyData = await getYearlyData(year);

      res.status(200).json(yearlyData); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
/**
 * This route is used to get the TOTAL AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get(
  "/handling_overview_total",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate = String(req.query.initial_date);
      const finalDate = String(req.query.final_date);
      const handlingOverviewTotal = await handlingOverviewTotalData({
        initialDate,
        finalDate,
      });

      res.status(200).json(handlingOverviewTotal); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get(
  "/handling_overview_daily",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate = String(req.query.initial_date);
      const finalDate = String(req.query.final_date);
      const test = await handlingOverviewDailyData({
        initialDate,
        finalDate,
      });

      res.status(200).json(test); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get(
  "/handling_overview_chart_data",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate = String(req.query.initial_date);
      const finalDate = String(req.query.final_date);
      const handlingOverviewDaily = await handlingOverviewChartData({
        initialDate,
        finalDate,
      });

      res.status(200).json(handlingOverviewDaily); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const initialDate = String(req.query.initial_date);
    const finalDate = String(req.query.final_date);
    const handlingOverviewTotal = await handlingOverviewTotalData({
      initialDate,
      finalDate,
    });

    const handlingOverviewDaily = await handlingOverviewChartData({
      initialDate,
      finalDate,
    });

    const averageDurationDaily = await avarageCallDurationData({
      initialDate,
      finalDate,
    });

    const peakTimes = await peakCallTimesData({
      initialDate,
      finalDate,
    });

    const loginData = {
      handlingOverviewDaily: handlingOverviewDaily,
      handlingOverviewTotal: handlingOverviewTotal,
      averageDurationDaily: averageDurationDaily,
      peakTimes: peakTimes,
    };

    res.status(200).json(loginData); // Respond with the retrieved calls
  } catch (err) {
    console.error("Error fetching recent calls:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get(
  "/test_average",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate = String(req.query.initial_date);
      const finalDate = String(req.query.final_date);
      const callsAverageDuration = await avarageCallDurationData({
        initialDate,
        finalDate,
      });

      res.status(200).json(callsAverageDuration); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get(
  "/test_peak_times",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate = String(req.query.initial_date);
      const finalDate = String(req.query.final_date);
      const peakTimes = await peakCallTimesData({
        initialDate,
        finalDate,
      });

      res.status(200).json(peakTimes); // Respond with the retrieved calls
    } catch (err) {
      console.error("Error fetching recent calls:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// Export the router
export default router;
