import Image from "next/image";
import LandingPage from "./pages/landingPage";
import MentorHomePage from "./pages/mentorHomePage";
import UserProfile from "./userProfile/page";
export default function Home() {
  return (
    <div>
      {/* <LandingPage /> */}
      {/* <MentorHomePage /> */}
      <UserProfile />
    </div>
  );
}
