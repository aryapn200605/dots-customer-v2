module.exports = {
  name: process.env.APP_NAME,
  slug: "dots-customer",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/img/logo-old.png",
  // icon: "./assets/app_icon/murni.png",
  userInterfaceStyle: "light",
  ios: {
    bundleIdentifier: "com.dots-customer." + process.env.APP_IDENTITY,
  },
  android: {
    package: "com.dots_customer." + process.env.APP_IDENTITY,
  },
  splash: {
    // image: "./assets/app_image/murni.png",
    image: "./assets/img/logo-old.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  extra: {
    eas: {
      projectId: "62275478-2261-4dfd-8c37-e3da4928756f"
    },
  },
};
