import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Linking,
  Platform,
  IntentLauncherAndroid,
  Button,
  Image,
  CameraRoll,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  cameraRef = React.createRef();

  state = {
    hasCameraPermission: null,
  };

  componentDidMount() {
    this.updateCameraPermission();
  }

  updateCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleTakePhoto = async () => {
    if (!this.cameraRef.current) {
      return;
    }
    const result = await this.cameraRef.current.takePictureAsync();
    console.log({ result });
  };

  renderCameraView() {
    const { hasCameraPermission, type } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera.</Text>
        </View>
      );
    }
    return (
      <View>
        <Camera
          style={styles.cameraView}
          type={Camera.Constants.Type.back}
          ref={this.cameraRef}>
          <Button title="Take photo" onPress={this.handleTakePhoto} />
        </Camera>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraContainer}>{this.renderCameraView()}</View>
      </SafeAreaView>
    );
  }
}

const containerStyle = {
  padding: 10,
  borderRadius: 5,
  margin: 10,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  cameraContainer: {
    ...containerStyle,
    backgroundColor: '#DDF',
  },
  cameraView: {
    aspectRatio: 1.33,
    width: '100%',
  },
});
