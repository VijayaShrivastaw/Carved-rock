import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { StyleSheet, FlatList , View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShopItem from '../components/ShopItem';

const KayakShop = ({navigation,props}) => {
    console.log(props)
    const [remoteData, setRemoteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = async () => {
        try {
            const { data: kayaks } = await  axios.get('http://192.168.1.72:3000/products?category=Kayak');
            setRemoteData(kayaks);
        } catch(err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };    
    
    useEffect(() => {
        getData();
    }, []);

    const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
        if (success) {
            navigation.navigate('Home');
        }
    });

    return (
        <GestureDetector gesture={longPressGesture}>
        <View style={styles.container}>
            
            <Header />
            <View style={styles.storeTitleRow}>
                <Text style={styles.storeTitle}>Shop Kayaks</Text>
            </View>

            {loading ? (
                <ActivityIndicator size='large'/>
            ) : (
                <FlatList
                    data={remoteData}
                    renderItem={({ item }) => <ShopItem {...item} />}
                    keyExtractor={item => item.id}
                />
            )}
            <Text style={styles.message}>LONGPRESS TO GO BACK</Text>
        </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2737e8'
    },
    storeTitleRow: {
        backgroundColor: '#000000',
        paddingTop: 10,
        marginTop: 5,
        alignItems: 'center'
    },
    storeTitle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        color: '#FFFFFF'
    },
    message: {
        alignSelf: 'center',
        fontFamily: 'OpenSans-BoldItalic',
        color: '#000000'    
    }
});
  
export default KayakShop;