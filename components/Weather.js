import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Forecast from './Forecast';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: {
                zipcode: '', main: '-', description: '-', temp: 0
            }
        }
    }

    fetchData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.zipCode},th&units=metric&APPID=6e22eda0422b463a1a0c4e624e7af0e2`)
            .then((response) => response.json())
            .then((json) => {
                this.setState(
                    {
                        forecast: {
                            main: json.weather[0].main,
                            description: json.weather[0].description,
                            temp: json.main.temp
                        }
                    });
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    componentDidMount = () => this.fetchData()

    componentDidUpdate = (prevProps) => {
        if (prevProps.zipCode !== this.props.zipCode) {
            this.fetchData()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../bg.jpeg')} style={styles.backdrop}>
                    <View style={styles.flexDir}>
                        <Text style={styles.text1}>Zip code is {this.props.zipCode}.</Text>
                        <Forecast {...this.state.forecast} />
                    </View>
                </ImageBackground>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: { paddingTop: 25 },
    backdrop: { width: '100%', height: '100%' },
    flexDir: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 360,
        backgroundColor: 'black',
        opacity: 0.5,

    },
    text1: { textAlign: 'center', fontSize: 25, color: 'white', opacity: 1, },
});




