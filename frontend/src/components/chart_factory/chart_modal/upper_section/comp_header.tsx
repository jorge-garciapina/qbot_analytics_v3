import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export const ModalHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="modalChartTitle">
        {t("modals.appointmentTrendsTitle")}
      </Typography>
      <Typography variant="modalChartText"> {t("modals.headerText")}
      </Typography>
    </>
  );
};
