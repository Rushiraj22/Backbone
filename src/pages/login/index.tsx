import { useState, ReactNode, MouseEvent, useEffect } from "react";
import Link from "next/link";
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "src/@core/components/icon";
import { useSettings } from "src/@core/hooks/useSettings";
import themeConfig from "src/configs/themeConfig";
import BlankLayout from "src/@core/layouts/BlankLayout";
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { useTranslation } from "react-i18next";
import CustomTypography from "src/@core/components/libs/ui/typography/typography";
import MUIButton from "src/@core/components/libs/ui/button/button";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import MUIDivider from "src/@core/components/libs/ui/divider/divider";
import MUICheckbox from "src/@core/components/libs/ui/checkbox/checkbox";
import MUIIconButton from "src/@core/components/libs/ui/iconButton/iconButton";
import CircularProgressComponent from "src/@core/components/libs/ui/CircularProgress/CircularProgress";
import InputText from "src/@core/components/libs/ui/inputText/inputText";
import OutlinedInputPassword from "src/@core/components/libs/ui/passworContainer/outlinedInput";
import { useAuth } from "src/hooks/useAuth";

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "45rem",
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

const LoginPage = () => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(false);
  const { settings } = useSettings();
  const { skin } = settings;

  const [rememberMe, setRememberMe] = useState(false);

  const auth = useAuth();

  const imageSource = skin === "bordered" ? "auth-v2-login-illustration-bordered" : "auth-v2-login-illustration";

  /**
   * Form fields
   */
  const [inputValues, setInputValues] = useState<any | undefined>({
    username: "",
    password: ""
  });

  /**
   * Form error fields
   */
  const [errors, setErrors] = useState<any | undefined>({
    username: "",
    password: ""
  });

  /**
   * Validation function
   * @param name 
   * @param value 
   * @returns 
   */
  const validateForm = (name: any, value: any) => {
    switch (name) {
      case "username":
        if (!value || value.trim() === "") {
          return "Username is required";
        } else {
          return "";
        }
      case "password":
        if (!value || value.trim() === "") {
          return "Password is required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  /**
   * Onchange event
   * @param event 
   */
  const handleOnChange = (event: any) => {
    const { name } = event.target;
    const value = event.target.value;

    setErrors({ ...errors, [name]: validateForm(name, value) });
    setInputValues({ ...inputValues, [name]: value });
  }

  /**
   * form submit event
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

    if (inputValues.username && inputValues.password) {
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
        localStorage.setItem("email", inputValues.username);
        localStorage.setItem("password", inputValues.password);
      }
      else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    }

    /**
     * Passed inputvalues from API
     */
    auth.login(inputValues);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

  }

  /**
   * fetch username/email or password in textfield
   */
  useEffect(() => {
    const newInputValues = {
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password")
    };
    setInputValues(newInputValues);
  }, []);

  return (
    <BoxComponent className="content-right">
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <BoxComponent
          sx={{
            p: 7,
            height: "100vh",
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
              <img src={"/images/backbone.png"} alt="Your PNG Image" height={"30px"} width={"30px"} />
              <CustomTypography variant="h6" sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: "1.5rem !important" }}>
                {themeConfig.templateName}
              </CustomTypography>
            </BoxComponent>
            <BoxComponent sx={{ mb: 6 }}>
              <CustomTypography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.18px",
                  marginBottom: theme.spacing(1.5),
                  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) }
                }}
              >
                Welcome to Backbone! 👋🏻
              </CustomTypography>
              <CustomTypography variant="body2">Please sign-in to your account</CustomTypography>
            </BoxComponent>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <InputText
                name="username"
                label="Username"
                placeholder="Username"
                value={inputValues.username}
                onChange={handleOnChange}
                error={errors.username ? true : false}
                errorMessage={errors.username && errors.username}
              />
              <OutlinedInputPassword
                name="password"
                label="Password"
                placeholder="Password"
                value={inputValues.password}
                onChange={handleOnChange}
                error={errors.password ? true : false}
                errorMessage={errors.password && errors.password}
              />
              <BoxComponent
                sx={{ mb: 4, display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
              >
                <MUICheckbox label="Remember Me" checked={rememberMe} onChange={(e: any) => setRememberMe(!rememberMe)} />
                <CustomTypography
                  variant="body2"
                  component={Link}
                  href="/forgot-password"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  Forgot Password?
                </CustomTypography>
              </BoxComponent>
              <MUIButton
                variant="contained"
                color="primary"
                title={isLoading ? "Loading..." : "Login"}
                fullWidth
                size="large"
                type="submit"
                sx={{ mb: 7 }} startIcon={isLoading &&
                  <CircularProgressComponent
                    sx={{ color: "white" }} size={20}
                  />}
              />
              <BoxComponent sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <CustomTypography sx={{ mr: 2, color: "text.secondary" }}>New on our platform?</CustomTypography>
                <CustomTypography href="/register" component={Link} sx={{ color: "primary.main", textDecoration: "none" }}>
                  Create an account
                </CustomTypography>
              </BoxComponent>
              <MUIDivider
                sx={{
                  "& .MuiDivider-wrapper": { px: 4 },
                  mt: (theme: any) => `${theme.spacing(5)} !important`,
                  mb: (theme: any) => `${theme.spacing(7.5)} !important`
                }}
                title="or"
              />
              <BoxComponent sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#497ce2" }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  icon={<Icon icon="mdi:facebook" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#1da1f2" }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  icon={<Icon icon="mdi:twitter" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{ color: (theme: any) => (theme.palette.mode === "light" ? "#272727" : "grey.300") }}
                  icon={<Icon icon="mdi:github" />}
                />
                <MUIIconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#db4437" }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  icon={<Icon icon="mdi:google" />}
                />
              </BoxComponent>
            </form>
          </BoxWrapper>
        </BoxComponent>
      </RightWrapper>
      {
        !hidden ? (
          <BoxComponent sx={{ flex: 1, display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
            <BoxComponent
              sx={{
                padding: theme.spacing(0),
                paddingRight: "0 !important",
                [theme.breakpoints.down("lg")]: {
                  padding: theme.spacing(0)
                }
              }}
            >
              <LoginIllustration
                alt="login-illustration"
                src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
              />
            </BoxComponent>
            <FooterIllustrationsV2 />
          </BoxComponent>
        ) : null
      }
    </BoxComponent>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
LoginPage.guestGuard = true;

export default LoginPage;
