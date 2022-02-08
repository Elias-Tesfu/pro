import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, FlatList, Image, ActivityIndicator, TouchableHighlight, Animated } from 'react-native';

{/* Fot the Icons */}
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

{/* For Start in the Rating */}
import Stars from 'react-native-stars';

{/* For the swipeing options */}
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';


import { getBusiness } from '../Backend/api'
import { version } from 'react/cjs/react.production.min';

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);
  
  const excludeColumns = ["id", "name"];


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

  const rightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={{ backgroundColor: 'blue', justifyContent: 'center' }}>
        <Animated.Text style={{ color: 'white', paddingHorizontal: 40, fontWeight: 600 }}>Left Action</Animated.Text>
      </View>
    )
  }

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

  return (
  <>
  {isLoading ? (
    <ActivityIndicator animating='true' size='large' color={'red'} />
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
                <View style={{ flex: 1, paddingLeft: 15, paddingTop: 10 }}>
                  <Text style={{ fontFamily: 'cursive', fontSize: 20, fontWeight: 'bolder', letterSpacing: -1, padding: -5 }}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignContent: 'center', paddingTop: 3, marginBottom: 5 }}>
                    <Stars
                      display={item.rating}
                      spacing={8}
                      count={5}
                      half={true}
                      fullStar={<AntDesign name='star' size={18} color="black" style={styles.myStarStyle}/>}
                      halfStar={<Icon name={'star-half'} style={styles.myStarStyle}/>}
                      emptyStar={<AntDesign name='staro' size={18} color="black" style={styles.myEmptyStarStyle}/>}
                    />
                    <Text style={{ paddingLeft: 10, fontFamily: 'cursive', fontWeight: 'bold' }}>{item.review_count}</Text>
                  </View>

                  <FlatList 
                    horizontal
                    scrollEnabled={false}
                    data={item.categories}
                    renderItem={({item}) => 
                      <View style={{ backgroundColor: 'dodgerblue' }}>
                        <View style={{ marginRight: 3, backgroundColor: '#8c8c8c', borderRadius: 7, flexWrap: 'wrap', width: 80 }}>
                          <Text style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: 0, fontWeight: 'bolder', textAlign: 'center', padding: 5 }}>{item.title}</Text>
                        </View>
                      </View>
                    }
                    keyExtractor={item => item.alias}
                  />

                  <FlatList 
                    horizontal
                    scrollEnabled={false}
                    data={item.transactions}
                    renderItem={({item}) =>   
                      <View>
                        <Text style={{ fontFamily: 'sans-serif', fontSize: 15, paddingRight: 10, paddingTop: 10 }}>{item}</Text>
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
    marginHorizontal: 3,
    marginVertical: 15
  },
  searchViewStyle:{
    flex: 1,
    flexDirection: 'row',
    height: 20,
    backgroundColor: "#8c8c8c60",
    marginTop: 5,
    marginBottom: 10,
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
    backgroundColor: 'red',
    height: 150,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 3
  },
  profileImage: {
    resizeMethod: 'scale',
    width: '35%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  myStarStyle: {
    color: '#ff531a',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
})