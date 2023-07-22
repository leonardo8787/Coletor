import { StyleSheet } from 'react-native';
import { Theme, Colors } from '../../constants/setting';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  floatButton: {
    position: 'absolute',
    backgroundColor: Colors[Theme][0],
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical:5,
    top: 40,
    left: 0,
  }
});

export const customMapStyle = [
  // {
  //   "featureType": "landscape.man_made",
  //   "elementType": "labels.icon",
  //   "stylers": [
  //     {
  //       "visibility": "off"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "poi.attraction",
  //   "elementType": "labels.icon",
  //   "stylers": [
  //     {
  //       "visibility": "off"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "poi.business",
  //   "elementType": "labels.icon",
  //   "stylers": [
  //     {
  //       "visibility": "off"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "poi.business",
  //   "elementType": "labels.text",
  //   "stylers": [
  //     {
  //       "visibility": "off"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "poi.government",
  //   "elementType": "labels.icon",
  //   "stylers": [
  //     {
  //       "visibility": "off"
  //     }
  //   ]
  // },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]