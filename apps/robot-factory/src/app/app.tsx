import styles from './app.module.scss';

import { Route } from 'react-router-dom';

import { RobotInventory } from '@zigzag/robot-inventory';

export function App() {
  return (
    <div className={styles.app}>
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/robot-inventory">RobotInventory</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div> */}
      <Route path="/" component={RobotInventory} />
    </div>
  );
}

export default App;
