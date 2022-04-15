import React, { useState } from "react";

import PropTypes from "prop-types";
import { Stack, Box, Tabs, Tab, Typography, Button } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles';

import Login from './Login'
import Register from './Register'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`
  }
}

const Auth = () => {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  return (
    <>
        <Stack justifyContent="center" alignItems="center" sx={{ width: '100vw', height: '90vh', overflow: 'hidden' }} >
            <Box sx={{width: '100vw', maxWidth: '600px', height: '60vh'}}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} >
                        <Tab label="Zaloguj się" {...a11yProps(0)} sx={{ width: '50%' }} />
                        <Tab label="Zarejestruj się" {...a11yProps(1)} sx={{ width: '50%' }} />
                    </Tabs>
                </Box>
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex} sx={{ width: '100%', margin: '0px', padding: '0px' }} >
                    <TabPanel value={value} index={0}>
                        { <Login /> }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        { <Register /> }
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Stack>
    </>
  )
}

export default Auth;
