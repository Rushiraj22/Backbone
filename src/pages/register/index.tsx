import { ReactNode, useState } from "react";
import Link from "next/link";
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "src/@core/components/icon";
import themeConfig from "src/configs/themeConfig";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useSettings } from "src/@core/hooks/useSettings";
import { useTranslation } from "react-i18next";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import InputText from "src/@core/components/libs/ui/inputText/inputText";
import OutlinedInputPassword from "src/@core/components/libs/ui/passworContainer/outlinedInput";
import CustomTypography from "src/@core/components/libs/ui/typography/typography";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import MUIButton from "src/@core/components/libs/ui/button/button";
import MUIDivider from "src/@core/components/libs/ui/divider/divider";
import MUIIconButton from "src/@core/components/libs/ui/iconButton/iconButton";
import CircularProgressComponent from "src/@core/components/libs/ui/CircularProgress/CircularProgress";
import { isValidEmail } from "src/utils/helper";
import MUICheckbox from "src/@core/components/libs/ui/checkbox/checkbox";
import MUIFormControl from "src/@core/components/libs/ui/formControl/formControl";

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10)
  }
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem"
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem"
  }
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450
  }
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400
  }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main
}));

interface FormValues {
  name: string;
  password: string;
  email: string;
  mobile: string;
  confirmPassword: string;
  agree: any;
};

