/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';
import FetchPost from './FetchPost';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
interface State {
  postData: any[];
  hasMore: boolean;
  isLoading: boolean;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

let totalPage = 0;
let currentPage = 0;

export default class FetchPostController extends Component<Props, State> {
  state: State = {
    postData: [],
    hasMore: false,
    isLoading: false,
  };
  getData = () => {
    this.setState({isLoading: true});
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`,
      )
      .then((response: any) => {
        totalPage = response.data.nbPages;
        this.setState({hasMore: currentPage < totalPage ? true : false});
        let tempData: any[] = [];
        tempData = response.data.hits;
        this.setState({
          postData: this.state.postData.concat(tempData),
          isLoading: false,
        });
        currentPage++;
        console.log('incremented currentPage:', currentPage);
      })
      .catch((error: any) => console.log(error));
  };

  openWebView = (url: string) => {
    this.props.navigation.navigate('WebView', {url});
  };

  filterPostData = (text: string) => {
    const filteredData = this.state.postData?.filter((item: any) => {
      if (
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        (item.url !== null &&
          item.url.toLowerCase().includes(text.toLowerCase())) ||
        item.author.toLowerCase().includes(text.toLowerCase()) ||
        item.objectID.toLowerCase().includes(text.toLowerCase())
      ) {
        return item;
      }
    });
    this.setState({postData: filteredData});
  };

  componentDidMount() {
    this.getData();
    // const interval = setInterval(() => {
    //   currentPage < totalPage && this.state.hasMore === true && this.getData();
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, 20000);
  }
  render() {
    return (
      <FetchPost
        postData={this.state.postData}
        hasMore={this.state.hasMore}
        isLoading={this.state.isLoading}
        getData={this.getData}
        filterPostData={this.filterPostData}
        openWebView={this.openWebView}
      />
    );
  }
}
