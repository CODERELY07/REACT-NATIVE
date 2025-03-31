import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const HeaderMenu = ({ navigation }) => {
  return (
    <View style={styles.headerMenu}>
      <View style={styles.inline}>
        <Image
          source={require("./assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>SWEET ALCHEMY</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.iconButton}
      >
        <Icon name="menu" size={30} color="rgba(242, 78, 30, 1)" />
      </TouchableOpacity>
    </View>
  );
};
function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="GetStarted"
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
      }}
    >
      <Drawer.Screen name="GetStarted" component={GetStartedScreen} />
      <Drawer.Screen name="Benefits" component={BenefitsScreen} />
      <Drawer.Screen
        name="LearnMore"
        component={LearnMoreScreen}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="MoreFlavors" component={MoreFlavorsScreen} />
    </Drawer.Navigator>
  );
}

function GetStartedScreen({ navigation }) {
  return (
    <View style={[styles.container, styles.creamColor]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu navigation={navigation} />
        <View style={styles.content}>
          <Text style={styles.title}>SWEET ALCHEMY</Text>
          <Text style={styles.subtitle}>A Mageical taste in every bite</Text>
          <Text style={styles.textContent}>
            Imagine biting into a cupcake that feels like a warm hug from a
            sunbeam. Each bite is a swirl of fluffy vanilla and rich chocolate,
            with hints of sweet berries dancing on your palate. extraordinary.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.highlightButton]}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.textCenter}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("LearnMore");
            }}
          >
            <Text style={styles.textCenter}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("./assets/images/firstscreen.png")}
          style={styles.fullImage}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}

function BenefitsBox({ image, title, description }) {
  return (
    <View style={styles.benifitsBox}>
      <Image style={styles.smallImage} source={image} />
      <Text style={styles.benefitsTitle}>{title}</Text>
      <Text style={[styles.description]}>{description}</Text>
    </View>
  );
}

