import { StyleSheet ,Dimensions} from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

      container: {
    flex: 1,
    backgroundColor: '#FFEEAD',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingHorizontal: '5%',
    alignItems: 'center',
    height: 200,
  },
  centerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  logoStyle: {
    width: width * 0.2,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  learnButton: {
    backgroundColor: '#8E1A1A',
    padding: 8,
    paddingHorizontal:10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.64,
    marginTop: 10,
  },
  bgImg: {
    flex: 1,
    width: width * 1.1,
    right: width * -0.04,
    zIndex: -1,
    height: height * 0.67,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -40,
  },
  ceterText: {
    textAlign: 'center',
    paddingVertical: 20,
    marginTop: 0,
    paddingBottom:70,
    paddingHorizontal: 60,
    marginBottom: 10,
  },
  imageContainer: {
    width: 180,
  },
  homeImage: {
    height:470,
    width: '100%',
    marginTop:-150,
  },
  ImageParentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  imageLabel: {
    position: 'absolute',
    bottom: 80,
    color: '#86469C',
    fontSize: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    gap:10,
    paddingHorizontal: 20,
  },
  search: {
    flex: 1,
    paddingBottom: 5,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    height: 35,
  },
  

    
  });
  
  export default styles;