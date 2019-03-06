import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../config/colors";
import strings from "../config/strings";

interface State {
  email: string;
  password: string;
}

class LoginScreen extends React.Component<{}, State> {

  // Create a React ref for storing the FormTextInput reference
  passwordInputRef = React.createRef<FormTextInput>();

  readonly state: State = {
    email: "",
    password: ""
  };

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  // When the "next" button is pressed, focus switches to the password input.
  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            placeholder={strings.EMAIL_PLACEHOLDER}
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <FormTextInput
            ref={this.passwordInputRef}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;