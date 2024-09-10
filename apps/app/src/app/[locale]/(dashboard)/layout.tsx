import Toolbar from "@/components/layout/toolbar/toolbar";
import UserSurveyPopup from "@/components/layout/user-survey";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  return (
    <div>
      <UserSurveyPopup />

      <Toolbar show={["onboarding"]} />
      {children}
    </div>
  );
}