function BenefitsScreen({ navigation }) {
  return (
    <View style={[styles.container, styles.creamColor]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu navigation={navigation} />
        <View style={styles.content}>
          <Text style={styles.title}>BENEFITS</Text>
          <Text style={styles.textContent}>
            Visit our cupcake website to explore delicious recipes, expert
            baking tips, and creative decorating ideas that will inspire your
            next baking adventure and connect you with a community of fellow
            cupcake lovers!
          </Text>
        </View>
        <View>
          <BenefitsBox
            title="Pure Joy and Celebration"
            image={require("./assets/images/firstICON.png")}
            description="Cupcakes offer endless possibilities for creativity"
          />
          <BenefitsBox
            title="Trends and Innovations"
            image={require("./assets/images/2ndicon.png")}
            description="Keep up with the latest cupcake trends and innovations in the baking world to inspire your own creations."
          />
          <BenefitsBox
            title="Decorating Ideas"
            image={require("./assets/images/3rdICON.png")}
            description="Explore inspiration for decorating cupcakes, from simple techniques to elaborate designs, making your treats visually stunning."
          />
        </View>
      </ScrollView>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, styles.creamColor]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu navigation={navigation} />
        <Image
          source={require("./assets/images/bluberrycupcake.png")}
          style={[
            styles.fullImage,
            { marginTop: -20, height: 220, width: "100%" },
          ]}
          resizeMode="cover"
        />
        <View>
          <Text style={[styles.title, { fontSize: 18 }]}>
            BLUEBERRY CUPCAKE{" "}
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 14 }}>Ingredients:</Text>
            <Text style={{ fontSize: 14 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>•</Text> For
              The Cupcakes:
            </Text>

            <View style={{ marginLeft: 20 }}>
              {[
                "1½ cups all-purpose flour",
                "1 tsp baking powder",
                "½ tsp baking soda",
                "½ tsp salt",
                "½ cup unsalted butter, softened",
                "1 cup granulated sugar",
                "2 large eggs",
                "1 tsp vanilla extract",
                "½ cup buttermilk (or milk with ½ tsp vinegar)",
                "1 ½ cups fresh or frozen blueberries",
              ].map((ingredient, index) => (
                <Text key={index} style={{ fontSize: 14, lineHeight: 17 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>• </Text>
                  {ingredient}
                </Text>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 14 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>•</Text> For
              The Frosting:
            </Text>
            <View style={{ marginLeft: 20 }}>
              {[
                "1 cup unsalted butter, softened",
                "4 cups powdered sugar",
                "2-3 tbsp milk",
                "1 tsp vanilla extract",
                "Optional: extra blueberries for decoration",
              ].map((ingredient, index) => (
                <Text key={index} style={{ fontSize: 14, lineHeight: 17 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>• </Text>
                  {ingredient}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.highlightButton, { marginTop: 10 }]}
            onPress={() => {
              navigation.navigate("MoreFlavors");
            }}
          >
            <Text style={[styles.textCenter, styles.boldText]}>Show More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function MoreFlavorsScreen({ navigation }) {
  return (
    <View style={[styles.learnMoreContainer, styles.creamColor]}>
      <View style={styles.container}>
        <HeaderMenu navigation={navigation} />
      </View>
      <View style={{ padding: 25, paddingTop: 70 }}>
        <Text
          style={[
            styles.title,
            { color: "rgba(242, 78, 30, 1)", fontSize: 20 },
          ]}
        >
          ALCHEMY RECIPE
        </Text>
        <Text style={[styles.title, { fontSize: 20 }]}>Available flavors</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: 280, marginRight: 20, paddingBottom: 70 }}>
            <Image
              source={require("./assets/images/cinnamontoast.png")}
              style={[
                styles.fullImage,
                { marginTop: -20, height: 212, width: "100%" },
              ]}
              resizeMode="cover"
            />
            <View style={{ paddingLeft: 10, paddingRight: 20 }}>
              <Text style={[styles.title, { fontSize: 14 }]}>
                Cinnamon Toast Cupcakes Ingredients
                {"\n"}
                For the Cupcakes:
              </Text>
              <View style={{ marginTop: 2 }}>
                <View style={{ marginLeft: 8 }}>
                  {[
                    "1½ cups all-purpose flour",
                    "1 tsp baking powder",
                    "½ tsp baking soda",
                    "½ tsp salt",
                    "1 tsp ground cinnamon",
                    "½ cup unsalted butter, softened",
                    "1 cup granulated sugar",
                    "2 large eggs",
                    "1 tsp vanilla extract",
                    "½ cup buttermilk (or milk with ½ tsp vinegar)",
                  ].map((ingredient, index) => (
                    <Text key={index} style={{ fontSize: 14, lineHeight: 18 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        •{" "}
                      </Text>
                      {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  For the Cinnamon Sugar Topping:
                </Text>
                <View style={{ marginLeft: 8, marginTop: 3 }}>
                  {[
                    "¼ cup granulated sugar",
                    "1 tsp ground cinnamon",
                    "2 tbsp melted butter (for brushing on top)",
                  ].map((ingredient, index) => (
                    <Text key={index} style={{ fontSize: 14, lineHeight: 17 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        •{" "}
                      </Text>
                      {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  For the Frosting (optional):
                </Text>
                <View style={{ marginLeft: 8, marginTop: 3 }}>
                  {[
                    "1 cup unsalted butter, softened",
                    "4 cups powdered sugar",
                    "2-3 tbsp milk",
                    "1 tsp vanilla extract",
                    "A sprinkle of cinnamon for decoration",
                  ].map((ingredient, index) => (
                    <Text key={index} style={{ fontSize: 14, lineHeight: 17 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        •{" "}
                      </Text>
                      {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: 280, marginRight: 20,paddingBottom: 70  }}>
            <Image
              source={require("./assets/images/bostoncream.png")}
              style={[
                styles.fullImage,
                { marginTop: -20, height: 212, width: "100%" },
              ]}
              resizeMode="cover"
            />
            <View style={{ paddingLeft: 10, paddingRight: 20 }}>
              <Text style={[styles.title, { fontSize: 14 }]}>
                Boston Cream Cupcakes Ingredients
                {"\n"}
                For the Cupcakes:
              </Text>
              <View style={{ marginTop: 2 }}>
                <View style={{ marginLeft: 8 }}>
                  {[
                    "1½ cups all-purpose flour",
                    "1 tsp baking powder",
                    "½ tsp baking soda",
                    "½ tsp salt",
                    "1 tsp ground cinnam",
                    "½ cup unsalted butter, softened",
                    "1 cup granulated sugar",
                    "2 large eggs",
                    "1 tsp vanilla extract",
                    "½ cup buttermilk (or milk with ½ tsp vinegar)",
                  ].map((ingredient, index) => (
                    <Text key={index} style={{ fontSize: 14, lineHeight: 18 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        •{" "}
                      </Text>
                      {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  For the Cinnamon Sugar Topping:
                </Text>
                <View style={{ marginLeft: 8, marginTop: 3 }}>
                  {[
                    "¼ cup granulated sugar",
                    "1 tablespoon ground cinnamon",
                    "2 tablespoons melted butter (for brushing)",
                  ].map((ingredient, index) => (
                    <Text key={index} style={{ fontSize: 14, lineHeight: 17 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        •{" "}
                      </Text>
                      {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: 280, marginRight: 20,paddingBottom: 70  }}>
            <Image
              source={require("./assets/images/cookiesncream.png")}
              style={[
                styles.fullImage,
                { marginTop: -20, height: 212, width: "100%" },
              ]}
              resizeMode="cover"
            />
            <View style={{ paddingRight: 20 }}>
              <Text style={[styles.title, { fontSize: 16 }]}>
                COOKIES N CREAM
              </Text>
              <Text style={[styles.title, { fontSize: 14, marginTop: 5 }]}>
                cookies n cream cupcake ingredients
                {"\n"}
              </Text>
              <View style={{ marginLeft: 20 }}>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.boldText}>Cupcake Batter:</Text>
                  <View style={{ marginLeft: 8 }}>
                    {[
                      "1½ cups all-purpose flour",
                      "1 tsp baking powder",
                      "½ tsp baking soda",
                      "½ tsp salt",
                      "1 tsp ground cinnam",
                      "½ cup unsalted butter, softened",
                      "1 cup granulated sugar",
                      "2 large eggs",
                      "1 tsp vanilla extract",
                      "½ cup buttermilk (or milk with ½ tsp vinegar)",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 18 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    For the Cinnamon Sugar Topping:
                  </Text>
                  <View style={{ marginLeft: 8, marginTop: 3 }}>
                    {[
                      "¼ cup granulated sugar",
                      "1 tablespoon ground cinnamon",
                      "2 tablespoons melted butter (for brushing)",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 17 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
        </View>
        </ScrollView> 
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{ width: 280, marginRight: 20,paddingBottom: 70  }}>
            <Image
              source={require("./assets/images/redvelvet.png")}
              style={[
                styles.fullImage,
                { marginTop: -20, height: 212, width: "100%" },
              ]}
              resizeMode="cover"
            />
            <View style={{ paddingRight: 20 }}>
              <Text style={[styles.title, { fontSize: 16 }]}>RED VELVET</Text>
              <Text style={[styles.title, { fontSize: 14, marginTop: 5 }]}>
                Red velvet cupcake ingredients
                {"\n"}
              </Text>
              <View style={{ marginLeft: 20 }}>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.boldText}>Cupcake Batter:</Text>
                  <View style={{ marginLeft: 8 }}>
                    {[
                      "All-purpose flour: 1 ½ cups",
                      "Granulated sugar: 1 cup",
                      "Baking powder: 1 teaspoon",
                      "Baking soda: ½ teaspoon",
                      "Salt: ½ teaspoon",
                      "Cocoa powder: 1 tablespoon",
                      "Vegetable oil: ½ cup",
                      "Buttermilk: ½ cup (or milk with vinegar)",
                      "Eggs: 2 large",
                      "Vanilla extract: 1 teaspoon",
                      "Red food coloring: 1-2 tablespoons (adjust to desired color)",
                      "White vinegar: 1 teaspoon",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 18 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Frosting:
                  </Text>
                  <View style={{ marginLeft: 8, marginTop: 3 }}>
                    {[
                      "Cream cheese: 8 oz (softened)",
                      "Unsalted butter: ½ cup (softened)",
                      "Powdered sugar: 3-4 cups",
                      "Vanilla extract: 1 teaspoon",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 17 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
           
          </View>
        </ScrollView>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{ width: 280, marginRight: 20,paddingBottom: 70  }}>
            <Image
              source={require("./assets/images/strawberrycupcake.png")}
              style={[
                styles.fullImage,
                { marginTop: -20, height: 212, width: "100%" },
              ]}
              resizeMode="cover"
            />
            <View style={{ paddingRight: 20 }}>
              <Text style={[styles.title, { fontSize: 16 }]}>STRAWBERRY</Text>
              <Text style={[styles.title, { fontSize: 14, marginTop: 5 }]}>
                Strawberry cupcake ingredients
                {"\n"}
              </Text>
              <View style={{ marginLeft: 20 }}>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.boldText}>Cupcake Batter:</Text>
                  <View style={{ marginLeft: 8 }}>
                    {[
                      "All-purpose flour: 1 ½ cups",
                      "Granulated sugar: 1 cup",
                      "Baking powder: 1 teaspoon",
                      "Salt: ½ teaspoon",
                      "Unsalted butter: ½ cup (softened)",
                      "Eggs: 2 large",
                      "Vanilla extract: 1 teaspoon",
                      "Fresh strawberries: 1 cup (pureed or chopped)",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 18 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Frosting:
                  </Text>
                  <View style={{ marginLeft: 8, marginTop: 3 }}>
                    {[
                      "Unsalted butter: ½ cup (softened)",
                      "Powdered sugar: 3-4 cups",
                      "Heavy cream: 2-4 tablespoons (for desired consistency)",
                      "Vanilla extract: 1 teaspoon",
                      "Fresh strawberries: ¼ cup (pureed or finely chopped for flavor)",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 17 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
               <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Optional:
                  </Text>
                  <View style={{ marginLeft: 8, marginTop: 3 }}>
                    {[
                      "Fresh strawberry slices: for garnish",
                    ].map((ingredient, index) => (
                      <Text
                        key={index}
                        style={{ fontSize: 14, lineHeight: 17 }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          •{" "}
                        </Text>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
           
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

function ContactScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu navigation={navigation} />
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: 20, marginTop: 20 }]}>
            <Text style={{ color: "rgba(242, 78, 30, 1)" }}>CONTACT US </Text>
            TO GET IN TOUCH
          </Text>
          <Text style={styles.textContent}>
            Indulge in the enchanting world of Sweet Alchemy, where every
            cupcake is a magical blend of flavors and textures. Crafted with
            love, our cupcakes transform simple ingredients into delightful
            creations that awaken your senses
          </Text>
        </View>
        <View style={styles.contactInputContainer}>
          <View style={styles.contactInput}>
            <TextInput
              style={styles.contactTextInput}
              placeholderTextColor="#fff"
              placeholder="NAME"
            />
          </View>
          <View style={styles.contactInput}>
            <TextInput
              style={styles.contactTextInput}
              placeholderTextColor="#fff"
              placeholder="EMAIL"
            />
          </View>
          <View style={[styles.contactInput, { height: 100 }]}>
            <TextInput
              style={styles.contactTextInput}
              placeholderTextColor="#fff"
              placeholder="MESSAGE"
            />
          </View>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.highlightButton, { marginTop: 25 }]}
            >
              <Text style={[styles.textCenter, styles.boldText]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
function LearnMoreScreen({ navigation }) {
  return (
    <View style={[styles.learnMoreContainer, styles.creamColor]}>
      <ScrollView style={{ padding: 20 }}>
        <HeaderMenu navigation={navigation} />
        <Image
          source={require("./assets/images/lastscreen.png")}
          style={[
            styles.fullImage,
            { marginTop: -20, height: 220, width: "100%" },
          ]}
          resizeMode="cover"
        />
      </ScrollView>
      <View style={styles.learnMoreContext}>
        <View style={styles.inline}>
          <Image
            source={require("./assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.boldText}>SWEET ALCHEMY</Text>
        </View>
        <Text style={styles.description}>
          At Sweet Alchemy, we believe that every cupcake tells a story. Our
          handcrafted treats blend quality ingredients and creative flavors to
          deliver a magical experience with every bite. Join our community of
          cupcake lovers and let the alchemy of flavor inspire your day!
        </Text>
        <View style={styles.inline}>
          <AntDesign name="copyright" size={18} color="black" />
          <Text>AlRights Reserved 2024</Text>
        </View>
        <Text>
          Contact Us
          {"\n"}sweetalchemy@gmail.com
          {"\n"}222-555-666
        </Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={DrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LearnMore"
          component={LearnMoreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreFlavors"
          component={MoreFlavorsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 240, 205, 1)",
    padding: 25,
  },
  headerMenu: {
    height: 120,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconButton: {
    zIndex: 1,
  },
  logo: {
    width: 35,
    height: 35,
  },
  logoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(210, 47, 39, 1)",
  },
  inline: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  content: {
    marginTop: -25,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    marginTop: -10,
  },
  textContent: {
    fontSize: 14,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 35,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    width: 130,
  },
  highlightButton: {
    backgroundColor: "rgba(244, 144, 12, 0.72)",
  },
  textCenter: {
    textAlign: "center",
  },
  fullImage: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  benifitsBox: {
    backgroundColor: "rgba(255, 191, 191, 1)",
    padding: 15,
    marginTop: 14,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    paddingVertical: 10,
    paddingBottom: 32,
    paddingHorizontal: 30,
  },
  smallImage: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  benefitsTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  learnMoreContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 240, 205, 1)",
  },
  learnMoreContext: {
    backgroundColor: "rgba(210, 47, 39, 0.45)",
    paddingVertical: 30,
    paddingHorizontal: 22,
    gap: 30,
    paddingBottom: 50,
  },
  boldText: {
    fontWeight: "bold",
  },
  contactInput: {
    borderWidth: 1,
    borderColor: "rgba(210, 47, 39, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(225, 45, 56, 0.67)",
  },
  contactInputContainer: {
    marginTop: 40,
  },
  contactTextInput: {
    color: "#fff",
    fontWeight: "bold",
  },
});
