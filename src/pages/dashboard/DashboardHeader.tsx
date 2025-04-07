import {NavUser} from './navUser';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className="header-right">
        <NavUser />
      </div>
    </div>
  );
}

export default DashboardHeader;