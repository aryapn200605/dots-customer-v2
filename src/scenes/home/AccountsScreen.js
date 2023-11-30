import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Appbar, Chip, Divider, Headline, List } from "react-native-paper";
import { SceneMap } from "react-native-tab-view";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { TabView } from "react-native-tab-view";
import { useToast } from "react-native-paper-toast";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { findAllSaving } from "../../api/SavingApi";
import { findAllLoan } from "../../api/LoanApi";
import { findAllDeposit } from "../../api/DepositApi";
import { APP_TYPE } from "@env"
import Color from "../../common/Color";
import LoadingOverlay from "../../components/common/LoadingOverlay";

const AccountsScreen = ({ navigation }) => {
  const { token, handleCheckToken } = useContext(AuthContext);

  const [index, setIndex] = useState(0);

  const toaster = useToast();
  const layout = useWindowDimensions();

  const [routes] = useState([
    { key: "savings", title: APP_TYPE == 1 ? "Simpanan" : "Tabungan" },
    { key: "loan", title: APP_TYPE == 1 ? "Pinjaman" : "Kredit" },
    { key: "deposit", title: APP_TYPE == 1 ? "Sim. Berjangka" : "Deposito" },
  ]);

  const renderSavingAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findAllSaving(token);
        setLoading(false);
        setData(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      handleCheckToken();
      fetchData();
    }, []);

    if (loading && !data) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    const renderSavingItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() => navigation.navigate("SavingDetail", { id: data.id })}
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
                icon="wallet"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderSavingItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateSavingAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan {APP_TYPE == 1 ? "Simpanan" : "Tabungan"} Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderLoanAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findAllLoan(token);
        setLoading(false);
        setData(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      handleCheckToken();
      fetchData();
    }, []);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    const renderLoanItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() => navigation.navigate("LoanDetail", { id: data.id })}
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
                icon="credit-card"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderLoanItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateLoanAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan {APP_TYPE == 1 ? "Pinjaman" : "Kredit"} Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderDepositAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findAllDeposit(token);
        setLoading(false);
        setData(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      handleCheckToken();
      fetchData();
    }, []);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    const renderDepositItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() =>
              navigation.navigate("DepositDetail", { id: data.id })
            }
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
                icon="cash"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderDepositItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateDepositAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan {APP_TYPE == 1 ? "Simpanan Berjangan" : "Deposito"} Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
              key={route.key}
            >
              {index === i && (
                <Chip
                  style={{ marginRight: 10 }}
                  textStyle={{ fontWeight: "bold", fontSize: 16 }}
                >
                  <Text>{route.title}</Text>
                </Chip>
              )}
              {index !== i && (
                <Text style={{ marginTop: 6, marginRight: 10, fontSize: 16 }}>
                  {route.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    savings: renderSavingAccountsList,
    loan: renderLoanAccountsList,
    deposit: renderDepositAccountsList,
  });

  return (
    <View style={styles.screen}>
      <Appbar.Header style={Color.primaryBackgroundColor}>
        <Appbar.Content
          style={styles.heading}
          title="Rekening Saya"
          titleStyle={{ color: "#EAEBF8", fontSize: 25 }}
        />
      </Appbar.Header>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    marginLeft: "5%",
    // paddingBottom: "2%",
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "8%",
    paddingRight: "8%",
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  box: {
    padding: 10,
  },
  listItem: {
    marginTop: 70,
  },
  createButtonContainer: {
    position: "absolute",
    top: 20,
    width: "100%",
    backgroundColor: "White",
    padding: 10,
  },
});

export default AccountsScreen;
