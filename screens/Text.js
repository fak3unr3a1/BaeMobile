import React from 'react';
import { Platform, Text as RNText } from 'react-native';

const Text = ({ children, style }) => {
  if (Platform.OS === 'web') {
    return <span style={style}>{children}</span>;
  } else {
    return <RNText style={style}>{children}</RNText>;
  }
};

export default Text;
