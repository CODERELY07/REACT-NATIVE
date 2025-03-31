import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ImageScrollSection from "./ImageScrollSection";
import { openDatabase } from "../database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    getUsername();
  }, []);
  console.log("username is: ", username);

    const imageSets = [
      {
        title: "Timeless Taste Sensation",
        images: [
          require("../assets/Carbonara.jpg"),
          require("../assets/LumpiangShanghai.jpg"),
          require("../assets/Pork-Adobo.jpg"),
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
          require("../assets/mango-graham.jpg.jpeg"),
          require("../assets/Garlic-Butter-Shrimp.jpg"),
          require("../assets/halo-halo.jpg.jpeg"),
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
          require("../assets/LecheFlan.jpg.jpeg"),
          require("../assets/spaghetti.jpg"),
          require("../assets/BeefSinigang.jpg"),
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
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("username");
                  await AsyncStorage.removeItem("email");
                  navigation.navigate("Login"); 
                } catch (error) {
                  console.error("Error during logout:", error);
                }
              }}
            >
              <Text style={styles.menus}>Logout</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
        <View>
          <Text style={styles.headText}>Welcome! {username}</Text>
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

  export default HomeScreen;