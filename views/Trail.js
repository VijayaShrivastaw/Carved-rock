import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {
    StyleSheet,
    FlatList,
    Image,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

const TrailItem = ({ navigation,author, title, id, image }) => (
    
    <View style={styles.item}>
        <TouchableOpacity   
        onPress={() => navigation.navigate(
            "TrailDetail",{id:id}
           
   )}

        >
        <Text
            style={styles.title}  >
            {title}
        </Text>
        </TouchableOpacity>
     
        <Image style={styles.trailImage} source={{ uri: image }} />
        <Text style={styles.author}>By {author}</Text>
    </View>
);

const Trail = ({navigation,props}) => {
    
 
    const [remoteData, setRemoteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = async () => {
       
        try {
            const {
                data: reviews
            } = await axios.get('http://192.168.1.31:3000/trailreviews');
            setRemoteData(reviews);
        } catch (err) {
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
            navigation.navigate('Home')
        }
    });

    return (
        <GestureDetector gesture={longPressGesture}>
            <View style={styles.container}>
                <Header />
                <View style={styles.reviewTitleRow}>
                    <Text style={styles.reviewTitle}>Trail Review</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size='large' />
                ) : (
                    <FlatList
                        data={remoteData}
                        renderItem={({ item }) => <TrailItem {...item}  navigation = {navigation} />}
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
        flex: 1
    },
    item: {
        flex: 1,
        borderBottomWidth: 1
    },
    trailImage: {
        height: 200,
        width: 500,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 22,
        color: '#000000',
        fontFamily: 'OpenSans-Bold',
        alignSelf: 'center',
        paddingTop: 10
    },
    author: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'OpenSans-Italic',
        alignSelf: 'flex-end',
        paddingRight: 10,
        paddingBottom: 10
    },
    reviewTitleRow: {
        backgroundColor: '#000000',
        paddingTop: 10,
        marginTop: 5
    },
    reviewTitle: {
        fontFamily: 'OpenSans-BoldItalic',
        fontSize: 30,
        color: '#FFFFFF'
    },
    message: {
        alignSelf: 'center',
        fontFamily: 'OpenSans-BoldItalic',
        color: '#000000'
    }
});

export default Trail;