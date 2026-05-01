import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import API from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";
import FilterModal from "../../components/FilterModal";

import {
  fetchStart,
  fetchSuccess,
  fetchFail,
} from "../../redux/productSlice";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const categories = [
  { name: "All", icon: "apps" },
  { name: "Shoes", icon: "walk" },
  { name: "Clothing", icon: "shirt" },
  {
    name: "Electronics",
    icon: "phone-portrait",
  },
  {
    name: "Accessories",
    icon: "watch",
  },
];

const banners = [
  {
    title: "Shoes Mega Sale 👟",
    subtitle:
      "Top sneakers up to 60% OFF",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
  },
  {
    title:
      "Electronics Deals 📱",
    subtitle:
      "Latest gadgets at best prices",
    category:
      "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
  },
  {
    title:
      "Fashion Collection 👕",
    subtitle:
      "Trending clothing styles live now",
    category:
      "Clothing",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
  },
  {
    title:
      "Accessories Offers ⌚",
    subtitle:
      "Smart picks for daily style",
    category:
      "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200",
  },
];

const HomeScreen = () => {
  const dispatch =
    useAppDispatch();

  const {
    products,
    loading,
    error,
  } = useAppSelector(
    (state) =>
      state.product
  );

  const [search, setSearch] =
    useState("");

  const [
    filterVisible,
    setFilterVisible,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [filters, setFilters] =
    useState({
      category: "All",
      sort: "",
    });

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [recent, setRecent] =
    useState<any[]>([]);

  const [
    bannerIndex,
    setBannerIndex,
  ] = useState(0);

  const [timeLeft, setTimeLeft] =
    useState(7200);

  useEffect(() => {
    getProducts();
    loadRecent();
  }, []);

  useEffect(() => {
    const timer =
      setInterval(() => {
        setBannerIndex(
          (prev) =>
            (prev + 1) %
            banners.length
        );
      }, 3000);

    return () =>
      clearInterval(
        timer
      );
  }, []);

  useEffect(() => {
    const sale =
      setInterval(() => {
        setTimeLeft(
          (prev) =>
            prev > 0
              ? prev - 1
              : 0
        );
      }, 1000);

    return () =>
      clearInterval(
        sale
      );
  }, []);

  const getProducts =
    async () => {
      try {
        dispatch(
          fetchStart()
        );

        const res =
          await API.get(
            "/products"
          );

        dispatch(
          fetchSuccess(
            res.data
          )
        );
      } catch (err: any) {
        dispatch(
          fetchFail(
            err.message
          )
        );
      }
    };

  const loadRecent =
    async () => {
      try {
        const data =
          await AsyncStorage.getItem(
            "recent"
          );

        if (data) {
          setRecent(
            JSON.parse(
              data
            )
          );
        }
      } catch {}
    };

  const onRefresh =
    async () => {
      setRefreshing(true);
      await getProducts();
      await loadRecent();
      setRefreshing(false);
    };

  const formatTime = (
    sec: number
  ) => {
    const h = Math.floor(
      sec / 3600
    );
    const m = Math.floor(
      (sec % 3600) / 60
    );
    const s = sec % 60;

    return `${h
      .toString()
      .padStart(
        2,
        "0"
      )}:${m
      .toString()
      .padStart(
        2,
        "0"
      )}:${s
      .toString()
      .padStart(
        2,
        "0"
      )}`;
  };

  let filteredProducts =
    products.filter(
      (item: any) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  if (
    selectedCategory !==
    "All"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (item: any) =>
          item.category ===
          selectedCategory
      );
  }

  if (
    filters.category !==
    "All"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (item: any) =>
          item.category ===
          filters.category
      );
  }

  if (
    filters.sort ===
    "low"
  ) {
    filteredProducts.sort(
      (
        a: any,
        b: any
      ) =>
        a.price -
        b.price
    );
  }

  if (
    filters.sort ===
    "high"
  ) {
    filteredProducts.sort(
      (
        a: any,
        b: any
      ) =>
        b.price -
        a.price
    );
  }

  if (loading) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <ActivityIndicator
          size="large"
          color="#111"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <Text>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={
        styles.container
      }
    >
      <FlatList
        data={
          filteredProducts
        }
        keyExtractor={(
          item: any
        ) =>
          item._id
        }
        numColumns={2}
        renderItem={({
          item,
        }) => (
          <ProductCard
            product={
              item
            }
          />
        )}
        columnWrapperStyle={
          styles.row
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View
              style={
                styles.header
              }
            >
              <View
                style={
                  styles.topBar
                }
              >
                <Text
                  style={
                    styles.delivery
                  }
                >
                  Deliver to
                  Diya 📍
                </Text>

                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#fff"
                />
              </View>

              <Text
                style={
                  styles.welcome
                }
              >
                Find your
                next buy ✨
              </Text>

              <View
                style={
                  styles.searchWrap
                }
              >
                <Ionicons
                  name="search"
                  size={18}
                  color="#666"
                />

                <TextInput
                  placeholder="Search products"
                  value={
                    search
                  }
                  onChangeText={
                    setSearch
                  }
                  style={
                    styles.search
                  }
                />
              </View>
            </View>

            {/* IMAGE BANNER */}
            <TouchableOpacity
              activeOpacity={0.92}
              style={
                styles.bannerWrap
              }
              onPress={() =>
                setSelectedCategory(
                  banners[
                    bannerIndex
                  ].category
                )
              }
            >
              <ImageBackground
                source={{
                  uri: banners[
                    bannerIndex
                  ].image,
                }}
                style={
                  styles.bannerImage
                }
                imageStyle={{
                  borderRadius: 18,
                }}
              >
                <View
                  style={
                    styles.overlay
                  }
                >
                  <Text
                    style={
                      styles.bannerTitle
                    }
                  >
                    {
                      banners[
                        bannerIndex
                      ].title
                    }
                  </Text>

                  <Text
                    style={
                      styles.bannerSub
                    }
                  >
                    {
                      banners[
                        bannerIndex
                      ]
                        .subtitle
                    }
                  </Text>

                  <View
                    style={
                      styles.shopNowBtn
                    }
                  >
                    <Text
                      style={
                        styles.shopNowText
                      }
                    >
                      Shop Now
                    </Text>
                  </View>

                  <View
                    style={
                      styles.dots
                    }
                  >
                    {banners.map(
                      (
                        _,
                        index
                      ) => (
                        <View
                          key={
                            index
                          }
                          style={[
                            styles.dot,
                            bannerIndex ===
                              index &&
                              styles.activeDot,
                          ]}
                        />
                      )
                    )}
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* FLASH */}
            <View
              style={
                styles.flashBox
              }
            >
              <Text
                style={
                  styles.flashTitle
                }
              >
                Flash Sale
                ⏰
              </Text>

              <Text
                style={
                  styles.flashTime
                }
              >
                Ends in{" "}
                {formatTime(
                  timeLeft
                )}
              </Text>
            </View>

            {/* CATEGORIES */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.iconRow
              }
            >
              {categories.map(
                (
                  item
                ) => (
                  <TouchableOpacity
                    key={
                      item.name
                    }
                    style={
                      styles.iconCard
                    }
                    onPress={() =>
                      setSelectedCategory(
                        item.name
                      )
                    }
                  >
                    <View
                      style={[
                        styles.iconCircle,
                        selectedCategory ===
                          item.name &&
                          styles.activeCircle,
                      ]}
                    >
                      <Ionicons
                        name={
                          item.icon as any
                        }
                        size={20}
                        color={
                          selectedCategory ===
                          item.name
                            ? "#fff"
                            : "#111"
                        }
                      />
                    </View>

                    <Text
                      style={
                        styles.iconText
                      }
                    >
                      {
                        item.name
                      }
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>

            {/* FILTER */}
            <View
              style={
                styles.filterRow
              }
            >
              <Text
                style={
                  styles.heading
                }
              >
                Recommended
                For You 🛍️
              </Text>

              <TouchableOpacity
                style={
                  styles.filterBtn
                }
                onPress={() =>
                  setFilterVisible(
                    true
                  )
                }
              >
                <Ionicons
                  name="options"
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* RECENT */}
            {recent.length >
              0 && (
              <>
                <Text
                  style={
                    styles.heading
                  }
                >
                  Continue
                  Shopping 👀
                </Text>

                <FlatList
                  horizontal
                  data={
                    recent
                  }
                  keyExtractor={(
                    item: any
                  ) =>
                    item._id
                  }
                  renderItem={({
                    item,
                  }) => (
                    <View
                      style={{
                        width: 180,
                      }}
                    >
                      <ProductCard
                        product={
                          item
                        }
                      />
                    </View>
                  )}
                  showsHorizontalScrollIndicator={
                    false
                  }
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    marginBottom: 12,
                  }}
                />
              </>
            )}
          </>
        }
      />

      <FilterModal
        visible={
          filterVisible
        }
        onClose={() =>
          setFilterVisible(
            false
          )
        }
        onApply={(
          data
        ) =>
          setFilters(
            data
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
    },

    loader: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    row: {
      justifyContent:
        "space-between",
      paddingHorizontal: 10,
    },

    header: {
      backgroundColor:
        "#00A8E1",
      paddingTop: 18,
      paddingHorizontal: 14,
      paddingBottom: 18,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },

    topBar: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    delivery: {
      color: "#fff",
      fontWeight:
        "600",
      fontSize: 13,
    },

    welcome: {
      color: "#fff",
      fontSize: 24,
      fontWeight:
        "700",
      marginVertical: 12,
    },

    searchWrap: {
      backgroundColor:
        "#fff",
      borderRadius: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      paddingHorizontal: 12,
    },

    search: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 8,
    },

    bannerWrap: {
      margin: 12,
      borderRadius: 18,
      overflow:
        "hidden",
    },

    bannerImage: {
      height: 190,
      justifyContent:
        "flex-end",
    },

    overlay: {
      flex: 1,
      justifyContent:
        "flex-end",
      padding: 16,
      backgroundColor:
        "rgba(0,0,0,0.30)",
    },

    bannerTitle: {
      color: "#fff",
      fontSize: 22,
      fontWeight:
        "700",
    },

    bannerSub: {
      color: "#eee",
      marginTop: 5,
    },

    shopNowBtn: {
      marginTop: 10,
      backgroundColor:
        "#fff",
      alignSelf:
        "flex-start",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
    },

    shopNowText: {
      color: "#111",
      fontWeight:
        "700",
      fontSize: 12,
    },

    dots: {
      flexDirection:
        "row",
      marginTop: 14,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor:
        "#999",
      marginRight: 6,
    },

    activeDot: {
      width: 18,
      backgroundColor:
        "#fff",
    },

    flashBox: {
      backgroundColor:
        "#fff",
      marginHorizontal: 12,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    },

    flashTitle: {
      fontWeight:
        "700",
      fontSize: 16,
    },

    flashTime: {
      color:
        "#ff3b30",
      fontWeight:
        "700",
      marginTop: 6,
    },

    iconRow: {
      paddingHorizontal: 10,
      paddingBottom: 12,
    },

    iconCard: {
      alignItems:
        "center",
      marginRight: 14,
    },

    iconCircle: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor:
        "#fff",
      justifyContent:
        "center",
      alignItems:
        "center",
      elevation: 3,
    },

    activeCircle: {
      backgroundColor:
        "#111",
    },

    iconText: {
      marginTop: 6,
      fontSize: 12,
      fontWeight:
        "500",
    },

    filterRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginHorizontal: 12,
      marginBottom: 10,
    },

    heading: {
      fontSize: 18,
      fontWeight:
        "700",
    },

    filterBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor:
        "#111",
      justifyContent:
        "center",
      alignItems:
        "center",
    },
  });