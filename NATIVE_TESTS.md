# Native storage regression

The web and Jest tests do not validate the Android/iOS storage implementation.
`.maestro/storage.yaml` checks quest persistence across two process restarts using
the real AsyncStorage package in an installed native build.

Build the **separate test application** using `APP_VARIANT=storage-test` throughout
prebuild/build (Android SDK or macOS/Xcode is required). For example, on a supported
Android development machine with a connected emulator/device:

```sh
npm ci
APP_VARIANT=storage-test npx expo run:android --variant release
maestro test .maestro/storage.yaml
```

For iOS, use `APP_VARIANT=storage-test npx expo run:ios --configuration Release`
on macOS/Xcode, then the same Maestro flow on its supported simulator.
The test ID is `com.orbitmentor.app.storagetest`; normal installations remain
`com.orbitmentor.app`. The flow clears **only the test application's** sandbox.
Never change the flow to the normal application ID on a user's device.

Expected: onboarding finishes, a quest is completed, and it remains completed
after each stop/launch. Record OS, device, SDK, build identifier, Maestro version,
video/log and result. This flow has been prepared but **has not run on a device**
in the cloud environment. Native permission, disk-full and process-termination
during-write scenarios still need device validation. Jest separately tests corrupt
payloads, unavailable reads, failed writes and serialized write ordering.

SDK 58 bundles for Android/iOS are only JavaScript/asset build checks, not APK/IPA
release builds or device results. The storage-test config does not change defaults
used by normal production builds.
