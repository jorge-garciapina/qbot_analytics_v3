import { STYLED_BottomSection_Container } from "../../../../mui_configurations/styled_components/chart_sections/bottom_section/styled_bottom_main_container";
import { ChartTotals } from "../../../../types/data_types";
import { TotalsViewer } from "./comp_totals_viewer";
export const BottomSection: React.FC<{ totals: ChartTotals }> = ({
  totals,
}) => {
  // Function to generate components dynamically
  const generateDynamicComponents = (totals: ChartTotals) => {
    return totals.map((element, index) => (
      <TotalsViewer key={index} name={element.name} value={element.value} />
    ));
  };

  const dynamicComponents = generateDynamicComponents(totals);
  return (
    <STYLED_BottomSection_Container>
      <h1>Bottom</h1>
      {dynamicComponents}
    </STYLED_BottomSection_Container>
  );
};
