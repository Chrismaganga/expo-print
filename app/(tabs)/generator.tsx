import * as Print from "expo-print";

import { Button, Platform, StyleSheet, Text, View } from "react-native";

import React from "react";
import { shareAsync } from "expo-sharing";
import { useState } from "react";

const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Curriculum Vitae</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
          }
          h1, h2 {
            text-align: center;
            color: #333;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
          .info {
            text-align: left;
          }
          .section {
            margin-top: 20px;
          }
          .section h2 {
            background: #007bff;
            color: white;
            padding: 10px;
            border-radius: 5px;
          }
          .section p, .section ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .experience-item {
            margin-bottom: 10px;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .skills span {
            background: #007bff;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
          }
          @media (max-width: 600px) {
            .header {
              flex-direction: column;
              text-align: center;
            }
            .header img {
              margin-top: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="info">
              <h1>John Doe</h1>
              <p>Email: john.doe@example.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Website: johndoe.com</p>
            </div>
            <img src="https://via.placeholder.com/100" alt="Profile Picture">
          </div>

          <div class="section">
            <h2>Profile</h2>
            <p>A highly motivated software engineer with 5+ years of experience in full-stack development.</p>
          </div>

          <div class="section">
            <h2>Work Experience</h2>
            <div class="experience-item">
              <p><strong>Software Engineer</strong> - Tech Company Inc. (2020 - Present)</p>
              <p>Developed and maintained high-performance applications using React and Node.js.</p>
            </div>
            <div class="experience-item">
              <p><strong>Frontend Developer</strong> - Web Solutions Ltd. (2017 - 2020)</p>
              <p>Worked on responsive web applications and optimized UI components.</p>
            </div>
          </div>

          <div class="section">
            <h2>Education</h2>
            <p><strong>Bachelor's in Computer Science</strong> - XYZ University (2013 - 2017)</p>
          </div>

          <div class="section">
            <h2>Skills</h2>
            <div class="skills">
              <span>JavaScript</span>
              <span>React Native</span>
              <span>Node.js</span>
              <span>CSS</span>
              <span>TypeScript</span>
              <span>MongoDB</span>
            </div>
          </div>

          <div class="section">
            <h2>Languages</h2>
            <p>English (Fluent), Spanish (Intermediate)</p>
          </div>

          <div class="section">
            <h2>References</h2>
            <p>Available upon request.</p>
          </div>
        </div>
      </body>
      </html>
    `;

export default function Generator() {
  const [selectedPrinter, setSelectedPrinter] = useState<Print.Printer | null>(null);

  const print = async () => {
    try {
      await Print.printAsync({
        html: htmlContent,
        printerUrl: selectedPrinter?.url, // Only used on iOS
      });
    } catch (error) {
      console.error("Print Error:", error);
    }
  };

  const printToFile = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      console.log("File saved to:", uri);
      await shareAsync(uri, { UTI: "application/pdf", mimeType: "application/pdf" });
    } catch (error) {
      console.error("Print to file error:", error);
    }
  };

  const selectPrinter = async () => {
    if (Platform.OS === "ios") {
      const printer = await Print.selectPrinterAsync();
      setSelectedPrinter(printer);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF" onPress={printToFile} />
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Select Printer" onPress={selectPrinter} />
          {selectedPrinter && <Text style={styles.printer}>Selected printer: {selectedPrinter.name}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  spacer: {
    height: 10,
  },
  printer: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});
