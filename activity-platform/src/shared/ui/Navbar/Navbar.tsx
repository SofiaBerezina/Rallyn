import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { House, CircleUserRoundIcon, Plus } from "lucide-react";
import "./navbar.scss";
import { Button } from "../Button";
import { useModal } from "../../../app/providers/useModal.ts";

const Navbar = () => {
  const { user } = useAuth();
  const { openCreateActivity } = useModal();

  if (!user) return null;

  return (
    <nav className="navbar">
      <NavLink to={ROUTES.FEED} className="btn-icon">
        <House size={34} />
      </NavLink>
      <Button variant="icon" onClick={openCreateActivity}>
        <Plus size={34} />
      </Button>
      <NavLink to={ROUTES.getProfile(user.uid)} className="btn-icon">
        <CircleUserRoundIcon size={34} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
