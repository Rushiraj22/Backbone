import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "src/@core/components/icon";
import themeConfig from "src/configs/themeConfig";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useSettings } from "src/@core/hooks/useSettings";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import InputText from "src/@core/components/libs/ui/inputText/inputText";
import CustomTypography from "src/@core/components/libs/ui/typography/typography";
import CircularProgressComponent from "src/@core/components/libs/ui/CircularProgress/CircularProgress";
import MUIButton from "src/@core/components/libs/ui/button/button";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import { ChangePassword, getLoadingState } from "src/redux/reducers/authReducer";
import OutlinedInputPassword from "src/@core/components/libs/ui/passworContainer/outlinedInput";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "src/redux/app/Store";

/**
 * Styled Components
 */
const ForgotPasswordIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10)
  }
}));

const ForgotPasswordIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  }
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  }
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400
  }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  "& svg": { mr: 1.5 },
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "center",
  color: theme.palette.primary.main
}));

interface FormValues {
  otp: number | string;
  new_password: string;
  confirm_password: string;
};

const ForgotPassword = () => {
  /**
   * Hooks
   */
  const theme = useTheme();
  const { settings } = useSettings();
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const { uuid } = router?.query;

  /**
   * Vars
   */
  const { skin } = settings;
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const imageSource = skin === "bordered" ? "auth-v2-forgot-password-illustration-bordered" : "auth-v2-forgot-password-illustration";

  const defaultValues = {
    otp: "",
    new_password: "",
    confirm_password: ""
  };

  /**
   * Form values
   */
  const [inputValues, setInputValues] = useState<FormValues>(defaultValues);

  /**
   * get Loading state
   */
  const isLoadingState = useSelector(getLoadingState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoadingState)
  }, [isLoadingState]);

  /**
   * Form Error
   */
  const [errors, setErrors] = useState({
    otp: "",
    new_password: "",
    confirm_password: ""
  });

  /**
   * Validation function
   * @param name 
   * @param value 
   * @returns 
   */
  const validateForm = (name: any, value: any) => {
    switch (name) {
      case "otp":
        if (!value || value.trim() === "") {
          return "Otp is required.";
        } else {
          return "";
        }
      case "new_password":
        if (!value || value.trim() === "") {
          return "Password is required.";
        }
        if (value.length < 8) {
          return "Password must be at least 8 characters long."
        }
        if (value.length > 16) {
          return "Password cannot exceed 16 characters.";
        }
        else {
          return "";
        }

      case "confirm_password":
        if (!value) {
          return "Confirm password is required.";
        }
        if (inputValues.confirm_password && value !== inputValues.new_password) {
          return "Password and Confirm Password does not match.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  /**
   * handleSubmit function
   * @param event 
   * @returns 
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: { [key: string]: string } = {};
    Object.keys(inputValues).forEach((name: string) => {
      const error: string = validateForm(name, inputValues[name as keyof typeof inputValues]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...errors, ...validationErrors });

      return;
    }

    /**
     * Passed inputValues for ChangePassword function
     */
    dispatch(ChangePassword({ inputValues, uuid }));
  }

  /**
   * OnChange event
   * @param event 
   */
  const handleOnChange = (event: any) => {
    const { name } = event.target;
    const value = event.target.value;

    setErrors({ ...errors, [name]: validateForm(name, value) });
    setInputValues({ ...inputValues, [name]: value });
  }

  return (
    <BoxComponent className="content-right">
      {
        !hidden ? (
          <BoxComponent sx={{ flex: 1, display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
            <ForgotPasswordIllustrationWrapper>
              <ForgotPasswordIllustration
                alt="forgot-password-illustration"
                src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
              />
            </ForgotPasswordIllustrationWrapper>
            <FooterIllustrationsV2 image={`/images/pages/auth-v2-forgot-password-mask-${theme.palette.mode}.png`} />
          </BoxComponent>
        )
          : null
      }
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <BoxComponent
          sx={{
            p: 7,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper"
          }}
        >
          <BoxWrapper>
            <BoxComponent
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width={47} fill="none" height={26} viewBox="0 0 268 150" xmlns="http://www.w3.org/2000/svg">
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint0_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint1_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
                />
                <defs>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint0_linear_7821_79167"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint1_linear_7821_79167"
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <CustomTypography variant="h6" sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: "1.5rem !important" }}>
                {themeConfig.templateName}
              </CustomTypography>
            </BoxComponent>
            <BoxComponent sx={{ mb: 6 }}>
              <CustomTypography
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.18px",
                  marginBottom: theme.spacing(1.5),
                  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) }
                }} variant="h5">
                Change Password
              </CustomTypography>
            </BoxComponent>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <InputText
                size="medium"
                label="Otp"
                name="otp"
                type="text"
                variant="outlined"
                placeholder="Otp"
                id="otp"
                onChange={handleOnChange}
                value={inputValues.otp}
                errorMessage={errors.otp}
                error={errors.otp ? true : false}
                disabled={false}
              />
              <OutlinedInputPassword
                name="new_password"
                label="Password"
                value={inputValues.new_password}
                onChange={handleOnChange}
                placeholder="Password"
                error={errors.new_password ? true : false}
                errorMessage={errors.new_password}
              />
              <OutlinedInputPassword
                name="confirm_password"
                label="Confirm Password"
                value={inputValues.confirm_password}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                error={errors.confirm_password ? true : false}
                errorMessage={errors.confirm_password}
              />
              <MUIButton
                fullWidth
                variant="contained"
                color="primary"
                title={isLoading ? "Loading..." : "Change Password"}
                size="large"
                type="submit"
                sx={{ mb: 5.25 }}
                startIcon={isLoading &&
                  <CircularProgressComponent
                    sx={{ color: "white" }} size={20}
                  />}
              />
              <CustomTypography sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LinkStyled href="/login">
                  <Icon icon="mdi:chevron-left" fontSize="2rem" />
                  <span>Back to login</span>
                </LinkStyled>
              </CustomTypography>
            </form>
          </BoxWrapper>
        </BoxComponent>
      </RightWrapper>
    </BoxComponent>
  )
}

ForgotPassword.guestGuard = true;
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword;
