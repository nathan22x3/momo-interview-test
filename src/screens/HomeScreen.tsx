import React, { useCallback, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PhotoItem from '../components/photos/PhotoItem';
import TextInput from '../components/shared/TextInput';
import { AppState } from '../store';
import { getPhotos, Photo } from '../store/photo/photoActions';
import { debounce } from 'lodash';
import Button from '../components/shared/Button';
import { logout } from '../store/user/userActions';

const { width } = Dimensions.get('window');

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: AppState) => state.photo);

  const renderItem = useCallback(
    ({ item }: { item: Photo }) => <PhotoItem photo={item} />,
    []
  );
  const keyExtractor = useCallback((item: Photo) => `${item.id}`, []);

  const searchPhoto = (searchText: string) => {
    dispatch(getPhotos(searchText));
  };

  const handleSearchPhoto = useCallback(debounce(searchPhoto, 700), []);

  useEffect(() => {
    dispatch(getPhotos());
  }, []);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.heading}>Photo List</Text>
        <Button style={style.logoutButton} onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </View>
      <TextInput
        placeholder='Search photo...'
        onChangeText={handleSearchPhoto}
      />
      <View style={style.photoList}>
        {items.length ? (
          <FlatList data={items} {...{ renderItem, keyExtractor }} />
        ) : (
          <Text style={style.noDataText}>Nothing to see here...</Text>
        )}
      </View>
    </View>
  );
};

HomeScreen.defaultProps = {};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    marginBottom: 20,
    fontFamily: 'BeVietnam_600SemiBold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  logoutButton: {
    width: 100,
  },
  photoList: {
    flex: 1,
    width,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  noDataText: {
    fontFamily: 'BeVietnam_500Medium',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
