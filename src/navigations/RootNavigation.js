import React, { useState, useEffect, useContext } from "react";
import AppNavigation from "./AppNavigation";
import AuthenticationNavigation from "./AuthenticationNavigation";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { AuthContext } from "../providers/AuthenticationProvider";
import { useToast } from "react-native-paper-toast";
import * as SecureStore from "expo-secure-store";
import SplashScreenComponent from "../components/SplashScreenComponent";
import { findTenantByid } from "../api/tenant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PUBLIC_ID} from "@env"

const RootNavigation = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const { user, setUser, setTenant } = useContext(AuthContext);
  const toaster = useToast();

  const fetchData = async () => {
    try {
      console.log(PUBLIC_ID);
      const result = await findTenantByid(PUBLIC_ID);
      const data = result.data.data;
      await AsyncStorage.setItem('tenantName', data.name);   
    } catch (error) {
      console.error("Error fetching tenant data:", error);
    }
  };

  useEffect(async () => {
    fetchData()

    let data = await SecureStore.getItemAsync("authInfo");
    if (data !== null) {
      const u = JSON.parse(data);
      setUser(u.user, u.accessToken);
    }

    let tenantData = await SecureStore.getItemAsync("currentTenant");
    if (tenantData !== null) {
      const t = JSON.parse(tenantData);
      setTenant(t);
    }

    setLoadingUser(false);
  }, []);

  const isLoggedIn = !! user;
  return isLoggedIn ? <AppNavigation /> : <AuthenticationNavigation />;
};

export default RootNavigation;
