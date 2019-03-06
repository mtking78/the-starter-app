import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";
import colors from "../config/colors";

// We support all the TextInput props
type Props = TextInputProps & {
  error?: string;
};

class FormTextInput extends React.Component<Props> {

  // Create a React ref that will be used to store the TextInput reference
  textInputRef = React.createRef<TextInput>();

  // Expose a `focus` method that will allow us to focus the TextInput
  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    // We define our own custom style for the TextInput, but still want to allow the developer to also supply its own additional style if needed.  To do so, we extract the "style" prop from all the other props to prevent it to ovveride our own custom style.
    const { error, style, ...otherProps } = this.props;
    return (
      // Since we added a wrapper View, make it a reciever of the `style` prop and always pass the `style` prop to the outermost wrapper of the component.
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          // Add the externally specified style to our own custom style.
          style={[styles.textInput, style]}
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
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  errorText: {
    // Setting a fixed height prevents the label "jump" when we show/hide it.
    height: 20,
    color: colors.TORCH_RED
  }
});

export default FormTextInput;