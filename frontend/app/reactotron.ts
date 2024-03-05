import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

export const reactotron = Reactotron.configure({
  host: 'localhost',
  port: 9090,
})
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    overlay: false, // just turning off overlay
  })
  .use(reactotronRedux())
  .connect();
