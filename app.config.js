module.exports = {
  name: process.env.APP_NAME,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/app_icon/" + process.env.APP_IDENTITY + ".png",
  userInterfaceStyle: "light",
  slug: "dots-customer",
  ios: {
    bundleIdentifier: "com.dots-customer." + process.env.APP_IDENTITY,
  },
  android: {
    package: "com.dots-customer." + process.env.APP_IDENTITY,
  },
  splash: {
    image: "./assets/app_image/" + process.env.APP_IDENTITY + ".png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  extra: {
    eas: {},
  },
};
