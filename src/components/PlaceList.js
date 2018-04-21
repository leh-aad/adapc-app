import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  AppRegistry,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';
import PlaceItem from './PlaceItem';
var _ = require('lodash');

// async function requestLocationPermission() {
//   const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//   if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
//       alert("You've access for the location");
//   } else {
//       try {
//           const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//               {
//                   'title': 'Cool Location App required Location permission',
//                   'message': 'We required Location permission in order to get device location ' +
//                       'Please grant us.'
//               }
//           )
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//               alert("You've access for the location");
//           } else {
//               alert("You don't have access for the location");
//           }
//       } catch (err) {
//           alert(err)
//       }
//   }
// };

export default class PlaceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            pageToken: '',
            refreshing: false,
            siteTitle: ''
        };
    }

  componentDidMount() {
      this.fetchData();
  }


  fetchData = () => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const lat = Number(position.coords.latitude.toFixed(6));
              const long = Number(position.coords.longitude.toFixed(6));
              console.log(lat);
              console.log(long);
              const { pageToken }  = this.state;
              const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo`;
              const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo&pagetoken=${pageToken}`;

              let url = pageToken === '' ? urlFirst : urlNext;

              console.log(url);
              fetch(url)
                .then(res=>{
                   return res.json();
                })
                .then(res=>{
                  const arrayData = _.uniqBy( [...this.state.data, ...res.results] , 'id' );

                  this.setState({
                    title: 'Lugares',
                    data: pageToken === '' ? res.results : arrayData,
                    pageToken: res.next_page_token,
                    loading: false,
                    refreshing: false
                  });
                })
              .catch(error =>{
                console.log(error);
                this.setState({loading : false});
              });
          });
          console.log(this.state.data);
  }

  renderFlatList = () => {
    if(this.state.data){
      return(
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>{
  
              //const rating = item.rating ? item.rating : 'na'
              return (
                <PlaceItem item={item}/>
              )
            }}
          />
      )
    }
  }

  render() {
    return (
      <View> 
          {this.renderFlatList()}
      </View>
    );
  }
}