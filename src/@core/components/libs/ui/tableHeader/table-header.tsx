import Icon from "src/@core/components/icon";
import MUIButton from "src/@core/components/libs/ui/button/button";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import TextFieldComponent from "src/@core/components/libs/ui/textField/textField";
import CustomTypography from "src/@core/components/libs/ui/typography/typography";
import MUIGrid from "../muiGrid/muiGrid";
import MUIDivider from "../divider/divider";

interface TableHeaderProps {
  handleAdd?: any;
  title?: string;
  searchlabel?: string | any;
  buttonName?: string;
  exportButtonTitle?: string;
  change3PL?: any;
  handleButtonClick?: any;
  handlePrintLabelBtn?: any;
  printLabel?: string | null | undefined;
  showHeader?: boolean;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleAdd, title, searchlabel, buttonName, exportButtonTitle, change3PL, handleButtonClick, handlePrintLabelBtn, printLabel, showHeader = true } = props;

  return (
    <BoxComponent>
      <MUIGrid container spacing={6} sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <MUIGrid item sm={4} xs={12}>
          <CustomTypography variant="h5">{title}</CustomTypography>
        </MUIGrid>
      </MUIGrid>
      <MUIDivider />
      {
        showHeader &&
        <BoxComponent sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <BoxComponent sx={{}}>
            {exportButtonTitle &&
              <MUIButton
                sx={{ mr: 4, mb: 2 }}
                color="secondary"
                title={exportButtonTitle}
                variant="outlined"
                startIcon={<Icon icon="mdi:export-variant" fontSize={20} onClick={handleButtonClick} />}
                onClick={handleButtonClick}
              />
            }
          </BoxComponent>
          <BoxComponent sx={{}}>
            {change3PL ?
              <MUIButton
                sx={{ mr: 4, mb: 2 }}
                color="primary"
                title={change3PL}
                variant="contained"
                onClick={handleButtonClick}
              />
              : null
            }
          </BoxComponent>
          <BoxComponent sx={{}}>
            {printLabel ?
              <MUIButton
                sx={{ mr: 4, mb: 2 }}
                color="primary"
                title={printLabel}
                variant="contained"
                onClick={handlePrintLabelBtn}
              />
              : null
            }
          </BoxComponent>
          <BoxComponent sx={{ display: "flex", justifyContent: "flex-end" }}>
            <BoxComponent sx={{ width: "50%" }}>
              <TextFieldComponent
                label={searchlabel}
                placeholder={searchlabel}
                sx={{ mr: 6, mb: 2 }}
                size="small"
              />
            </BoxComponent>
            {buttonName ?
              <BoxComponent sx={{ width: "50%" }}>
                <MUIButton
                  variant="contained"
                  color="primary"
                  title={buttonName}
                  sx={{ mb: 2, float: "right" }}
                  onClick={handleAdd}
                />
              </BoxComponent> : null
            }
          </BoxComponent>
        </BoxComponent>
      }
    </BoxComponent>
  )
}

export default TableHeader;
