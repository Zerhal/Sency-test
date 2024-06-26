import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { configure, startAssessment, startCustomWorkout, AssessmentTypes, startWorkoutProgram } from '@sency/react-native-smkit-ui-dev/src/index';
import * as SMWorkoutLibrary from '@sency/react-native-smkit-ui-dev/src/SMWorkout';

const SMKitUI = require('@sency/react-native-smkit-ui-dev/src/SMKitUIView');
const App: React.FC = () => {
  const [didConfig, setDidConfig] = useState<boolean>(false);

  const configureSMKitUI = async (): Promise<void> => {
    try {
      const res = await configure("YOUR_AUTH_KEY");
      console.log("DONE config");
      setDidConfig(true);
    } catch (e) {
      console.error(e);
    }
  }

  const startFitnessAssessment = async (): Promise<void> => {
    try {
      // Use SMWorkoutLibrary.AssessmentTypes instead of AssessmentTypes
      const result = await startAssessment(SMWorkoutLibrary.AssessmentTypes.Fitness);
      console.log(result.summary);
      console.log(result.didFinish);
    } catch (e) {
      console.error(e);
    }
  }
  

  const startSMKitUICustomWorkout = async (): Promise<void> => {
    try {
      const exercises: SMWorkoutLibrary.SMExercise[] = [
        new SMWorkoutLibrary.SMExercise(
          "First Exercise",
          35,
          5,
          null,
          null,
          [SMWorkoutLibrary.UIElement.RepsCounter, SMWorkoutLibrary.UIElement.Timer],
          "HighKnees",
          true,
          null,
          13,
          20,
          0.3
        ),
        new SMWorkoutLibrary.SMExercise(
          "Second Exercise",
          25,
          5,
          null,
          null,
          [SMWorkoutLibrary.UIElement.GaugeOfMotion, SMWorkoutLibrary.UIElement.Timer],
          "SquatRegularOverheadStatic",
          false,
          null,
          null,
          20,
          0.3
        ),
      ];
  
      const workout = new SMWorkoutLibrary.SMWorkout(
        "50",
        "demo workout",
        null,
        null,
        exercises,
        null,
        null,
        null
      );
      const result = await startCustomWorkout(workout);
      console.log(result.summary);
      console.log(result.didFinish);
    } catch (e) {
      console.error(e);
    }
  }

  const startSMKitUIProgram = async (): Promise<void> => {
    try {
      const config = new SMWorkoutLibrary.WorkoutConfig(
        3,
        SMWorkoutLibrary.BodyZone.FullBody,
        SMWorkoutLibrary.WorkoutDifficulty.HighDifficulty,
        SMWorkoutLibrary.WorkoutDuration.Short,
        "YOUR_PROGRAM_ID"
      );
      const result = await startWorkoutProgram(config);
      console.log(result.summary);
      console.log(result.didFinish);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.centeredView}>
      <SMKitUI />
      <Pressable
        style={styles.button}
        onPress={configureSMKitUI}>
        <Text style={styles.textStyle}>Configure</Text>
      </Pressable>
      {didConfig && (
        <View>
          <Pressable
            style={styles.button}
            onPress={startFitnessAssessment}>
            <Text style={styles.textStyle}>Start Assessment</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={startSMKitUICustomWorkout}>
            <Text style={styles.textStyle}>Start startCustomWorkout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sdk: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 10,
    elevation: 2,
    borderColor: "black",
    borderWidth: 1,
    margin: 5
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default App;