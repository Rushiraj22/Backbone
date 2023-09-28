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
}

const TableHeader = (props: TableHeaderProps) => {
  /**
   * Props
   */
  const { handleAdd, title, searchlabel, buttonName } = props;

  return (
    <BoxComponent>
      <MUIGrid container spacing={6} sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <MUIGrid item sm={4} xs={12}>
          <CustomTypography variant="h5">{title}</CustomTypography>
        </MUIGrid>
      </MUIGrid>
      <MUIDivider />
      <BoxComponent sx={{ p: 5, pb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end" }}>
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
    </BoxComponent>
  )
}

export default TableHeader;
