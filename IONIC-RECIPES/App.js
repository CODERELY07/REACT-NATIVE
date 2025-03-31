import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";

function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <ImageBackground
      source={require("./assets/Backgroundphoto.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.bigTitle, styles.colorWhite]}>Iconic Recipes</Text>
        <Text style={[styles.subTitle, styles.colorWhite]}>Try at Home</Text>
        <View style={styles.loginContainer}>
          <Text style={[styles.headText, styles.colorWhite]}>
            Welcome Back!
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <AntDesign name="user" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#fff"
              />
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesome6
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={[styles.small, styles.colorWhite]}>
                Forgot Password?
              </Text>
              <Text style={[styles.small, styles.colorWhite]}>
                Don't have an account?{" "}
                <Text style={styles.signupText}>Sign up</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function SignUpScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  return (
    <ImageBackground
      source={require("./assets/Backgroundphoto.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.bigTitle, styles.colorWhite]}>Sign Up</Text>
        <Text style={[styles.subTitle, styles.colorWhite]}>
          Create your account
        </Text>
        <View style={styles.signupContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <AntDesign name="user" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#fff"
              />
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
              />
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesome6
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                secureTextEntry={!confirmPasswordVisible}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                <FontAwesome6
                  name={confirmPasswordVisible ? "eye" : "eye-slash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={[styles.button, styles.signupButton]}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={[styles.button, styles.googleButton]}
            >
              <AntDesign name="googleplus" size={24} color="black" />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const ImageDetailScreen = ({ route, navigation }) => {
  const { title, image, description, recipes } = route.params;

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.header, { marginTop: -30 }]}>
        <Text style={[styles.headText, { fontSize: 20 }]}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageMain}>
        <Image source={image} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ marginTop: 30 }}></View>
      <Text style={styles.recipeTitle}>Recipe:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.recipes}>
          <Text style={styles.recipeText}>{recipes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const ImageScrollSection = ({
  title,
  images,
  descriptions,
  recipes,
  navigation,
}) => {
  return (
    <View style={styles.imageContainer}>
      <Text style={styles.imageTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ImageDetail", {
                title: title,
                image,
                description: descriptions[index],
                recipes: recipes[index],
              })
            }
          >
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

function HomeScreen({ navigation }) {
  const imageSets = [
    {
      title: "Timeless Taste Sensation",
      images: [
        require("./assets/Carbonara.jpg"),
        require("./assets/LumpiangShanghai.jpg"),
        require("./assets/Pork-Adobo.jpg"),
      ],
      descriptions: [
        "Carbonara: A delicious Snack.",
        "Lumpiang Shanghai: A popular spring roll.",
        "Pork Adobo: A savory pork dish.",
      ],
      recipes: [
        " To prepare Spaghetti alla Carbonara (serves 4), start by boiling a large pot of salted water and cooking 12 oz (340g) of spaghetti according to the package instructions until al dente, reserving about 1 cup of the pasta water before draining. In a large skillet, cook 4 oz (115g) of diced pancetta or guanciale over medium heat until crispy, about 5-7 minutes; if desired, add 2 whole peeled cloves of garlic for flavor and remove them before mixing with the pasta. In a bowl, whisk together 3 large eggs and 1 cup of grated Pecorino Romano or Parmesan cheese (or a mix of both) until smooth, seasoning with a good pinch of black pepper. Toss the hot, drained spaghetti with the pancetta in the skillet, allowing it to absorb the flavors, then remove the skillet from heat. Pour the egg and cheese mixture over the pasta, stirring quickly to create a creamy sauce, adding a bit of the reserved pasta water if needed to loosen it; be careful not to scramble the eggs, as the residual heat from the pasta will cook them. Finally, garnish with more cheese and black pepper, and serve immediately.",
        "To make Lumpia, begin by preparing the filling in a large bowl by combining 500g of ground pork (or beef or chicken) with 1 grated medium carrot, 1 finely chopped medium onion, 1/2 cup of finely chopped green onions, and 4 minced cloves of garlic, then add 1 egg, 1/2 cup of breadcrumbs, 1 tablespoon of soy sauce, 1 tablespoon of oyster sauce (optional), 1 teaspoon of salt, and 1/2 teaspoon of black pepper, mixing thoroughly until well incorporated. Next, carefully separate the lumpia wrappers and place one on a flat surface with a corner pointing toward you (diamond shape), then take about a tablespoon of the meat filling and spread it along one side of the wrapper near the bottom corner, fold the bottom corner over the filling, roll tightly halfway, fold the sides inward, and continue rolling until fully wrapped, sealing the edge by brushing it with water or beaten egg. Repeat this process until all the filling is used, then heat oil in a deep pan over medium heat; once the oil is hot enough, carefully place the lumpia in the pan, ensuring not to overcrowd it, and fry until the rolls are golden brown and crispy on all sides, about 3-5 minutes per batch. Finally, remove the cooked lumpia from the pan and let them drain on paper towels to remove excess oil, serving hot with sweet chili sauce or banana ketchup for dipping.",
        "To make Pork Adobo, start by marinating 1 kg of cubed pork belly or pork shoulder in a large bowl with 1/2 cup of soy sauce, half of a minced head of garlic, and whole peppercorns, letting it sit for at least 30 minutes (or overnight for better flavor). Next, heat 2 tablespoons of oil in a large pot or pan over medium heat, sauté the remaining minced garlic until fragrant, then add the marinated pork (discarding the marinade) and sear until browned on all sides; if using, add 1 chopped medium onion and cook until softened. Pour in the marinade along with 1/4 cup of vinegar, 3-4 bay leaves, and 1/2 cup of water, bringing the mixture to a boil without stirring, then lower the heat to a simmer, cover the pot, and let it cook for about 40 minutes to 1 hour until the pork is tender, stirring occasionally. If desired, stir in 1 tablespoon of brown sugar for a slightly sweet flavor and adjust the seasoning with salt, soy sauce, or more vinegar to taste. For an optional step, if adding potatoes, fry 2 medium potatoes separately until golden and incorporate them into the adobo during the last 10 minutes of cooking; alternatively, you can add 2 hard-boiled eggs in the last few minutes to absorb the flavor. If you prefer a thicker sauce, uncover the pot and let it simmer until reduced to your desired consistency, adding water if it becomes too dry. Finally, remove from heat, garnish with green onions if desired, and serve hot over steamed rice.",
      ],
    },
    {
      title: "Famous Foods",
      images: [
        require("./assets/mango-graham.jpg.jpeg"),
        require("./assets/Garlic-Butter-Shrimp.jpg"),
        require("./assets/halo-halo.jpg.jpeg"),
      ],
      descriptions: [
        "Mango Graham: A layered dessert with mango.",
        "Garlic Butter Shrimp: Shrimp cooked in garlic butter.",
        "Halo-halo: A delicious dessert.",
      ],
      recipes: [
        "1.To make Mango Graham Cake, start by preparing the cream mixture by combining 2 cups of chilled heavy cream or all-purpose cream with 1 can (300ml) of sweetened condensed milk in a mixing bowl, whisking until well blended (if you prefer a thicker cream, you can whip the cream first before adding the condensed milk). Next, in an 8x8 or similar square or rectangular dish, lay down a flat layer of Graham crackers, breaking pieces as needed to fit perfectly into the dish, then spread a generous amount of the cream mixture evenly over the Graham crackers. Arrange thinly sliced mangoes on top of the cream layer, and continue layering Graham crackers, cream, and mango slices until you reach the desired height (typically, 2-3 layers work best depending on the size of your dish). Once all layers are assembled, sprinkle 1/2 cup of crushed Graham crackers on top for added texture, then cover the dish with plastic wrap and refrigerate for at least 4 hours, or overnight for best results, allowing the Graham crackers to absorb moisture from the cream and become soft and cake-like. Finally, slice into squares and serve chilled.",
        "To make Garlic Butter Shrimp, start by rinsing 500g (1 lb) of peeled and deveined shrimp under cold water, patting them dry with a paper towel, and seasoning with a little salt, pepper, and optional paprika. Next, heat 1 tablespoon of olive oil and 2 tablespoons of unsalted butter in a large skillet over medium heat, then add the shrimp in a single layer and cook for about 2-3 minutes per side until they turn pink and opaque; remove from the pan and set aside. In the same skillet, add the remaining 1 tablespoon of butter, then add 4 minced cloves of garlic and 1 finely chopped small onion, cooking until fragrant and the onion becomes translucent (about 2-3 minutes). Return the shrimp to the skillet, toss to coat in the butter sauce, and cook for an additional minute, then add 1 tablespoon of lemon juice and a pinch of optional red chili flakes for heat. Finally, garnish with 1 tablespoon of chopped fresh parsley for a bright finish and serve immediately with rice, pasta, or crusty bread to soak up the delicious butter sauce.",
        "To make Halo-Halo, start by preparing the ingredients by shaving ice using an ice shaver or blender and keeping it in the freezer to maintain texture, ensuring that all sweetened ingredients (like bananas, jackfruit, beans, macapuno, nata de coco, and gulaman) are ready and chilled. In a tall glass, layer red nata de coco, green gulaman, and sweetened beans (red and white) at the bottom, followed by sweetened macapuno and kaong. Next, add pieces of sweetened banana and sweetened jackfruit (langka) above the base layer, then fill the glass with shaved ice until it reaches the top. Pour condensed milk and evaporated milk over the shaved ice for added sweetness and creaminess, then scoop ube ice cream on top, add a piece of leche flan, and sprinkle pinipig (toasted rice flakes) over everything for extra crunch. Finally, serve with a long spoon and enjoy!",
      ],
    },
    {
      title: "All time Favorites",
      images: [
        require("./assets/LecheFlan.jpg.jpeg"),
        require("./assets/spaghetti.jpg"),
        require("./assets/BeefSinigang.jpg"),
      ],
      descriptions: [
        "Leche Flan: A rich caramel custard.",
        "Spaghetti: A classic pasta dish.",
        "Beef Sinigang: A sour soup with beef.",
      ],
      recipes: [
        "",
        "To prepare Spaghetti with Hotdogs, start by boiling water in a large pot with a pinch of salt and a few drops of oil, then cook 500g of spaghetti noodles according to the package instructions, drain, and set aside. In a large pan, fry 200g of sliced hotdogs until they turn slightly brown, then remove and set aside. In the same pan, sauté 3 cloves of minced garlic and 1 medium chopped onion until translucent and fragrant, then add 1/2 kg of ground pork or beef, stirring until browned and fully cooked. Pour in 1 1/2 cups of tomato sauce, 1 cup of banana ketchup (or regular ketchup for a less sweet version), and 1/2 cup of tomato paste, mixing well, then add 1/4 cup of sugar (adjust to taste) and season with salt and pepper. Lower the heat and let the sauce simmer for about 10-15 minutes, stirring occasionally; if desired, add 1/2 cup of diced ham or sausages at this point. Mix in 1/2 cup of grated cheddar cheese until melted, then add the fried hotdogs back into the sauce and stir well. Finally, toss the cooked spaghetti noodles into the sauce until fully coated, serve on a plate, and garnish with extra grated cheese on top.",
        "To make Sinigang, start by boiling 1 lb of beef (stew cuts or short ribs) in a large pot with 8 cups of water until tender, about 1 to 1.5 hours, skimming off any impurities. In a separate pan, sauté 2 cloves of minced garlic, 1 quartered onion, and 2 quartered tomatoes in a bit of cooking oil until soft. Add the sautéed mixture to the pot with the beef, then incorporate 1 sliced radish (labanos) and cook for 5-7 minutes. Next, add 1 sliced medium-sized eggplant and 6-8 pieces of long green beans (cut into 2-inch pieces), simmering for another 5 minutes. Season the broth with 1 packet of tamarind soup mix (Sinigang mix) or 1/2 cup of fresh tamarind juice, stirring well and simmering for 5-10 minutes until the vegetables are cooked through. Adjust the sourness and saltiness with fish sauce or more Sinigang mix if needed. Finally, add 2-3 green chilies (siling pangsigang) and a bunch of water spinach (kangkong), simmering for another 2-3 minutes until the greens are wilted. Serve hot with steamed rice.",
      ],
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Text style={styles.logo}>Ionic Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity>
            <Text
              style={styles.menus}
              onPress={() => navigation.navigate("Home")}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Recipes")}>
            <Text style={styles.menus}>Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Text style={styles.menus}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Text style={styles.menus}>Contact Us</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text style={styles.headText}>Welcome!</Text>
        {imageSets.map((set, index) => (
          <ImageScrollSection
            key={index}
            title={set.title}
            images={set.images}
            descriptions={set.descriptions}
            navigation={navigation}
            recipes={set.recipes}
          />
        ))}
      </View>
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>About Us</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.aboutText}>
          At Iconic Recipes , we believe cooking should be simple, fun, and
          accessible to everyone. Our app is designed to provide you with
          easy-to-follow recipes that you can whip up at home with minimal fuss.
          Whether you're a busy professional, a student, or someone who loves to
          cook but doesn’t have hours to spare, we’ve got you covered. From
          quick weeknight dinners to delicious desserts, all our recipes are
          carefully curated to ensure they are convenient to make using everyday
          ingredients. With step-by-step instructions, cooking tips, and a focus
          on flavor, Iconic Recipes is here to help you create memorable meals
          effortlessly. Cooking at home has never been this easy or enjoyable.
          Welcome to Iconic Recipes, where great food meets simplicity!
        </Text>
        <TouchableOpacity style={[styles.button, styles.signupButton]}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function RecipesScreen({ navigation }) {
  const [showDescriptions, setShowDescriptions] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false,
    desserts: false,
    beverage: false,
  });

  const toggleDescription = (categ) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [categ]: !prev[categ],
    }));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>Recipes</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("breakfast")}>
          <Text style={styles.recipeTitle}>● Breakfast ▼</Text>
        </TouchableOpacity>
        {showDescriptions.breakfast && (
          <Text style={styles.recipeDescription}>▢ Lumpiang Shangai</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("lunch")}>
          <Text style={styles.recipeTitle}>● Lunch ▼</Text>
        </TouchableOpacity>
        {showDescriptions.lunch && (
          <Text style={styles.recipeDescription}>
            ▢ Menudo {"\n"}▢ Beef Sinigang {"\n"}▢ Pork Adobo {"\n"}
          </Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("snacks")}>
          <Text style={styles.recipeTitle}>● Snacks ▼</Text>
        </TouchableOpacity>
        {showDescriptions.snacks && (
          <Text style={styles.recipeDescription}>▢ Special Lomi {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("dinner")}>
          <Text style={styles.recipeTitle}>● Dinner ▼</Text>
        </TouchableOpacity>
        {showDescriptions.dinner && (
          <Text style={styles.recipeDescription}>▢ Sinigang {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("desserts")}>
          <Text style={styles.recipeTitle}>● Desserts ▼</Text>
        </TouchableOpacity>
        {showDescriptions.desserts && (
          <Text style={styles.recipeDescription}>▢ Leche Flan {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("beverage")}>
          <Text style={styles.recipeTitle}>● Beverage ▼</Text>
        </TouchableOpacity>
        {showDescriptions.beverage && (
          <Text style={styles.recipeDescription}>
            ▢ Strawberry Lemonade {"\n"}▢ Blackberry Margarita {"\n"}▢ Pineapple
            Fruit Cocktail {"\n"}▢ Frozen Limoncello {"\n"}
          </Text>
        )}
      </View>
    </View>
  );
}
function ContactScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>Contact Us</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.contactBody}>
          <View style={styles.contactContent}>
            <FontAwesome6 name="location-dot" size={24} color="#821131" />
            <Text style={styles.contactText}>
              Nabua Camarinis Sur, Philippines
            </Text>
          </View>
          <View style={styles.contactContent}>
            <FontAwesome6 name="phone" size={24} color="#821131" />
            <Text style={styles.contactText}>091234543222</Text>
          </View>
          <View style={styles.contactContent}>
            <Ionicons name="mail" size={24} color="#821131" />
            <Text style={styles.contactText}>ionicrecipes@email.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(240, 244, 248, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  headText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  loginContainer: {
    width: 300,
    padding: 30,
    marginTop: 0,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  inputBox: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#821131",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: "auto",
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#821131",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
    width: 250,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    marginTop: 20,
    alignItems: "center",
  },
  small: {
    color: "#666",
    fontSize: 14,
    marginVertical: 2,
  },
  signupText: {
    color: "#F2E8C6",
    fontWeight: "bold",
  },
  signupContainer: {
    alignItems: "center",
    width: 300,
  },
  colorWhite: {
    color: "#fff",
  },
  orText: {
    textAlign: "center",
    color: "#fff",
    marginVertical: 10,
    marginBottom: 2,
  },
  googleButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  googleButtonText: {
    color: "#000",
  },
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    height: "100%",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menus: {
    fontSize: 16,
    color: "#3E4E50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 8,
    width: "100%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  imageMain: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  description: {
    width: "50%",
    justifyContent: "center",
    textAlign: "center",
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imageContainer: {
    marginVertical: 20,
  },
  aboutText: {
    lineHeight: 20,
    marginBottom: 20,
    color: "#666",
    marginTop: 40,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  recipe: {
    marginVertical: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeDescription: {
    paddingLeft: 20,
  },
  contactContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  contactBody: {
    width: 300,
    paddingHorizontal: 20,
    gap: 20,
    justifyContent: "center",
    marginTop: 30,
  },
  contactText: {
    fontSize: 18,
  },
  recipes: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeText: {
    fontSize: 16,
    color: "#333",
  },
});
