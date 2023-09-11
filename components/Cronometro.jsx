import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Cronometro = () => {
    const [time, setTime] = useState(0)
    const [timeInView, setTimeInView] = useState(0)
    const [timerIsActived, setTimeActived] = useState(false)
    const [beforeTimer, setBeforeTimer] = useState(0)


    function StartStopActionButton() {
        if (timerIsActived) {
            setTimeActived(false)
        } else {
            setTimeActived(true)
        }
    }

    function ResetTimerButton() {
        if (time) {
            setBeforeTimer(timeInView)
            setTime(0)
            setTimeInView(0)
        }
    }

    function StartButton() {
        return (
            <TouchableOpacity style={[styles.buttonStyle, { borderColor: '#e48613' }]} onPress={() => StartStopActionButton()}>
                <View style={styles.buttonSpace}>
                    <Text style={[styles.buttonText, { color: '#e48613' }]}>{timerIsActived ? "Pausar" : "Iniciar"}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function StopButton() {
        return (
            <TouchableOpacity style={[styles.buttonStyle, { borderColor: '#e48613' }]} onPress={() => ResetTimerButton()}>
                <View style={styles.buttonSpace}>
                    <Text style={[styles.buttonText, { color: '#e48613' }]}>Resetar</Text>
                </View>
            </TouchableOpacity>
        )

    }

    function IsConcatTime() {
        const horas = Math.floor(time / 3600);
        const minutos = Math.floor((time % 3600) / 60);
        const segundosRestantes = time % 60;

        setTimeInView(`${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes}`)
    }

    
    useEffect(() => {
        let interval
        if (timerIsActived) {
            interval = setInterval(() => {
                setTime(time + 1);
                IsConcatTime()
            }, 1000);
        } else if (timerIsActived && interval) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timerIsActived, time])


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/cronometro.png")} />


            <View style={styles.caixaTimer}>
                <Text style={styles.textoTimer}>{timeInView == 0 ? "00:00:00" : timeInView}</Text>
            </View>

            <View style={styles.butttons}>
                {StartButton()}
                {StopButton()}
            </View>

            {beforeTimer ? <Text style={styles.beforeTimerText}>Último tempo: {beforeTimer}</Text> : <></>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300
    },
    caixaTimer: {
        width: 200,
        height: "10%",
        marginTop: 20,
        marginBottom: 30,
        justifyContent: "center",
        backgroundColor: "#e48613",
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "black"
    },
    textoTimer: {
        textAlign: "center",
        fontSize: 20
    },
    butttons: {
        flexDirection: "row"
    },
    buttonStyle: {
        width: 180,
        height: 50,
        margin: 8,
        borderWidth: 2,
        borderColor: '#dd7b22',
        borderRadius: 25
    },
    buttonSpace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dd7b22'
    },
    beforeTimerText: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default Cronometro