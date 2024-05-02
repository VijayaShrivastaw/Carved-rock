import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackContainer from '../navigator/StackContainer'

const NavContainer = () => {
  return (
    <NavigationContainer>
    <StackContainer/>
    </NavigationContainer>
  );
};

export default NavContainer;