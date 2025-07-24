import { NavLink, useLocation } from "react-router-dom";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  paramName?: string;
  paramValue?: string;
}

export default function SidebarNavLink({
  to,
  icon,
  label,
  paramName,
  paramValue,
}: SidebarNavLinkProps) {
  const location = useLocation();

  const isActiveLink = (): boolean => {
    if (!paramName && !paramValue) {
      if (to === "/dashboard") {
        return location.pathname === to && location.search === "";
      }
      if (to === "/content") {
        return location.pathname.startsWith("/content");
      }
    }
    if (paramName && paramValue) {
      const searchParams = new URLSearchParams(location.search);
      const currentParamValue = searchParams.get(paramName);
      return currentParamValue === paramValue;
    }
    return false;
  };
  return (
    <NavLink
      to={to}
      className={() =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
          isActiveLink()
            ? "bg-purple-700 text-white shadow-md"
            : "hover:bg-violet-800 text-gray-300"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}
