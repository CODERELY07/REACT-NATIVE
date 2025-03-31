import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 90,
        padding: 20,
        width: "70%",
        marginHorizontal: "auto",
    },
    homeContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
        color: "#000",
    },
    label: {
        color: 'rgba(0,0,0,.5)',
    },
    textInput: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#FF6B6B",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    loginButton: {
        backgroundColor: "#FF6B6B",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    forgotPasswordText: {
        textDecorationLine: "underline",
        marginBottom: 20,
        textAlign: "center",
        color: 'rgba(0,0,0,.5)',
    },
    searchBar: {
        height: 140,
        flexDirection: "row",
        marginBottom: -20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical:12,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 4,
        backgroundColor: "#fff",
    },
    cartIcon: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
    },
    contactContainer: {
        backgroundColor: "#fff",
    },
    contactInfoText: {
        marginBottom: 20,
        textAlign: "center",
        color: "#000",
    },
    contactRow: {
        flexDirection: "row",
        marginBottom: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.2)",
    },
    contactDetail: {
        flex: 1,
        lineHeight: 60,
        color: "#000",
    },
    heading: {
        fontWeight: "bold",
        
        fontSize: 42,
        fontStyle: "italic",
        color: "rgba(0,0,0,.8)",
    },
    subTitle: {
        marginTop: 8,
        width: "70%",
        fontSize: 12,
        color: "rgba(0,0,0,.5)",
    },
    scrollContainer: {
        marginTop: 70,
        marginBottom:50
    },
    itemContainer: {
        marginRight: 10,
    },
    itemImage: {
        width: '100%',
        height: 200,
    },
    imageContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    itemText: {
        textAlign: 'center',
        fontWeight: "bold",
        textDecorationLine: 'underline',
        marginTop: 20,
        color: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalImage: {
        width: '90%',
        height: '90%',
    },
    closeButton: {
        marginTop: -100,
        padding: 10,
        paddingHorizontal:20,
        backgroundColor: "#FF6B6B",
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    socialIcons: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    inputGroup: {
        marginBottom: 20,
    },
    image: {
        width: '85%',
        height: '83%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      image: {
        width: 200,
        height: 200,
        marginTop: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        width: '80%',
        paddingHorizontal: 10,
      },
      favoriteButton:{
        marginTop:-30,
        marginLeft:240
      },
      favoriteCountText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ff6347',
        marginTop: 5,
      }
      
});
