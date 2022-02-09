import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, FlatList, Image, ActivityIndicator, TouchableHighlight, Animated } from 'react-native';

{/* Fot the Icons */}
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

{/* For Start in the Rating */}
import Stars from 'react-native-stars';

{/* For the swipeing options */}
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { getBusiness } from '../Backend/api'

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await getBusiness()
      setData(response.data.businesses);
      setIsLoading(false)
      console.log(response.data.businesses);
      console.log
    } catch (error) {
      console.log(error);
      alert("ERROR!!!")
    }
  }

  const excludeColumns = ["id", "name"];
  const filterData = (value) => {
    const lowerCasedValue = value.toLowerCase().trim();
    if(lowerCasedValue === "") {
      setData(data);
    }
    else {
      const filteredData = data.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowerCasedValue)
        );
      });
      setData(filteredData);
    }
  }

  const handleChange = value => {
    filterData(value);
  }

  {/* For the swipeable */}
  const rightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.swipeableView}>
        <Animated.Text style={styles.swipeableText}>Left Action</Animated.Text>
      </View>
    )
  }

  return (
  <>
  {isLoading ? (
    <ActivityIndicator animating='true' size='large' color='#ff9980' />
  ) : (
    <SafeAreaView style={styles.container}>
      {/* This is the Search Bar */}
      <View style={styles.searchViewStyle}>
        <AntDesign name="search1" size={30} color="black" style={styles.searchIconStyle}/>
        <TextInput placeholder='Search' onChange={e => handleChange(e.target.value)} style={styles.searchTextStyle}/>
      </View>

      {/* This is the list */}
      <View>
        <FlatList 
          data={data}
          renderItem={({item}) => 
            <Swipeable renderRightActions={rightAction}>
              <View style={styles.listItem}>
                <Image source={{ uri: item.image_url }} style={styles.profileImage} />
                <View style={styles.detailsView}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.ratingAndReviews}>
                    <Stars
                      display={item.rating}
                      spacing={8}
                      count={5}
                      half={true}
                      fullStar={<AntDesign name='star' size={18} style={styles.myStarStyle}/>}
                      halfStar={<Icon name={'star-half'} style={styles.myStarStyle}/>}
                      emptyStar={<AntDesign name='staro' size={18} style={styles.myEmptyStarStyle}/>}
                    />
                    <Text style={styles.reviewCount}>{item.review_count}</Text>
                  </View>

                  {/* The flatlist for the categories */}
                  <FlatList 
                    horizontal
                    scrollEnabled={false}
                    data={item.categories}
                    renderItem={({item}) => 
                      <View>
                        <View style={styles.categoriesView}>
                          <Text style={styles.categoriesTitleText}>{item.title}</Text>
                        </View>
                      </View>
                    }
                    keyExtractor={item => item.alias}
                  />

                  {/* The flatlist for the Transactions */}
                  <FlatList 
                    horizontal
                    scrollEnabled={false}
                    data={item.transactions}
                    renderItem={({item}) =>   
                      <View>
                        <Text style={styles.transactionsText}>{item}</Text>
                      </View>
                    }
                  />
                </View>
              </View>
            </Swipeable>
          }
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
  }
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15
  },
  searchViewStyle:{
    flex: 1,
    flexDirection: 'row',
    height: 20,
    backgroundColor: "#8c8c8c60",
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 25,
  },
  searchIconStyle: {
    margin: 3, 
    paddingRight: 15
  },
  searchTextStyle : {
    width: '80%'
  },
  listItem:{
    flex:1,
    flexDirection:"row",
    backgroundColor: '#ff998055',
    height: 150,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    marginLeft: 8,
    marginVertical: 3,
    shadowColor: '#4d0f00',
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowRadius: 3
  },
  profileImage: {
    resizeMethod: 'scale',
    width: '35%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  detailsView: {
    flex: 1, 
    paddingLeft: 15, 
    paddingTop: 7
  },
  name: {
    fontFamily: 'cursive', 
    fontSize: 20, 
    fontWeight: 'bolder', 
    letterSpacing: -1
  },
  ratingAndReviews: {
    flexDirection: 'row', 
    alignContent: 'center', 
    paddingTop: 3, 
    marginBottom: 5
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
    fontWeight: 'bold'
  },
  categoriesView: {
    opacity:0.7, 
    marginRight: 3, 
    backgroundColor: '#8c8c8c60',
    borderRadius: 7, 
    flexWrap: 'wrap', 
    width: 70
  },
  categoriesTitleText: {
    fontFamily: 'sans-serif', 
    fontSize: 9, 
    fontWeight: '900',
    textAlign: 'center', 
    padding: 3
  },
  transactionsText: {
    fontFamily: 'sans-serif', 
    fontSize: 15, 
    paddingRight: 10, 
    paddingTop: 10, 
    paddingBottom: 5
  },
  swipeableView: {
    backgroundColor: '#ff9980', 
    justifyContent: 'center', 
    marginVertical: 3,
    shadowColor: '#4d0f00',
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowRadius: 3
  },
  swipeableText: {
    color: 'white', 
    paddingHorizontal: 40, 
    fontWeight: 600
  },
});