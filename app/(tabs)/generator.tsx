import * as Print from 'expo-print';

import { Button, Platform, StyleSheet, Text, View } from 'react-native';

import { shareAsync } from 'expo-sharing';
import { useState } from 'react';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
      <br />
      <form >
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="tel" placeholder="Phone" />
      <input type="text" placeholder="Address" />
      <input type="text" placeholder="City" />
      <input type="text" placeholder="State/Province" />
      <input type="text" placeholder="Postal Code" />
      <input type="text" placeholder="Country" />
      <input type="submit" value="Submit" />
      
      </form>
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function Generator() {
  const [selectedPrinter, setSelectedPrinter] = useState<Print.Printer | null>(null);

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    /* @info */ await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    }); /* @end */
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    /* @info */ const { uri } = await Print.printToFileAsync({ html }); /* @end */
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    /* @info */ const printer = await Print.selectPrinterAsync(); // iOS only
    /* @end */
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
