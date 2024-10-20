"use client";

import { emailSchema } from "@/lib/zod/schemas/auth";

import { createClient } from "@v1/supabase/client";
import { AnimatedSizeContainer } from "@v1/ui/animated-size-container";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { useLocalStorage, useMediaQuery } from "@v1/ui/hooks";
import { Icons } from "@v1/ui/icons";
import { Input } from "@v1/ui/input";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const authMethods = ["google", "email", "linkedin", "password"] as const;
export type AuthMethod = (typeof authMethods)[number];

const errorCodes = {
  "no-credentials": "Please provide an email and password.",
  "invalid-credentials": "Email or password is incorrect.",
  "exceeded-login-attempts":
    "Account has been locked due to too many login attempts. Please contact support to unlock your account.",
  "too-many-login-attempts": "Too many login attempts. Please try again later.",
};

const LoginFormContext = createContext<{
  authMethod: AuthMethod | undefined;
  setAuthMethod: Dispatch<SetStateAction<AuthMethod | undefined>>;
  clickedMethod: AuthMethod | undefined;
  showPasswordField: boolean;
  setShowPasswordField: Dispatch<SetStateAction<boolean>>;
  setClickedMethod: Dispatch<SetStateAction<AuthMethod | undefined>>;
  setLastUsedAuthMethod: Dispatch<SetStateAction<AuthMethod | undefined>>;
  setShowSSOOption: Dispatch<SetStateAction<boolean>>;
}>({
  authMethod: undefined,
  setAuthMethod: () => {},
  clickedMethod: undefined,
  showPasswordField: false,
  setShowPasswordField: () => {},
  setClickedMethod: () => {},
  setLastUsedAuthMethod: () => {},
  setShowSSOOption: () => {},
});

export default function LoginForm() {
  const supabase = createClient();

  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showSSOOption, setShowSSOOption] = useState(false);
  const [clickedMethod, setClickedMethod] = useState<AuthMethod | undefined>(
    undefined,
  );

  const [lastUsedAuthMethodLive, setLastUsedAuthMethod] = useLocalStorage<
    AuthMethod | undefined
  >("last-used-auth-method", undefined);
  const { current: lastUsedAuthMethod } = useRef<AuthMethod | undefined>(
    lastUsedAuthMethodLive,
  );

  const [authMethod, setAuthMethod] = useState<AuthMethod | undefined>(
    authMethods.find((m) => m === lastUsedAuthMethodLive) ?? "email",
  );

  useEffect(() => {
    const error = searchParams?.get("error");
    error && "toast.error(error);"; // TODO: fix
  }, [searchParams]);

  const { isMobile } = useMediaQuery();

  useEffect(() => {
    // when leave page, reset state
    return () => setClickedMethod(undefined);
  }, []);

  const GoogleButton = () => {
    return (
      <Button
        onClick={() => {
          setClickedMethod("google");
          setLastUsedAuthMethod("google");
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/api/auth/callback`,
            },
          });
        }}
        variant="outline"
        className="w-full"
        loading={clickedMethod === "google"}
        disabled={clickedMethod && clickedMethod !== "google"}
      >
        <Icons.Google className="size-4 mr-2" />
        Continue with Google
      </Button>
    );
  };

  const LinkedInButton = () => {
    return (
      <Button
        variant="outline"
        onClick={() => {
          setClickedMethod("linkedin");
          setLastUsedAuthMethod("linkedin");
          supabase.auth.signInWithOAuth({
            provider: "linkedin_oidc",
            options: {
              redirectTo: `${window.location.origin}/api/auth/callback`,
            },
          });
        }}
        className="w-full"
        loading={clickedMethod === "linkedin"}
        disabled={clickedMethod && clickedMethod !== "linkedin"}
      >
        <Icons.Linkedin className="size-4 mr-2" />
        Continue with Linkedin
      </Button>
    );
  };

  const SignInWithEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams?.get("next");
    const { isMobile } = useMediaQuery();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkingEmailPassword, setCheckingEmailPassword] = useState(false);

    const {
      showPasswordField,
      setShowPasswordField,
      setClickedMethod,
      authMethod,
      setAuthMethod,
      clickedMethod,
      setLastUsedAuthMethod,
      setShowSSOOption,
    } = useContext(LoginFormContext);

    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              // set this to false if you do not want the user to be automatically signed up
              shouldCreateUser: true,
              emailRedirectTo: `${window.location.origin}/api/auth/callback`,
            },
          });
          console.log(data, error);
        }}
        className="flex flex-col space-y-3"
      >
        {authMethod === "email" && (
          <input
            id="email"
            name="email"
            autoFocus={!isMobile && !showPasswordField}
            type="email"
            placeholder="panic@thedis.co"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm",
              {
                "pr-10": checkingEmailPassword,
              },
            )}
          />
        )}

        {showPasswordField && (
          <div>
            <Input
              type="password"
              autoFocus={!isMobile}
              value={password}
              placeholder="Password (optional)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <Button
          variant="outline"
          {...(authMethod !== "email" && {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              setShowSSOOption(false);
              setAuthMethod("email");
            },
          })}
          loading={checkingEmailPassword || clickedMethod === "email"}
          disabled={clickedMethod && clickedMethod !== "email"}
        >
          {password ? (
            <Icons.InputPassword className="size-4 text-gray-600 mr-2" />
          ) : (
            <Mail className="size-4 text-gray-600 mr-2" />
          )}{" "}
          Continue with {password ? "Password" : "Email"}
        </Button>
      </form>
    );
  };

  const authProviders = [
    {
      method: "google",
      component: <GoogleButton />,
    },
    {
      method: "github",
      component: <LinkedInButton />,
    },
    {
      method: "email",
      component: <SignInWithEmail />,
    },
  ];

  const authMethodComponent = authProviders.find(
    (provider) => provider.method === authMethod,
  )?.component;

  const showEmailPasswordOnly = authMethod === "email" && showPasswordField;

  return (
    <LoginFormContext.Provider
      value={{
        authMethod,
        setAuthMethod,
        clickedMethod,
        showPasswordField,
        setShowPasswordField,
        setClickedMethod,
        setLastUsedAuthMethod,
        setShowSSOOption,
      }}
    >
      <AnimatedSizeContainer height>
        <div className="grid gap-3 p-1">
          {authMethod && (
            <div className="flex flex-col gap-2">
              {authMethodComponent}

              {!showEmailPasswordOnly && authMethod === lastUsedAuthMethod && (
                <div className="text-center text-xs">
                  <span className="text-gray-500">
                    You signed in with{" "}
                    {lastUsedAuthMethod.charAt(0).toUpperCase() +
                      lastUsedAuthMethod.slice(1)}{" "}
                    last time
                  </span>
                </div>
              )}
              <div className="my-2 flex flex-shrink items-center justify-center gap-2">
                <div className="grow basis-0 border-b border-gray-300" />
                <span className="text-xs font-normal uppercase leading-none text-gray-500">
                  or
                </span>
                <div className="grow basis-0 border-b border-gray-300" />
              </div>
            </div>
          )}
          {showEmailPasswordOnly ? (
            <div className="mt-2 text-center text-sm text-gray-500">
              <button
                type="button"
                onClick={() => setShowPasswordField(false)}
                className="font-semibold text-gray-500 transition-colors hover:text-black"
              >
                Continue with another method
              </button>
            </div>
          ) : (
            authProviders
              .filter((provider) => provider.method !== authMethod)
              .map((provider) => (
                <div key={provider.method}>{provider.component}</div>
              ))
          )}
        </div>
      </AnimatedSizeContainer>
    </LoginFormContext.Provider>
  );
}
