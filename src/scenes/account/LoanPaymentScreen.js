import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { Appbar, Caption, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { ScrollView } from "react-native-gesture-handler";
import { createPayment } from "../../api/LoanApi";

const LoanPayment = ({ navigation }) => {
  const { token, handleCheckToken } = useContext(AuthContext);

  const [amount, setAmount] = useState("Rp. ");
  const [isFocused, setIsFocused] = useState(false);
  const [rekeningPengirim, setRekeningPengirim] = useState("");
  const [disableButton, setDisableButton] = useState(false)

  const route = useRoute();

  handleCheckToken();

  const { selectedMethod = "Pilih Metode Pembayaran", parameter } =
    route.params || {};

  const handleTextInputFocus = () => {
    setIsFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (text) => {
    const cleanedText = text.replace(/[^\d]/g, "");
    if (cleanedText) {
      const numericValue = Number.parseInt(cleanedText, 10);
      if (!isNaN(numericValue)) {
        const formattedValue = "Rp. " + numericValue.toLocaleString();
        setAmount(formattedValue);
      }
    } else {
      setAmount("Rp. ");
    }
  };

  const handleRekeningPengirimChange = (text) => {
    setRekeningPengirim(text);
  };

  const handleSubmit = async () => {
    if (!amount) {
      Alert.alert("Error", "Kolom Jumlah Belum Di isi.");
    } else if (!rekeningPengirim) {
      Alert.alert("Error", "Kolom Rekening Pengirim Belum Di isi.");
    } else if (amount > 1000000000000) {
      Alert.alert(
        "Kesalahan",
        "Jumlah Pengajuan tidak boleh melebihi 1.000.000.000.000."
      );
    } else {
      Alert.alert("Konfirmasi", "Pastikan data yang anda masukan sudah benar", [
        {
          text: "Batal",
          onPress: () => "Transaksi dibatalkan",
          style: "cancel",
        },
        {
          text: "Ya",
          onPress: async () => {
            try {
              setDisableButton(true)
              createPayment(token, {
                loanId: parameter.norek,
                paymentMethodId: selectedMethod.id,
                amount: amount,
                recipient: rekeningPengirim,
              }).then((result) => {
                navigation.navigate("LoanDetail", { id: parameter.norek });
                Alert.alert(
                  "Sukses",
                  "Berhasil Mengajukan Setoran. Silahkan cek notifikasi secara berkala"
                );
              });
            } catch (error) {
              console.error("API Error:", error);
            }
          },
        },
      ]);
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Bayar Tagihan" />
      </Appbar.Header>

      <ScrollView>
        <View style={styles.box}>
          <Caption style={styles.text}>Metode Pembayaran</Caption>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputDisable}
              placeholder="Pilih Metode Pembayaran"
              editable={false}
              value={selectedMethod.title}
              readonly
            />
          </View>
          <Caption style={styles.text}>Nomor Rekening</Caption>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputDisable}
              placeholder="Pilih Metode Pembayaran"
              editable={false}
              value={
                selectedMethod.description
                  ? selectedMethod.description
                  : "No. Rekening Tidak Ada"
              }
              readonly
            />
          </View>
          <Caption style={styles.text}>Nama Rekening Pengirim</Caption>
          <TextInput
            style={styles.input}
            underlineColor="transparent"
            placeholderTextColor="#999999"
            onChangeText={handleRekeningPengirimChange}
            value={rekeningPengirim}
          />
          <Caption style={styles.text}>Jumlah</Caption>
          <TextInput
            style={styles.input}
            underlineColor=""
            placeholder={isFocused ? "Rp." : ""}
            placeholderTextColor="#999999"
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
            keyboardType="numeric"
            value={amount}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
            <Text disabled={disableButton} style={styles.buttonText}>SAYA SUDAH TRANSFER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
    padding: 20,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginTop: "2%",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#080808",
    borderRadius: 5,
    fontSize: 18,
  },
  inputDisable: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderWidth: 1,
    borderColor: "#080808",
    borderRadius: 5,
    fontSize: 18,
  },
  btn: {
    backgroundColor: Color.primaryBackgroundColor.backgroundColor,
    marginTop: 20,
  },
  btnSubmit: {
    color: "#ffffff",
  },
  box: {
    backgroundColor: "#ffffff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    borderColor: "#F5F8FB",
    backgroundColor: "transparent",
  },
  showPasswordIcon: {
    marginTop: 15,
  },
  text: {
    marginTop: 15,
  },
  tabunganContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginTop: 30,
    borderRadius: 5,
    textAlign: "center",
  },
  norekText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  tabunganText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  txt: {
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: Color.primaryBackgroundColor.backgroundColor,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoanPayment;
