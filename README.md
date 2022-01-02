# Getting started

- Install expo-cli globally

```
    yarn global add expo-cli
```

- Install dependencies

```
    yarn install
```

The fastest way to get up and running is to use the Expo Go app on your iOS or Android device. Expo Go allows you to open up apps that are being served through Expo CLI.

```
    yarn start
```

When you run expo start (or npm start), Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app. It also pops up Expo Dev Tools, a graphical interface for Expo CLI.

# Opening the app on your phone/tablet 👨‍👩‍👧‍👧

- 🍎 On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.
- 🤖 On your Android device, press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.

# Technologies

- Firebase
- ContextAPI - For state management
- React Native Appearance
- Expo - Used Expo because I was developing on a Windows machine and testing on an iOS device therefore Expo Go came in Handy

# Notes

- The "Continue" button onPress method was ignored as it added one more unnecessary step to the user journey. Instead when the user selects a word from the list, the "Check answer" button shows and they can press it to check their answer and proceed.
