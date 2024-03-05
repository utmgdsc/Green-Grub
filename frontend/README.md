# Green-Grub Frontend

# Requirements
You need
- Android Studio / XCode for phone emulators or to connect your own phone
- NodeJS (v20 LTS)
- (Reactotron)[https://github.com/infinitered/reactotron/releases/tag/reactotron-app%403.7.0] for debugging

# Setup
NPM will install all the JavaScript packages that you will need.
```bash
npm install
```

Setup your virtual devices or connect your own device.
- For Android, you can either setup an AVD (virtual device) through Android Studio or follow the [Android Developers Guide](https://developer.android.com/studio/run/device) to set it up on your physical phone
- For iPhone, you can set up an emulator through XCode or figure it out yourself and put a working link in this doc. Thank u

# Running the App

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the frontend folder:

```bash
# using npm
npm run start
```

Wait until Metro has started up.

## Step 2: Start your Application

Press _a_ for Android or _i_ for iOS, like metro shows on the command line to bundle the application
for your phone and start it up on a connected device.

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_
or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

# Troubleshooting

If you can't get this to work, post on Discord or see the
[React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
