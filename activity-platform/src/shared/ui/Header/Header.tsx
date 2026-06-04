import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes.ts";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../ui/Button/Button";
import { Search, LogOut } from "lucide-react";
import * as React from "react";
import { useModal } from "../../../app/providers/useModal";
import "./header.scss";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentFilters, openFilterModal } = useModal();

  const isProfile = location.pathname.startsWith("/profile");
  const isFeed = location.pathname === ROUTES.FEED;
  const activeFiltersCount = [
    currentFilters.category,
    currentFilters.location?.trim(),
    currentFilters.date,
  ].filter(Boolean).length;

  return (
    <header className="header">
      <img src="/logo.png" alt="logo" className="header__logo" />

      {isFeed && (
        <Button
          variant="icon"
          className="header__filter-button"
          onClick={openFilterModal}
        >
          <Search size={34} />
          {activeFiltersCount > 0 && (
            <span className="header__filter-badge">{activeFiltersCount}</span>
          )}
        </Button>
      )}

      {isProfile && (
        <Button
          variant="icon"
          onClick={async () => {
            await logout();
            navigate(ROUTES.LOGIN);
          }}
        >
          <LogOut size={34} />
        </Button>
      )}
    </header>
  );
};

export default Header;
