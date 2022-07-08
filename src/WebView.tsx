/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Linking} from 'react-native';
import {RouteProp} from '@react-navigation/native';
// import {WebView} from 'react-native-webview';
interface Props {
  route: RouteProp<{params: {url: string}}, 'params'>;
}
let url: string;
export default class WebViewComponent extends Component<Props> {
  componentDidMount() {
    url = this.props.route.params && this.props.route.params.url;
    Linking.openURL(url);
  }
  render() {
    return <></>;
    // <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
  }
}
