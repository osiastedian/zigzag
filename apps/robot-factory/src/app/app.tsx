import styles from './app.module.scss';

import { Route } from 'react-router-dom';

import { RobotInventory } from '@zigzag/robot-inventory';
import { AppBar, Container, Box, Toolbar, Typography } from '@material-ui/core';

export function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Robot Factory</Typography>
        </Toolbar>
      </AppBar>
      <Container className={styles.app}>
        <Route path="/" component={RobotInventory} />
      </Container>
    </Box>
  );
}

export default App;
