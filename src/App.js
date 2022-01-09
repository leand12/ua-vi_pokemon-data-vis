import { useState } from 'react';
import Charts from 'components/Charts';
import SideBar from 'components/SideBar';
import Statistics from 'components/Statistics';
import './App.css';

const PAGE = {
  GAME_STATISTICS: 0,
  TEAM_PLANNER: 1
}

function App() {
  const [page, setPage] = useState(PAGE.TEAM_PLANNER)

  return (
    <div className={page === PAGE.TEAM_PLANNER ? "page-tab" : "page-tab active"}>
      <div className="team-planner">
        <SideBar />
        <Charts changePage={() => setPage(PAGE.GAME_STATISTICS)} />
      </div>
      <Statistics changePage={() => setPage(PAGE.TEAM_PLANNER)} />
    </div>
  );
}

export default App;
