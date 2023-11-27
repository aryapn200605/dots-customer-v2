import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Clipboard } from 'expo';

const CopyableText = ({ text }) => {
  const handleCopyText = async () => {
    await Clipboard.setString(text);
    // Beri umpan balik kepada pengguna jika perlu
  };

  return (
    <TouchableOpacity onPress={handleCopyText}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default CopyableText;
