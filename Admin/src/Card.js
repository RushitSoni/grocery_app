import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native';

// import StarRating from './StarRating';

const deleteGrocery = (itemKey) => {

  console.log("i am in deleteGrocery")
  const db = firebase.database();
  const ref = db.ref(`Grocery/${itemKey}`); 

  ref
    .remove()
    .then(() => {
      console.log('Data deleted successfully.');
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
    });
};



const Card = ({itemData}) => {

  const navigation=useNavigation()

  // Define a function to delete data
  const handleDelete = () => {
    console.log("I am in Handle Delete")
    deleteGrocery(itemData.key);
  };

  return (
    <View  style={styles.container}>
    <TouchableOpacity    >
      <View style={styles.card} >
        <View >
          <Image
            source={{uri : itemData.imageData}}
            resizeMode="cover"
            style={styles.cardImg}
         
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.name}</Text>
          <Text style={styles.cardTitle}>{itemData.price}</Text>
          <Text style={styles.cardTitle}>{itemData.discount}</Text>
          {/* <StarRating ratings={itemData.ratings} reviews={itemData.reviews} /> */}
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.description}</Text>

          
        </View>
        
        <View>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate('EditGrocery',{
              data:itemData,
              id:itemData.key
            })

          }}>
              <Image source={require('../Images/edit.png')} style={styles.icon}></Image>
             
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{handleDelete()}}>
              <Image source={require('../Images/delete.png')} style={styles.icon} ></Image>
              
          </TouchableOpacity>
           
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({

  container:{
    flex:1
  },
  card: {
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    backgroundColor:'#fff',
    elevation:4,
    marginTop:10,
    borderRadius:10,
    height:100,
    marginBottom:10
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
   width:90,
   height:90,
   borderRadius:10,
   margin:5
  },
  cardInfo: {
    flex:2,
    padding: 10,
    backgroundColor: '#fff',
    
  },
  cardTitle: {
    fontWeight: 'bold',
    
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  icon:{
    width:24,
    height:24,
    margin:10

  }
});