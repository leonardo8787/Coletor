import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
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