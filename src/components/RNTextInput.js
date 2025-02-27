import PropTypes from 'prop-types';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {TextInput} from 'react-native';
import Animated from 'react-native-reanimated';
import _ from 'underscore';

const propTypes = {
    /** A ref to forward to the text input */
    forwardedRef: PropTypes.func,
};

const defaultProps = {
    forwardedRef: () => {},
};

// Convert the underlying TextInput into an Animated component so that we can take an animated ref and pass it to a worklet
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function RNTextInput(props) {
    return (
        <AnimatedTextInput
            allowFontScaling={false}
            textBreakStrategy="simple"
            ref={(ref) => {
                if (!_.isFunction(props.forwardedRef)) {
                    return;
                }
                props.forwardedRef(ref);
            }}
            // eslint-disable-next-line
            {...props}
        />
    );
}

RNTextInput.propTypes = propTypes;
RNTextInput.defaultProps = defaultProps;
RNTextInput.displayName = 'RNTextInput';

const RNTextInputWithRef = React.forwardRef((props, ref) => (
    <RNTextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        forwardedRef={ref}
    />
));

RNTextInputWithRef.displayName = 'RNTextInputWithRef';

export default RNTextInputWithRef;
