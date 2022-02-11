import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

{/* Fot the Icons */}
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

{/* For Start in the Rating */}
import Stars from 'react-native-stars';

const Details = ({ route }) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageBackgroundView}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.ratingAndReviews}>
          <Stars
            display={item.rating}
            spacing={8}
            count={5}
            half={true}
            fullStar={<AntDesign name='star' color={'white'} size={18} style={styles.myStarStyle}/>}
            halfStar={<Icon name={'star-half'} color={'white'} style={styles.myStarStyle}/>}
            emptyStar={<AntDesign name='staro'color={'white'} size={18} style={styles.myEmptyStarStyle}/>}
          />
          <Text style={styles.reviewCount}>{item.review_count} reviews</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundView: {
    width: '100%',
    height: '70%',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  nameText: {
    color: '#fff',
    fontFamily: 'fantasy',
    fontSize: 50,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    textShadowColor: 'black',
    textShadowOffset: { 
      width: 1,
      height: 1
     },
    textShadowRadius: 2
  },
  ratingAndReviews: {
    flexDirection: 'row', 
    alignContent: 'center', 
    paddingTop: 3, 
    marginBottom: 5,
    textShadowColor: 'black',
    textShadowOffset: { 
      width: 1,
      height: 1
     },
    textShadowRadius: 2
  },
  myStarStyle: {
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1, 
      height: 1
    },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { 
      width: 1,
      height: 1
     },
    textShadowRadius: 2
  },
  reviewCount: {
    paddingLeft: 10, 
    fontFamily: 'cursive', 
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { 
      width: 1,
      height: 1
     },
    textShadowRadius: 2
  },
});
