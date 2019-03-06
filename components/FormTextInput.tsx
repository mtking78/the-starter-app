import * as React from "react";
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View
} from "react-native";
import colors from "../config/colors";

// We support all the TextInput props
type Props = TextInputProps & {
  error?: string;
};

interface State {
  isFocused: boolean;
}

class FormTextInput extends React.Component<Props> {

  // Create a React ref that will be used to store the TextInput reference
  textInputRef = React.createRef<TextInput>();

  readonly state: State = {
    isFocused: false
  };

  // Expose a `focus` method that will allow us to focus the TextInput
  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  handleFocus = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    this.setState({ isFocused: true });
    // Remember to propogate the `onFocus` event to the parent as well (if set.)
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    this.setState({ isFocused: false });
    // Remember to propogate the `onBlur` event to the parent as well (if set.)
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  render() {
    // We define our own custom style for the TextInput, but still want to allow the developer to also supply its own additional style if needed.  To do so, we extract the "style" prop from all the other props to prevent it to ovveride our own custom style.
    const {
      error,
      onFocus,
      onBlur,
      style,
      ...otherProps
    } = this.props;

    const { isFocused } = this.state;

    return (
      // Since we added a wrapper View, make it a reciever of the `style` prop and always pass the `style` prop to the outermost wrapper of the component.
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          underlineColorAndroid={
            isFocused
              ? colors.DODGER_BLUE
              : colors.LIGHT_GRAY
          }
          // Add the externally specified style to our own custom style.
          style={[styles.textInput, style]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          // ...and then spread all the other props
          {...otherProps}
        />
        <Text style={styles.errorText}>
          {error || ""}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  textInput: {
    height: 40,
    ...Platform.select({
      ios: {
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      // The underline on Android is slightly misaligned so we fix it by adding a left padding.
      android: {
        paddingLeft: 6
      }
    })
  },
  errorText: {
    // Setting a fixed height prevents the label "jump" when we show/hide it.
    height: 20,
    color: colors.TORCH_RED,
    ...Platform.select({
      android: {
        paddingLeft: 6
      }
    })
  }
});

export default FormTextInput;