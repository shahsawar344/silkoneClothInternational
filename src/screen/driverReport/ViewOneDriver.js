import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {GetAllDriverName} from '../../utils/services';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HeaderIcon from '../../component/HeaderIcon';
import {Ionicons, JustIcon} from '../../component/CustomIcons';
import ViewShot from 'react-native-view-shot';
import {createPdf} from 'react-native-images-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import {CustomModel} from '../../component/CustomModel';
import {BannerID} from '../../utils/AdmobID';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ViewOneDriver = ({navigation, route}) => {
  const {name} = route.params ? route.params : '';
  // console.log(name);
  const [dataDriver, setDataDriver] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [extraDataUrl, setExtraDataUrl] = useState('');
  const [downloadName, setDownloadName] = useState(name ? name : '');
  const fileName = new Date();
  const getMonthAbbreviation = fileName.toLocaleString('default', {
    month: 'short',
  });
  const findDate = new Date().toLocaleDateString();
  const alsoClear = findDate?.charAt(4);
  const [type, setType] = useState(alsoClear);
  const [openBarType, setOpenBarType] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [allData, setAllData] = useState();
  const fieldBillData = allData
    ? allData
    : dataDriver?.filter(
        e => new Date(e?.date).toLocaleDateString().charAt(4) == type,
      );
  let totalQuantity = 0;
  // console.log(dataDriver, '');
  for (let index = 0; index < fieldBillData?.length; index++) {
    // console.log(index, 'asdf');
    // const element = fieldBill2[index];
    const quantity = Number(fieldBillData[index]?.balance);
    totalQuantity += quantity;
  }
  const [downloadModel, setDownloadModel] = useState(false);
  // console.log(totalQuantity);
  const [secondHeader, setSecondHeader] = useState(false);
  const [withTop, setWithTop] = useState(true);
  const [topInvoice, setTopInvoice] = useState(false);
  // console.log(getMonthAbbreviation);
  const getCurrentDate = fileName.getDate();
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
  const customButton = [
    {iconName: 'heading', nav: 'Header', title: 'headingFirst'},
    {iconName: 'heading', nav: 'Header', title: 'two'},
  ];
  // Example: Generate a random integer between 1 and 10
  const randomInt = getRandomInt(1, 11);
  const GetDriverData = async () => {
    setLoading(true);
    try {
      const result = await GetAllDriverName(name);
      // console.log(result, 'new thing');
      if (result.status == true) {
        setLoading(false);
        setDataDriver(result.result);
        getImage();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetDriverData();
  }, [name]);
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [four, setFour] = useState('');
  const ref = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourRef = useRef();
  const dataType = [
    {option: 1},
    {option: 2},
    {option: 3},
    {option: 4},
    {option: 5},
    {option: 6},
    {option: 7},
    {option: 8},
    {option: 9},
    {option: 10},
    {option: 11},
    {option: 12},
  ];

  const getImage = () => {
    setLoadingImage(true);
    try {
      fieldBillData?.length > 0 &&
        ref.current?.capture().then(uri => {
          setImageUrl(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'first');
        });
      setLoadingImage(false);
      fieldBillData?.length > 32 &&
        secondRef.current?.capture().then(uri => {
          setSecond(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'second');
        });
      fieldBillData?.length > 69 &&
        thirdRef.current?.capture().then(uri => {
          setThird(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'third');
        });
      fieldBillData?.length > 106 &&
        fourRef.current?.capture().then(uri => {
          setFour(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'four');
        });
    } catch (error) {
      setLoadingImage(false);
    }
  };
  return (
    <View style={[GlobalStyle.mainContainer, {backgroundColor: '#ffffff10'}]}>
      <HeaderIcon marginLeft={responsiveWidth(10)} text={`Report of ${name}`} />
      <View
        style={{
          paddingHorizontal: responsiveWidth(7),
          marginTop: responsiveHeight(2),
        }}>
        <TouchableOpacity
          onPress={() => {
            setOpenBarType(!openBarType);
          }}
          style={{
            alignItems: 'flex-end',
          }}>
          <View
            style={[
              GlobalStyle.flexData,
              {
                borderWidth: 0.4,
                borderColor: 'black',
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(0.2),
                borderRadius: responsiveWidth(1.5),
              },
            ]}>
            <Text style={{color: 'black', fontSize: 12, marginRight: 5}}>
              {type == '400' ? 'All' : type}
            </Text>
            <JustIcon
              iconName={openBarType ? 'chevron-up' : 'chevron-down'}
              size={18}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={[
          GlobalStyle.flexJustify,
          {
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5),
          },
        ]}>
        {customButton.map((itemMap, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              itemMap.iconName == 'heading' && setTopInvoice(!topInvoice);
              itemMap?.title == 'headingFirst'
                ? (setWithTop(!withTop), setSecondHeader(false))
                : itemMap?.title == 'two'
                ? (setSecondHeader(!secondHeader), setWithTop(false))
                : console.log('okai no issue');
            }}
            style={[
              {
                width: responsiveWidth(10),
                height: responsiveWidth(10),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                backgroundColor:
                  itemMap.iconName == 'trash-outline' ? 'red' : 'white',
              },
              GlobalStyle.shadow,
            ]}>
            {itemMap.nav !== 'Header' ? (
              <JustIcon
                iconName={itemMap.iconName}
                size={23}
                color={itemMap.iconName == 'trash-outline' ? 'white' : 'black'}
              />
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5
                  name={itemMap.iconName}
                  size={19}
                  color={'black'}
                />
                {itemMap.title == 'two' && (
                  <Text style={{color: 'black', fontSize: 9}}>2</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setDownloadModel(true);
          }}
          style={[
            {
              width: responsiveWidth(10),
              marginVertical: 3,
              height: responsiveWidth(10),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              backgroundColor: 'white',
            },
            GlobalStyle.shadow,
          ]}>
          <JustIcon iconName={'download'} size={23} color={'black'} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'black'}
          style={GlobalStyle.flexCenter}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: responsiveWidth(2),
            marginTop: responsiveHeight(1),
          }}>
          {fieldBillData?.length > 0 ? (
            <ViewShot
              ref={ref}
              options={{quality: 0.8}}
              style={[
                {
                  backgroundColor: 'white',
                  height: 600,
                },
                GlobalStyle.shadow,
              ]}>
              <View style={{backgroundColor: 'white'}}>
                {withTop && (
                  <Image
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(100),
                      height: responsiveHeight(8),
                      top: -5,
                      marginHorizontal: responsiveWidth(-3),
                    }}
                    source={require('../../assets/top.png')}
                  />
                )}
                {secondHeader && (
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 400,
                      height: 65,
                      alignSelf: 'center',
                      // top: 3,
                      // marginRight: responsiveWidth(-2),
                    }}
                    source={require('../../assets/2ndTop.jpeg')}
                  />
                )}
              </View>
              {/* <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            /> */}
              <View
                style={{
                  height: 1,
                  backgroundColor: '#525260',
                  // marginBottom: '2%',
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  // fontWeight: 'bold',
                  fontSize: responsiveFontSize(0.7),
                  marginVertical: '0.2%',
                }}>
                Driver Name :{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: responsiveFontSize(0.88),
                  }}>
                  {fieldBillData ? fieldBillData[0]?.name : ''}
                </Text>
              </Text>
              <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}
              />
              <View
                style={[GlobalStyle.flexJustify, {backgroundColor: '#bbe4e9'}]}>
                <View style={styles.date}>
                  <Text style={styles.headerText}>Date</Text>
                </View>
                {/* <View style={styles.name}>
                <Text style={styles.headerText}>Name</Text>
              </View> */}
                <View style={styles.container}>
                  <Text style={styles.headerText}>Container</Text>
                </View>
                <View style={styles.location}>
                  <Text style={styles.headerText}>location</Text>
                </View>
                <View style={styles.customer}>
                  <Text style={styles.headerText}>customer</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.headerText}>Price</Text>
                </View>
                <View style={[styles.fuel, {}]}>
                  <Text style={styles.headerText}>Fuel</Text>
                </View>
                <View
                  style={[
                    styles.fuel,
                    {
                      width: responsiveWidth(8),
                    },
                  ]}>
                  <Text style={styles.headerText}>Balance</Text>
                </View>
              </View>
              <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}
              />

              {fieldBillData?.slice(0, 31).map((item, index) => (
                <Fragment key={index}>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.date}>
                      <Text
                        style={[
                          styles.descriptionText,
                          {
                            // fontSize: responsiveFontSize(0.6),
                          },
                        ]}>
                        {new Date(item?.date).toLocaleDateString()}
                      </Text>
                    </View>
                    {/* <View style={[styles.name, {}]}>
                    <Text style={styles.descriptionText}>{item?.name}</Text>
                  </View> */}

                    <View style={[styles.container, {}]}>
                      <Text style={styles.descriptionText}>
                        {item?.containerNo}
                      </Text>
                    </View>
                    <View style={[styles.location, {}]}>
                      <Text style={styles.descriptionText}>
                        {item?.location}
                      </Text>
                    </View>
                    <View style={[styles.customer, {}]}>
                      <Text style={styles.descriptionText}>
                        {item?.customerName}
                      </Text>
                    </View>
                    <View style={[styles.price, {}]}>
                      <Text style={styles.descriptionText}>{item?.price}</Text>
                    </View>
                    <View style={[styles.fuel, {}]}>
                      <Text style={styles.descriptionText}>{item?.fuel}</Text>
                    </View>
                    <View
                      style={[
                        styles.fuel,
                        {
                          width: responsiveWidth(8),
                        },
                      ]}>
                      <Text style={styles.descriptionText}>
                        {item?.balance}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{height: 1, width: '100%', backgroundColor: 'gray'}}
                  />
                </Fragment>
              ))}
              {fieldBillData?.length < 33 && (
                <Fragment>
                  <View style={[GlobalStyle.flexJustify, {}]}>
                    <View
                      style={[
                        styles.tableHeading,
                        {
                          width: responsiveWidth(48),
                          borderLeftWidth: 1,
                          borderLeftColor: 'gray',
                          alignItems: 'center',
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            fontSize: responsiveFontSize(1),
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                            color: 'black',
                          },
                        ]}>
                        Total Amount
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        backgroundColor: 'gray',
                        width: 1,
                      }}
                    />
                    <View style={[styles.tableHeading, {alignItems: 'center'}]}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1),
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          // alignSelf: 'center',
                          // width: responsiveWidth(13),
                          // height: responsiveHeight(2.5),
                          // textAlign: 'center',
                          textAlignVertical: 'center',
                          color: 'black',
                          borderRightWidth: 1,
                          borderRightColor: 'black',
                          width: responsiveWidth(20),
                        }}>
                        {totalQuantity ? totalQuantity : 0}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{backgroundColor: 'gray', width: '100%', height: 1}}
                  />
                </Fragment>
              )}
            </ViewShot>
          ) : (
            <View
              style={{marginTop: responsiveHeight(5), alignItems: 'center'}}>
              <Text style={{fontSize: 19, color: 'black'}}>
                No data available
              </Text>
            </View>
          )}
          {fieldBillData?.length > 32 && (
            <>
              <View style={{backgroundColor: '#ffffff40', height: 10}} />
              <ViewShot
                ref={secondRef}
                options={{quality: 0.8}}
                style={[
                  {
                    backgroundColor: 'white',
                    height: 600,
                  },
                  GlobalStyle.shadow,
                ]}>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />
                <View
                  style={[
                    GlobalStyle.flexJustify,
                    {backgroundColor: '#bbe4e9'},
                  ]}>
                  <View style={styles.date}>
                    <Text style={styles.headerText}>Date</Text>
                  </View>
                  {/* <View style={styles.name}>
                <Text style={styles.headerText}>Name</Text>
              </View> */}
                  <View style={styles.container}>
                    <Text style={styles.headerText}>Container</Text>
                  </View>
                  <View style={styles.location}>
                    <Text style={styles.headerText}>location</Text>
                  </View>
                  <View style={styles.customer}>
                    <Text style={styles.headerText}>customer</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.headerText}>Price</Text>
                  </View>
                  <View style={[styles.fuel, {}]}>
                    <Text style={styles.headerText}>Fuel</Text>
                  </View>
                  <View
                    style={[
                      styles.fuel,
                      {
                        width: responsiveWidth(8),
                      },
                    ]}>
                    <Text style={styles.headerText}>Balance</Text>
                  </View>
                </View>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />

                {fieldBillData?.slice(32, 69).map((item, index) => (
                  <Fragment key={index}>
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.date}>
                        <Text
                          style={[
                            styles.descriptionText,
                            {
                              // fontSize: responsiveFontSize(0.6),
                            },
                          ]}>
                          {new Date(item?.date).toLocaleDateString()}
                        </Text>
                      </View>
                      {/* <View style={[styles.name, {}]}>
                    <Text style={styles.descriptionText}>{item?.name}</Text>
                  </View> */}

                      <View style={[styles.container, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.containerNo}
                        </Text>
                      </View>
                      <View style={[styles.location, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.location}
                        </Text>
                      </View>
                      <View style={[styles.customer, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.customerName}
                        </Text>
                      </View>
                      <View style={[styles.price, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.price}
                        </Text>
                      </View>
                      <View style={[styles.fuel, {}]}>
                        <Text style={styles.descriptionText}>{item?.fuel}</Text>
                      </View>
                      <View
                        style={[
                          styles.fuel,
                          {
                            width: responsiveWidth(8),
                          },
                        ]}>
                        <Text style={styles.descriptionText}>
                          {Number(item?.price) - Number(item?.fuel)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'gray',
                      }}
                    />
                  </Fragment>
                ))}
                {fieldBillData.length < 70 && (
                  <Fragment>
                    <View style={[GlobalStyle.flexJustify, {}]}>
                      <View
                        style={[
                          styles.tableHeading,
                          {
                            width: responsiveWidth(48),
                            borderLeftWidth: 1,
                            borderLeftColor: 'gray',
                            alignItems: 'center',
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              fontSize: responsiveFontSize(1),
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              textAlignVertical: 'center',
                              color: 'black',
                            },
                          ]}>
                          Total Amount
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          backgroundColor: 'gray',
                          width: 1,
                        }}
                      />
                      <View
                        style={[styles.tableHeading, {alignItems: 'center'}]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1),
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            // alignSelf: 'center',
                            // width: responsiveWidth(13),
                            // height: responsiveHeight(2.5),
                            // textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'black',
                            borderRightWidth: 1,
                            borderRightColor: 'black',
                            width: responsiveWidth(20),
                          }}>
                          {totalQuantity ? totalQuantity : 0}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'gray',
                        width: '100%',
                        height: 1,
                      }}
                    />
                  </Fragment>
                )}
              </ViewShot>
            </>
          )}
          {fieldBillData?.length > 69 && (
            <>
              <View style={{backgroundColor: '#ffffff40', height: 10}} />
              <ViewShot
                ref={thirdRef}
                options={{quality: 0.8}}
                style={[
                  {
                    backgroundColor: 'white',
                    height: 600,
                  },
                  GlobalStyle.shadow,
                ]}>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />
                <View
                  style={[
                    GlobalStyle.flexJustify,
                    {backgroundColor: '#bbe4e9'},
                  ]}>
                  <View style={styles.date}>
                    <Text style={styles.headerText}>Date</Text>
                  </View>
                  {/* <View style={styles.name}>
                <Text style={styles.headerText}>Name</Text>
              </View> */}
                  <View style={styles.container}>
                    <Text style={styles.headerText}>Container</Text>
                  </View>
                  <View style={styles.location}>
                    <Text style={styles.headerText}>location</Text>
                  </View>
                  <View style={styles.customer}>
                    <Text style={styles.headerText}>customer</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.headerText}>Price</Text>
                  </View>
                  <View style={[styles.fuel, {}]}>
                    <Text style={styles.headerText}>Fuel</Text>
                  </View>
                  <View
                    style={[
                      styles.fuel,
                      {
                        width: responsiveWidth(8),
                      },
                    ]}>
                    <Text style={styles.headerText}>Balance</Text>
                  </View>
                </View>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />

                {fieldBillData?.slice(69, 106).map((item, index) => (
                  <Fragment key={index}>
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.date}>
                        <Text
                          style={[
                            styles.descriptionText,
                            {
                              // fontSize: responsiveFontSize(0.6),
                            },
                          ]}>
                          {new Date(item?.date).toLocaleDateString()}
                        </Text>
                      </View>
                      {/* <View style={[styles.name, {}]}>
                    <Text style={styles.descriptionText}>{item?.name}</Text>
                  </View> */}

                      <View style={[styles.container, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.containerNo}
                        </Text>
                      </View>
                      <View style={[styles.location, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.location}
                        </Text>
                      </View>
                      <View style={[styles.customer, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.customerName}
                        </Text>
                      </View>
                      <View style={[styles.price, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.price}
                        </Text>
                      </View>
                      <View style={[styles.fuel, {}]}>
                        <Text style={styles.descriptionText}>{item?.fuel}</Text>
                      </View>
                      <View
                        style={[
                          styles.fuel,
                          {
                            width: responsiveWidth(8),
                          },
                        ]}>
                        <Text style={styles.descriptionText}>
                          {Number(item?.price) - Number(item?.fuel)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'gray',
                      }}
                    />
                  </Fragment>
                ))}
                {fieldBillData.length < 106 && (
                  <Fragment>
                    <View style={[GlobalStyle.flexJustify, {}]}>
                      <View
                        style={[
                          styles.tableHeading,
                          {
                            width: responsiveWidth(48),
                            borderLeftWidth: 1,
                            borderLeftColor: 'gray',
                            alignItems: 'center',
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              fontSize: responsiveFontSize(1),
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              textAlignVertical: 'center',
                              color: 'black',
                            },
                          ]}>
                          Total Amount
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          backgroundColor: 'gray',
                          width: 1,
                        }}
                      />
                      <View
                        style={[styles.tableHeading, {alignItems: 'center'}]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1),
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            // alignSelf: 'center',
                            // width: responsiveWidth(13),
                            // height: responsiveHeight(2.5),
                            // textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'black',
                            borderRightWidth: 1,
                            borderRightColor: 'black',
                            width: responsiveWidth(20),
                          }}>
                          {totalQuantity ? totalQuantity : 0}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'gray',
                        width: '100%',
                        height: 1,
                      }}
                    />
                  </Fragment>
                )}
              </ViewShot>
            </>
          )}
          {fieldBillData?.length > 106 && (
            <>
              <View style={{backgroundColor: '#ffffff40', height: 10}} />
              <ViewShot
                ref={fourRef}
                options={{quality: 0.8}}
                style={[
                  {
                    backgroundColor: 'white',
                    height: 600,
                  },
                  GlobalStyle.shadow,
                ]}>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />
                <View
                  style={[
                    GlobalStyle.flexJustify,
                    {backgroundColor: '#bbe4e9'},
                  ]}>
                  <View style={styles.date}>
                    <Text style={styles.headerText}>Date</Text>
                  </View>
                  {/* <View style={styles.name}>
                <Text style={styles.headerText}>Name</Text>
              </View> */}
                  <View style={styles.container}>
                    <Text style={styles.headerText}>Container</Text>
                  </View>
                  <View style={styles.location}>
                    <Text style={styles.headerText}>location</Text>
                  </View>
                  <View style={styles.customer}>
                    <Text style={styles.headerText}>customer</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.headerText}>Price</Text>
                  </View>
                  <View style={[styles.fuel, {}]}>
                    <Text style={styles.headerText}>Fuel</Text>
                  </View>
                  <View
                    style={[
                      styles.fuel,
                      {
                        width: responsiveWidth(8),
                      },
                    ]}>
                    <Text style={styles.headerText}>Balance</Text>
                  </View>
                </View>
                <View
                  style={{height: 1, width: '100%', backgroundColor: 'black'}}
                />

                {fieldBillData?.slice(107, 144).map((item, index) => (
                  <Fragment key={index}>
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.date}>
                        <Text
                          style={[
                            styles.descriptionText,
                            {
                              // fontSize: responsiveFontSize(0.6),
                            },
                          ]}>
                          {new Date(item?.date).toLocaleDateString()}
                        </Text>
                      </View>
                      {/* <View style={[styles.name, {}]}>
                    <Text style={styles.descriptionText}>{item?.name}</Text>
                  </View> */}

                      <View style={[styles.container, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.containerNo}
                        </Text>
                      </View>
                      <View style={[styles.location, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.location}
                        </Text>
                      </View>
                      <View style={[styles.customer, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.customerName}
                        </Text>
                      </View>
                      <View style={[styles.price, {}]}>
                        <Text style={styles.descriptionText}>
                          {item?.price}
                        </Text>
                      </View>
                      <View style={[styles.fuel, {}]}>
                        <Text style={styles.descriptionText}>{item?.fuel}</Text>
                      </View>
                      <View
                        style={[
                          styles.fuel,
                          {
                            width: responsiveWidth(8),
                          },
                        ]}>
                        <Text style={styles.descriptionText}>
                          {Number(item?.price) - Number(item?.fuel)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'gray',
                      }}
                    />
                  </Fragment>
                ))}
                {fieldBillData.length < 145 && (
                  <Fragment>
                    <View style={[GlobalStyle.flexJustify, {}]}>
                      <View
                        style={[
                          styles.tableHeading,
                          {
                            width: responsiveWidth(48),
                            borderLeftWidth: 1,
                            borderLeftColor: 'gray',
                            alignItems: 'center',
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              fontSize: responsiveFontSize(1),
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              textAlignVertical: 'center',
                              color: 'black',
                            },
                          ]}>
                          Total Amount
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          backgroundColor: 'gray',
                          width: 1,
                        }}
                      />
                      <View
                        style={[styles.tableHeading, {alignItems: 'center'}]}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1),
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            // alignSelf: 'center',
                            // width: responsiveWidth(13),
                            // height: responsiveHeight(2.5),
                            // textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'black',
                            borderRightWidth: 1,
                            borderRightColor: 'black',
                            width: responsiveWidth(20),
                          }}>
                          {totalQuantity ? totalQuantity : 0}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'gray',
                        width: '100%',
                        height: 1,
                      }}
                    />
                  </Fragment>
                )}
              </ViewShot>
            </>
          )}
          <View style={{height: 10, backgroundColor: '#ffffff40'}} />
        </ScrollView>
      )}
      {openBarType && (
        <View
          style={[
            GlobalStyle.shadow,
            {
              borderRadius: 10,
              backgroundColor: 'white',
              position: 'absolute',
              right: 23,
              top: 96,
            },
          ]}>
          <View
            style={{
              borderWidth: 0.3,
              borderColor: 'black',
              borderRadius: 8,
              paddingHorizontal: 8,
              width: 63,
            }}>
            {dataType.map((item, i) => (
              <View key={i}>
                <TouchableOpacity
                  style={{}}
                  key={i}
                  onPress={() => {
                    setAllData();
                    setType(item.option);
                    setOpenBarType(false);
                    GetDriverData();
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      paddingVertical: 3,
                    }}>
                    {item.option == '400' ? 'All' : item.option}
                  </Text>
                  <View style={{height: 1, backgroundColor: '#00000050'}} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setAllData(dataDriver);
                setOpenBarType(false);
                GetDriverData();
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  paddingVertical: 3,
                }}>
                All
              </Text>
              <View style={{height: 1, backgroundColor: '#00000050'}} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <CustomModel
        open={downloadModel}
        close={setDownloadModel}
        title={'Set Download Name'}>
        <CustomInput
          noIcon={true}
          placeholder={'Enter File Name'}
          bgColor={downloadName.length > 4 && '#00000010'}
          onChangeText={e => setDownloadName(e)}
          value={downloadName}
          style={{marginTop: responsiveHeight(3)}}
        />
        <View style={{alignItems: 'flex-end'}}>
          <CustomButton
            buttonColor={downloadName.length < 3 && '#00000020'}
            disabled={downloadName.length < 3 ? true : false}
            buttonText={imageUrl ? 'Download' : 'Generate PDF'}
            loading={loadingImage}
            width={imageUrl ? responsiveWidth(40) : responsiveWidth(55)}
            onPress={() => {
              // getNextLetter();
              const dirs = RNFetchBlob.fs.dirs;
              const fileNameInfo =
                downloadName +
                getMonthAbbreviation +
                getCurrentDate +
                '-' +
                randomInt;
              const downloadPath = Platform.select({
                android: `${dirs.PictureDir}/${fileNameInfo}.pdf`,
              });
              // ref.current.capture().then(uri => serRef(uri));
              // secondRef.current.capture().then(uri => setSecond(uri));
              // thirdRef.current.capture().then(uri => setThird(uri));
              // fourRef.current.capture().then(uri => {
              const pages4 = [
                {imagePath: imageUrl},
                {imagePath: second},
                {imagePath: third},
                {imagePath: four},
              ];
              const pages3 = [
                {imagePath: imageUrl},
                {imagePath: second},
                {imagePath: third},
              ];
              const pages2 = [{imagePath: imageUrl}, {imagePath: second}];
              const pages = [{imagePath: imageUrl}];
              const options = {
                pages:
                  fieldBillData?.length > 106
                    ? pages4
                    : fieldBillData?.length > 69
                    ? pages3
                    : fieldBillData?.length > 32
                    ? pages2
                    : pages,
                outputPath: `file://${downloadPath}`,
              };
              imageUrl
                ? createPdf(options)
                    .then(path => {
                      console.log(`PDF created successfully: ${path}`);
                      Alert.alert('Success', 'Your file was downloaded', [
                        {
                          text: 'Ok',
                          onPress: () => {
                            setDownloadModel(false),
                              navigation.navigate('Drawer');
                          },
                        },
                      ]);
                    })
                    .catch(error =>
                      console.log(`Failed to create PDF: ${error}`),
                    )
                : getImage();
              // console.log('do something with ', uri);
              // });
            }}
          />
        </View>
      </CustomModel>
    </View>
  );
};

export default ViewOneDriver;

const styles = StyleSheet.create({
  headerText: {
    color: 'black',
    fontSize: responsiveFontSize(0.7),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  descriptionText: {
    color: 'black',
    fontSize: responsiveFontSize(0.6),
    paddingVertical: responsiveHeight(0.4),
    textTransform: 'capitalize',
    // alignSelf: 'center',
  },
  date: {
    width: responsiveWidth(11),
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    // height: '100%',
  },
  name: {
    width: responsiveWidth(13),
    alignItems: 'center',
    // height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  container: {
    width: responsiveWidth(14),
    alignItems: 'center',
    // height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  location: {
    width: responsiveWidth(12),
    borderRightWidth: 1,
    // height: '100%',
    borderRightColor: 'gray',
    alignItems: 'center',
  },
  customer: {
    width: responsiveWidth(18),
    borderRightWidth: 1,
    // height: '100%',
    borderRightColor: 'gray',
    alignItems: 'center',
  },
  price: {
    width: responsiveWidth(5),
    alignItems: 'center',
    // height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  fuel: {
    width: responsiveWidth(5),
    // height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    alignItems: 'center',
  },
});
