// src/App.jsx
import React, { useState } from 'react';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  DirectionsRun as ActivityIcon,
  LocalDining as NutritionIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const mockData = [
  { day: 'Mon', steps: 3000 },
  { day: 'Tue', steps: 4500 },
  { day: 'Wed', steps: 3800 },
  { day: 'Thu', steps: 5000 },
  { day: 'Fri', steps: 4200 },
  { day: 'Sat', steps: 3700 },
  { day: 'Sun', steps: 4800 },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const LoginScreen = () => (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Fitness Tracker
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Sign in to access your dashboard
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  const DashboardScreen = () => (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Fitness Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{username[0]}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Dashboard', 'Activity', 'Nutrition', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? <DashboardIcon /> : 
                   index === 1 ? <ActivityIcon /> : 
                   index === 2 ? <NutritionIcon /> : <SettingsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 360 }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Weekly Step Count
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockData}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="steps" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Daily Goal Progress
                    </Typography>
                    <Typography variant="h4" color="primary">
                      7,500 / 10,000
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      steps
                    </Typography>
                    <LinearProgress variant="determinate" value={75} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Calories Burned
                    </Typography>
                    <Typography variant="h4" color="secondary">
                      486
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      kcal
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Active Minutes
                    </Typography>
                    <Typography variant="h4" color="primary">
                      42
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      minutes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? <DashboardScreen /> : <LoginScreen />}
    </ThemeProvider>
  );
}

export default App;