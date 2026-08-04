import { createBrowserRouter } from "react-router";
import type { ReactNode } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import LayoutExhibit1 from "./components/LayoutExhibit1";
import Layout from "./components/Layout";
import LayoutExhibit3 from "./components/LayoutExhibit3";
import LayoutExhibit4 from "./components/LayoutExhibit4";
import Survey from "./components/Survey";
import GettingStarted from "./components/GettingStarted";
import PolicyEducation from "./components/PolicyEducation";
import HomeRisks from "./components/HomeRisks";
import RiskDetails from "./components/RiskDetails";
import Recommendation from "./components/Recommendation";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./components/RequireAuth";
import RequireGuest from "./components/RequireGuest";

function Protected({ component }: { component: ReactNode }) {
  return <RequireAuth>{component}</RequireAuth>;
}

function GuestOnly({ component }: { component: ReactNode }) {
  return <RequireGuest>{component}</RequireGuest>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <GuestOnly component={<Login />} />,
  },
  {
    path: "/home",
    Component: () => <Protected component={<HomePage />} />,
  },
  {
    path: "/account",
    Component: () => <Protected component={<AccountPage />} />,
  },
  {
    path: "/exhibit-1",
    Component: () => <Protected component={<LayoutExhibit1 />} />,
    children: [
      { index: true, Component: () => <Protected component={<Survey />} /> },
      { path: "getting-started", Component: () => <Protected component={<GettingStarted />} /> },
    ],
  },
  {
    path: "/exhibit-2",
    Component: () => <Protected component={<Layout />} />,
    children: [
      { index: true, Component: () => <Protected component={<PolicyEducation />} /> },
      { path: "home-risks", Component: () => <Protected component={<HomeRisks />} /> },
      { path: "risk-details", Component: () => <Protected component={<RiskDetails />} /> },
    ],
  },
  {
    path: "/exhibit-3",
    Component: () => <Protected component={<LayoutExhibit3 />} />,
    children: [
      { index: true, Component: () => <Protected component={<Recommendation />} /> },
    ],
  },
  {
    path: "/exhibit-4",
    Component: () => <Protected component={<LayoutExhibit4 />} />,
    children: [
      { index: true, Component: () => <Protected component={<Dashboard />} /> },
    ],
  },
]);
