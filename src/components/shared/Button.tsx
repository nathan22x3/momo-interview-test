import React, { useContext } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { shade } from '../../utils/color';

export interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  icon?: Object;
  loading?: boolean;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    backgroundColor,
    color,
    icon,
    children,
    loading,
    activeOpacity,
    disabled,
    onPress,
    style,
  } = props;
  const theme = useContext(ThemeContext);
  const alpha = disabled ? -64 : 0;
  const finalBackgroundColor = backgroundColor ?? theme.momo;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: finalBackgroundColor,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity || 0.9}
    >
      {icon}
      <View
        style={[
          styles.content,
          {
            marginLeft: icon ? 10 : 0,
          },
        ]}
      >
        <Text style={[styles.contentText, { color: theme.white }]}>
          {children}
        </Text>
        {loading && (
          <ActivityIndicator
            style={{ marginLeft: 10 }}
            size={20}
            color={shade(color || theme.label, alpha)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 50,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentText: {
    fontFamily: 'BeVietnam_600SemiBold',
  },
});
