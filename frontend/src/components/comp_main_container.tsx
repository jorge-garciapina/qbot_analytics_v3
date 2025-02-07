// CHARTS IMPORTS:
import CallOutcomesStackedChart from "./charts/outcomes/comp_call_outcomes_stacked_chart_main";
import EscalationRateChart from "./charts/transferred_percentage/comp_transferred_percentage_chart_main";
import AverageTimeToEscalateChart from "./charts/average_duration/comp_call_duration_chart_main";
import CallCountByHourChart from "./charts/calls_by_hour/comp_call_count_by_hour_chart";

// COMPONENT IMPORTS
import { STYLED_App_Container } from "../mui_configurations/styled_components/styled_app_container";
import { MainModalContainer } from "./chart_factory/chart_modal/comp_modal_container";
import { DateRangeSelector } from "./date_range_selector/comp_range_selector";

// UTILS
import { generateInitialDateInterval } from "../utils/utils_dates_logic";

// HOOKS
import { useDate } from "../hooks/date_hooks/hook_use_date";

// LIBRARY IMPORTS
import { Button } from "@mui/material";
import { useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

const MainContainer = () => {
  //----------------START: Translation Section----------------
  const { t, i18n } = useTranslation();
  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
  };
  //----------------END: Translation Section----------------
  //-------------------------------------------------------------
  //----------------START: Refresh Section----------------
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  function handleRefresh() {
    setRefreshTrigger(Date.now()); // Update the trigger
  }
  //----------------END: Refresh Section----------------
  //-------------------------------------------------------------
  //----------------START: Date Section----------------
  const { initialDate: start, endDate: end } = generateInitialDateInterval();
  const initialDayLogic = useDate(start);
  const endDayLogic = useDate(end);
  //----------------END: Date Section----------------
  //-------------------------------------------------------------
  //----------------START: Modal Section----------------
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  function closeModal() {
    setIsModalOpen(false);
    setModalContent(<></>);
  }
  function renderModal(chartModal: ReactNode) {
    setIsModalOpen(true);
    setModalContent(
      <MainModalContainer onClose={closeModal}>{chartModal}</MainModalContainer>
    );
  }
  //----------------END: Modal Section----------------

  return (
    <STYLED_App_Container>
      <Button variant="contained" onClick={handleRefresh}>
        Refresh
      </Button>
      <Button variant="contained" onClick={toggleLanguage}>
        {t("changeLanguage")}
      </Button>{" "}
      <DateRangeSelector
        initialDateModifier={(date) => {
          initialDayLogic.updateDate(date);
        }}
        endDateModifier={(date) => {
          endDayLogic.updateDate(date);
        }}
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
      />
      <CallOutcomesStackedChart
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
        refreshTrigger={refreshTrigger}
        renderModal={renderModal}
      />
      <EscalationRateChart
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
        refreshTrigger={refreshTrigger}
        renderModal={renderModal}
      />
      <AverageTimeToEscalateChart
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
        refreshTrigger={refreshTrigger}
        renderModal={renderModal}
      />
      <CallCountByHourChart
        initialDate={initialDayLogic.date}
        endDate={endDayLogic.date}
        refreshTrigger={refreshTrigger}
        renderModal={renderModal}
      />
      {isModalOpen && modalContent}
    </STYLED_App_Container>
  );
};

export default MainContainer;
