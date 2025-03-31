import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from '../styles/styles';

const ContactUs = () => {
    const handleCall = () => {
        Linking.openURL('tel:+6394567890');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:support@vintage.com');
    };

    return (
        <ScrollView style={styles.contactContainer}>
            <View style={styles.homeContainer}>
                <Text style={styles.welcomeTitle}>Contact Us</Text>
                <Text style={styles.contactInfoText}>
                    We would love to hear from you. Reach out to us anytime!
                </Text>

                {/* Contact Details */}
                <View style={styles.contactDetailsContainer}>
                    <View style={styles.contactRow}>
                        <Text style={styles.label}>Phone:</Text>
                        <TouchableOpacity onPress={handleCall}>
                            <Text style={styles.contactDetail}>+6394567890</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.label}>Email:</Text>
                        <TouchableOpacity onPress={handleEmail}>
                            <Text style={styles.contactDetail}>support@vintage.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.contactDetail}>334 San St, Buras, Philippines</Text>
                    </View>
                </View>

                {/* Social Media */}
                <View style={styles.socialMediaContainer}>
                    <Text style={styles.label}>Follow us on social media:</Text>
                    <View style={styles.socialIcons}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
                            <AntDesign name="facebook-square" size={35} color="#3b5998" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
                            <AntDesign name="instagram" size={35} color="#E4405F" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ContactUs;
