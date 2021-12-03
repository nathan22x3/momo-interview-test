import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppStackParams } from '../../navigation/AppStack';
import { Photo } from '../../store/photo/photoActions';
import { ellipsisText } from '../../utils/string';

export interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = (props) => {
  const { photo } = props;
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() =>
        navigation.navigate('PhotoDetail', {
          photoId: photo.id,
        })
      }
    >
      <View style={style.thumbnail}>
        <Image
          style={{ flex: 1, borderRadius: 32 }}
          resizeMethod='resize'
          source={{ uri: photo.thumbnailUrl }}
        />
      </View>
      <Text style={style.title}>{ellipsisText(photo.title, 32)}</Text>
    </TouchableOpacity>
  );
};

PhotoItem.defaultProps = {};

export default PhotoItem;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  thumbnail: {
    height: 64,
    width: 64,
    marginRight: 16,
  },
  title: {
    fontFamily: 'BeVietnam_500Medium',
  },
});