const Register = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();

  // ** Vars
  const { skin } = settings;

  const imageSource = skin === "bordered" ? "auth-v2-register-illustration-bordered" : "auth-v2-register-illustration";

  const defaultValues = {
    name: "",
    password: "",
    email: "",
    mobile: "",
    confirmPassword: "",
    agree: "false"
  };

  const [inputValues, setInputValues] = useState<FormValues>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);

  // ** Form Error
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    email: "",
    mobile: "",
    confirmPassword: "",
    agree: ""
  });

  // ** Validation function
  const validateForm = (name: any, value: any) => {
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return `${t("name_is_required", "Name is required")}`;
        } else {
          return "";
        }
      case "email":
        if (!value || value.trim() === "") {
          return `${t("email_is_required", "Email is required.")}`;
        }
        if (!isValidEmail(value)) {
          return `${t("please_enter_valid_email_address", "Please enter valid email address.")}`
        }
        else {
          return "";
        }
      case "mobile":
        if (!value || value.trim() === "") {
          return `${t("mobile_no_is_required", "Mobile number is required")}`;
        } else {
          return "";
        }

      case "password":
        if (!value || value.trim() === "") {
          return `${t("password_is_required", "Password is required")}`;
        }
        if (value.length < 8) {
          return;
        }
        if (value.length > 16) {
          return `${t("password_cannot_exceed_16_characters", "Password cannot exceed 16 characters")}`;
        }
        else {
          return `${t("password_must_be_at_least_8_characters_long", "Password must be at least 8 characters long")}`;
        }

      case "confirmPassword":
        if (!value) {
          return `${t("confirm_password_is_required", "Confirm password is required.")}`;
        }
        if (inputValues.confirmPassword && value !== inputValues.password) {
          return `${t("password_and_confirm_password_does_not_match", "Password and Confirm Password does not match")}`;
        } else {
          return "";
        }

      case "agree":
        return value ? "" : `${t("please_accept_terms_and_conditions", "Please accept terms and conditions")}`;

      default: {
        return "";
      }
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: { [key: string]: string } = {};
    Object.keys(inputValues).forEach((name: string) => {
      const error: string | undefined = validateForm(name, inputValues[name as keyof typeof inputValues]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...errors, ...validationErrors });

      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // RegisterUser(inputValues);
  };

  const handleOnChange = (event: any) => {
    const { name } = event.target;
    const value = event.target.name === "agree" ? event.target.checked : event.target.value.toString();

    setErrors({ ...errors, [name]: validateForm(name, value) });
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <BoxComponent className="content-right">
      {!hidden ? (
        <BoxComponent sx={{ flex: 1, display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt="register-illustration"
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
        </BoxComponent>
      ) : null}
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
                    gradientUnits="userSpaceOnUse"
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
            <BoxComponent sx={{ mb: 6, textAlign: "center" }}>
              <CustomTypography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.18px",
                  marginBottom: theme.spacing(1.5),
                  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) }
                }}
              >
                {`${t("create_user-account", "Create User Account 🚀")}`}
              </CustomTypography>
            </BoxComponent>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <InputText
                size="medium"
                label={`${t("name", "Name")}`}
                name="name"
                variant="outlined"
                placeholder={`${t("name", "Name")}`}
                id="Name"
                onChange={handleOnChange}
                value={inputValues.name}
                type="text"
                errorMessage={errors.name}
                error={errors.name ? true : false}
                disabled={false}
              />
              <InputText
                size="medium"
                label={`${t("email", "Email")}`}
                name="email"
                variant="outlined"
                placeholder={`${t("email", "Email")}`}
                id="email"
                onChange={handleOnChange}
                value={inputValues.email}
                type="text"
                errorMessage={errors.email}
                error={errors.email ? true : false}
                disabled={false}
              />
              <InputText
                type={"number"}
                size="medium"
                label={`${t("mobile", "Mobile")}`}
                name="mobile"
                variant="outlined"
                placeholder={`${t("mobile", "Mobile")}`}
                id="mobile"
                onChange={handleOnChange}
                value={inputValues.mobile}
                errorMessage={errors.mobile}
                error={errors.mobile ? true : false}
                disabled={false}
              />
              <OutlinedInputPassword
                name="password"
                label={`${t("password", "Password")}`}
                value={inputValues.password}
                onChange={handleOnChange}
                placeholder={`${t("password", "Password")}`}
                error={errors.password ? true : false}
                errorMessage={errors.password}
              />
              <OutlinedInputPassword
                name="confirmPassword"
                label={`${t("confirm_password", "Confirm Password")}`}
                value={inputValues.confirmPassword}
                onChange={handleOnChange}
                placeholder={`${t("confirm_password", "Confirm Password")}`}
                error={errors.confirmPassword ? true : false}
                errorMessage={errors.confirmPassword}
              />
              <MUIFormControl sx={{ mb: 2 }} size={undefined}>
                <MUICheckbox
                  checked={inputValues.agree}
                  onChange={handleOnChange}
                  name="agree"
                  sx={{ height: "30px", "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
                  label={<LinkStyled href="/" onClick={e => e.preventDefault()}>
                    {`${t("privacy_policy", "privacy policy & terms")}`}
                  </LinkStyled>
                  }
                  errors={errors.agree}
                />
              </MUIFormControl>
              <MUIButton
                fullWidth
                variant="contained"
                color="primary"
                title={isLoading ? `${t("loading", "Loading...")}` : `${t("signup", "Sign up")}`}
                size="large"
                type="submit"
                sx={{ mb: 7 }}
                startIcon={isLoading &&
                  <CircularProgressComponent
                    sx={{ color: "white" }} size={20}
                  />}
              />
              <BoxComponent sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <CustomTypography sx={{ mr: 2, color: "text.secondary" }}>{t("already_have_an_account", "Already have an account?")}</CustomTypography>
                <CustomTypography href="/login" component={Link} sx={{ color: "primary.main", textDecoration: "none" }}>
                  {`${t("sign_in_instead", "Sign in instead")}`}
                </CustomTypography>
              </BoxComponent>
              <MUIDivider
                sx={{
                  "& .MuiDivider-wrapper": { px: 4 },
                  mt: (theme: any) => `${theme.spacing(5)} !important`,
                  mb: (theme: any) => `${theme.spacing(7.5)} !important`
                }}
                title={`${t('or')}`}
              />
              <BoxComponent sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#497ce2" }}
                  onClick={(e: any) => e.preventDefault()}
                  icon={<Icon icon="mdi:facebook" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#1da1f2" }}
                  onClick={(e: any) => e.preventDefault()}
                  icon={<Icon icon="mdi:twitter" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  onClick={(e: any) => e.preventDefault()}
                  sx={{ color: (theme: any) => (theme.palette.mode === "light" ? "#272727" : "grey.300") }}
                  icon={<Icon icon="mdi:github" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#db4437" }}
                  onClick={(e: any) => e.preventDefault()}
                  icon={<Icon icon="mdi:google" />}
                />
              </BoxComponent>
            </form>
          </BoxWrapper>
        </BoxComponent>
      </RightWrapper>
    </BoxComponent>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
