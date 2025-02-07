import { STYLED_Modal_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_modal_container";
import { Close } from "@mui/icons-material";
import { STYLED_CloseModal_Button } from "../../../mui_configurations/styled_components/buttons/styled_close_modal";

interface TestingModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const MainModalContainer: React.FC<TestingModalProps> = ({
  children,
  onClose,
}) => {
  return (
    <STYLED_Modal_Container>
      <STYLED_CloseModal_Button onClick={onClose}>
        <Close />
      </STYLED_CloseModal_Button>

      {children}
    </STYLED_Modal_Container>
  );
};
