import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "../../shared/lib/analytics/metrica.ts";
import * as React from "react";

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPage(location.pathname);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
