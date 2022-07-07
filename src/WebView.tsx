import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {RouteProp} from '@react-navigation/native';
interface Props {
  route: RouteProp<{params: {url: string}}, 'params'>;
}
let url: string;
export default class WebView extends Component<Props> {
  render() {
    url = this.props.route.params && this.props.route.params.url;
    return (
      <View>
        <Text>{url}</Text>
      </View>
    );
  }
}
