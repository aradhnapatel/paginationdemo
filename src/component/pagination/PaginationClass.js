/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class PaginationClass extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        data: [],
        page: 1,
        isLoading: false,
      };
    }
  }

  componentDidMount() {
    const apiUrl =
      'https://jsonplaceholder.typicode.com/posts?_limit=5&_page=' +
      this.state.page;
    fetch(apiUrl)
      .then(res => res.json())
      .then(resJson => {
        this.setState({data: resJson});
      });
  }

  handleMore = async () => {
    console.log('hello');
    await this.setState({page: this.state.page + 1, isLoading: true});
    const apiUrl =
      'https://jsonplaceholder.typicode.com/posts?_limit=5&_page=' +
      this.state.page;
    fetch(apiUrl)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          data: this.state.data.concat(resJson),
          isLoading: false,
        });
      });
  };

  renderFooter = () => {
    return (
      <>
        {this.state.isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : null}
      </>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> pagination_class_component </Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => {
            return (
              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.id}>{item.id}</Text>
                  <Text style={styles.boldText}>
                    Title: <Text style={styles.lightText}>{item.title}</Text>
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleMore}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  wrapper: {
    margin: 6,
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  id: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: 'bold',
  },

  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  lightText: {
    fontWeight: '500',
    fontSize: 15,
  },
});
