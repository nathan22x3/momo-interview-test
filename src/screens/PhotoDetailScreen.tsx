import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../contexts/ThemeContext';
import { AppStackParams } from '../navigation/AppStack';
import { AppState } from '../store';
import { clearPhoto, getPhoto } from '../store/photo/photoActions';

const { width } = Dimensions.get('window');

export interface PhotoDetailScreenProps
  extends NativeStackScreenProps<AppStackParams, 'PhotoDetail'> {}

const PhotoDetailScreen: React.FC<PhotoDetailScreenProps> = (props) => {
  const {
    route: {
      params: { photoId },
    },
  } = props;

  const { currentItem: photo } = useSelector((state: AppState) => state.photo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhoto(photoId));
    return () => {
      dispatch(clearPhoto());
    };
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.title}>{photo.title}</Text>
      <View style={style.image}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: photo.url }}
          resizeMethod='resize'
        />
      </View>
    </View>
  );
};

PhotoDetailScreen.defaultProps = {};

export default PhotoDetailScreen;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    fontFamily: 'BeVietnam_600SemiBold',
  },
  image: {
    width,
    height: width,
    marginTop: 20,
    backgroundColor: theme.grey,
  },
});
