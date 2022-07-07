import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';

interface Props {
  postData: any[];
  hasMore: boolean;
  isLoading: boolean;
  getData: () => void;
  filterPostData: (text: string) => void;
  openWebView: (url: string) => void;
}
export default class FetchPost extends Component<Props> {
  render() {
    const {postData, hasMore, isLoading, getData, filterPostData, openWebView} =
      this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.searchInputView}>
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              placeholderTextColor="#bcbcbc"
              onChangeText={text => {
                filterPostData(text);
              }}
            />
          </View>
          <FlatList
            data={postData}
            renderItem={({item}: any) => (
              <View style={styles.postView}>
                <View style={styles.postDetails}>
                  <View style={styles.detailsView}>
                    <Text>Title: </Text>
                    <Text style={styles.detailstext}>{item?.title}</Text>
                  </View>
                  <View style={styles.detailsView}>
                    <Text>URL: </Text>
                    {item?.url === null ? (
                      <Text>NA</Text>
                    ) : (
                      <TouchableOpacity onPress={() => openWebView(item?.url)}>
                        <Text style={styles.detailsLinkText}>{item?.url}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.detailsView}>
                    <Text>Author: </Text>
                    <Text style={styles.detailstext}>{item?.author}</Text>
                  </View>
                </View>
                <View style={styles.postImage}>
                  <View style={styles.avatarView}>
                    <Image
                      source={require('../assets/img/user.png')}
                      style={styles.avatar}
                    />
                  </View>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (hasMore) {
                getData();
              }
            }}
          />
          {isLoading && (
            <View style={styles.activityIndiCatorView}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  activityIndiCatorView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  searchInputView: {
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#bcbcbc',
    width: '80%',
    borderRadius: 5,
    padding: 10,
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    justifyContent: 'center',
  },
  postView: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#bcbcbc',
    borderRadius: 7,
  },
  detailsView: {
    flexDirection: 'row',
  },
  postDetails: {
    width: '80%',
    justifyContent: 'center',
    padding: 10,
  },
  detailstext: {
    fontSize: 13,
  },
  postImage: {
    justifyContent: 'center',
  },
  avatarView: {
    padding: 5,
    height: 60,
    width: 60,
  },
  avatar: {
    height: '100%',
    width: '90%',
  },
  detailsLinkText: {
    color: '#2986cc',
  },
});
