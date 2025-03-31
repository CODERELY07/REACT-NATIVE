import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './../styles';

function ContactUsScreen() {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>Contact Us</Text>
        <Text style={styles.descriptionText}>
          Have a question, suggestion, or feedback? We'd love to hear from you!
        </Text>
        <Text style={styles.getInTouchHeader}>Get in touch with us:</Text>
        <View style={styles.contactList}>
          <View style={styles.bulletPoint} />
          <Text style={styles.contactInfo}>Email: sorsogonexplorer@email.com</Text>
        </View>
        <View style={styles.contactList}>
          <View style={styles.bulletPoint} />
          <Text style={styles.contactInfo}>Facebook: facebook.com/sorsogonexplorer</Text>
        </View>
        <Text style={styles.footerText}>
          We'll do our best to respond to your message as soon as possible.
        </Text>
      </View>
    </ScrollView>
  );
}

export default ContactUsScreen;
