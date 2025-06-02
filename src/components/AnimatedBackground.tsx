import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedBackground = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.blob, animatedStyle]} />
      <Animated.View 
        style={[
          styles.blob, 
          animatedStyle, 
          { backgroundColor: '#60A5FA', top: -height * 0.2, left: -width * 0.2 }
        ]} 
      />
      <Animated.View 
        style={[
          styles.blob, 
          animatedStyle, 
          { backgroundColor: '#93C5FD', top: height * 0.6, left: width * 0.5 }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#BFDBFE',
    opacity: 0.3,
  },
});

export default AnimatedBackground;
