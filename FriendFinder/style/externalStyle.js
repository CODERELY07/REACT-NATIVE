import { StyleSheet} from 'react-native'

const externalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center', 
  },
  img: {
    width: '120%', 
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginTop: -25,
    marginBottom: 30,
  },
  highlight: {
    color: '#00A8E8',
  },
  button: {
    backgroundColor: '#00A8E8', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  big: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  para: {
    color: '#717070',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 26,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeCircle: {
    backgroundColor: '#00A8E8',
  },
  inactiveCircle: {
    backgroundColor: '#B0B0B0',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom:10
  },
  subHeaderText: {
    color: "#717070",
    fontWeight: "400",
    fontSize: 12,
  },
  locationBox: {
    marginTop: 24,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: 230,
    marginRight: 10,
  },
  link:{
    top:160,
    position:'absolute',
  }
});

export default externalStyles;

