import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {GetBillDataByCompanyName} from '../../utils/services';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import {createPdf} from 'react-native-images-to-pdf';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import {InterstitialId} from '../../utils/AdmobID';
import {JustIcon} from '../../component/CustomIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CompanyName = ({navigation, route}) => {
  const {randomNumber} = route?.params ? route?.params : '';
  const [search, setSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [dataBilling, setDataBilling] = useState([]);
  const [loading, setLoading] = useState(false);
  const filterData = dataBilling?.filter(e => e?.creditAmount);
  const paidAmount = dataBilling?.filter(e => e?.creditAmount == 0);
  const fieldBillData = filterData.concat(paidAmount);
  const dataType = [
    {option: '1'},
    {option: '2'},
    {option: '3'},
    {option: '4'},
    {option: '5'},
    {option: '6'},
    {option: '7'},
    {option: '8'},
    {option: '9'},
    {option: '10'},
    {option: '11'},
    {option: '12'},
  ];
  const [allData, setAllData] = useState();

  const findDate = new Date().toLocaleDateString();
  // console.log(findDate, 'finnd month');
  const alsoClear = findDate?.charAt(0);
  const [type, setType] = useState(alsoClear);
  const [openBarType, setOpenBarType] = useState(false);
  const fieldBill = allData
    ? allData
    : fieldBillData?.filter(e => e?.date?.charAt(0) == type);
  // const fieldBill = Array.from({length: 200});
  const fileName = new Date();
  const getMonthAbbreviation = fileName.toLocaleString('default', {
    month: 'short',
  });

  // console.log(getMonthAbbreviation);
  const getCurrentDate = fileName.getDate();
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  // Example: Generate a random integer between 1 and 10
  const randomInt = getRandomInt(1, 11);
  const [currentLetter, setCurrentLetter] = useState('aa');
  const ref = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourRef = useRef();
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [four, setFour] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [extraDataUrl, setExtraDataUrl] = useState('');
  const [downloadName, setDownloadName] = useState(
    nameSearch ? nameSearch : '',
  );
  const getNextLetter = () => {
    const nextCharCode = currentLetter.charCodeAt(1) + 1;

    if (nextCharCode <= 'z'.charCodeAt(0)) {
      // If the next character is within 'a' to 'z', update the second character
      setCurrentLetter(currentLetter[0] + String.fromCharCode(nextCharCode));
    } else {
      // If the second character is 'z', reset to 'a' and increment the first character
      setCurrentLetter(
        String.fromCharCode(currentLetter.charCodeAt(0) + 1) + 'a',
      );
    }
  };

  let totalQuantity = 0;

  for (let index = 0; index < fieldBill?.length; index++) {
    const quantity =
      Number(fieldBill[index]?.paidAmount) -
      Number(fieldBill[index]?.creditAmount);
    totalQuantity += quantity;
  }
  const customButton = [
    {iconName: 'heading', nav: 'Header', title: 'headingFirst'},
    {iconName: 'heading', nav: 'Header', title: 'two'},
  ];

  // console.log(totalQuantity, 'new thing');

  // const sumOfTotalQuantities = totalQuantities.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0,
  // );
  // useEffect(() => {
  //   setDataQuantity(sumOfTotalQuantities);
  // }, [!sumOfTotalQuantities, totalQuantities]);
  // console.log(sumOfTotalQuantities, 'new thing');

  // const [loadingAds, setLoadingAds] = useState(false);

  // const interStitial = InterstitialAd.createForAdRequest(InterstitialId, {
  //   requestNonPersonalizedAdsOnly: true,
  //   keywords: ['fashion'],
  // });

  // useEffect(() => {
  //   const unsubscribe = interStitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       loadingAds ? interStitial.show() : null;
  //       console.log('ads calling');
  //     },r
  //   );
  //   interStitial.load();
  //   return unsubscribe;
  // }, [loadingAds]);

  const GetAllDataByCompany = async () => {
    // setLoadingAds(true);
    setLoading(true);
    try {
      const result = await GetBillDataByCompanyName(search);
      // console.log(result, 'new one');
      if (result.status == true) {
        setLoading(false);
        setDataBilling(result.result);
        setSearch('');
        getImage();
        // setLoading(false);
        // setDataQuantity(sumOfTotalQuantities);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const LineBetween = ({marginLeft}) => (
    <View
      style={[
        {
          height: responsiveHeight(0.2),
          backgroundColor: 'gray',
          // width: '100%',
          marginLeft: marginLeft ? marginLeft : responsiveHeight(-6),
        },
      ]}
    />
  );
  const [secondHeader, setSecondHeader] = useState(true);
  const [withTop, setWithTop] = useState(false);
  const [topInvoice, setTopInvoice] = useState(false);
  const [dataQuantity, setDataQuantity] = useState(0);
  const CustomNameInfo = ({first, detail}) => {
    return (
      <View style={[GlobalStyle.flexData]}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: responsiveFontSize(0.7),
            borderColor: 'gray',
            borderWidth: 0.7,
            height: responsiveHeight(2),
            textAlignVertical: 'center',
            paddingHorizontal: responsiveWidth(2),
            width: '25%',
            textTransform: 'uppercase',
            backgroundColor: '#bbe4e9',
          }}>
          {first}:
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: responsiveFontSize(0.65),
            borderColor: 'gray',
            borderWidth: 0.7,
            height: responsiveHeight(2),
            textTransform: 'uppercase',
            textAlignVertical: 'center',
            paddingHorizontal: responsiveWidth(2),
            width: '35%',
          }}>
          {detail}
        </Text>
      </View>
    );
  };
  const [loadingImage, setLoadingImage] = useState(false);
  const [pdfData, setPdfData] = useState('');
  const getImage = () => {
    setLoadingImage(true);
    try {
      fieldBill?.length > 141 &&
        fourRef.current?.capture().then(uri => {
          setPdfData(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'four');
        });
      fieldBill?.length > 90 &&
        thirdRef.current?.capture().then(uri => {
          setThird(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'third');
        });
      fieldBill?.length > 39 &&
        secondRef.current?.capture().then(uri => {
          setSecond(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'second');
        });
      fieldBill?.length > 0 &&
        ref.current?.capture().then(uri => {
          setImageUrl(uri);
          setLoadingImage(false);
          console.log('do something with ', uri, 'first');
        });
      setLoadingImage(false);
    } catch (error) {
      setLoadingImage(false);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <HeaderIcon
        fontSize={responsiveFontSize(1.5)}
        marginLeft={responsiveWidth(21)}
        text={`Bill by ${nameSearch}`}
        buttonThird={
          nameSearch && (
            <TouchableOpacity
              onPress={() => {
                setNameSearch(''), setDataBilling([]);
              }}
              style={{
                marginLeft: responsiveWidth(17),
                backgroundColor: '#00000030',
                borderRadius: 5,
                paddingVertical: 2,
                paddingHorizontal: 6,
              }}>
              <Text style={{color: 'black', fontSize: 12}}>Search</Text>
            </TouchableOpacity>
          )
        }
      />
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

      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'black'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: 'white'}}>
          {!nameSearch && (
            <View
              style={{
                marginTop: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(5),
              }}>
              <CustomInput
                // style={{width: responsiveWidth(78)}}
                leftIcon={'search'}
                placeholder="Enter company name"
                value={search}
                onChangeText={e => setSearch(e)}
                // rightIcon={'funnel-outline'}
                // offIcon={'funnel-outline'}
                onSubmitEditing={() => {}}
                fontWeight="500"
                style={{}}
              />
              <View style={{alignItems: 'flex-end'}}>
                <CustomButton
                  paddingVertical={responsiveHeight(0.001)}
                  buttonText={'Search'}
                  disabled={search.length > 3 ? false : true}
                  buttonColor={search.length > 3 ? '#06ABEB' : '#06ABEB90'}
                  onPress={() => {
                    Keyboard.dismiss();
                    setDownloadName(search);
                    setNameSearch(search);
                    GetAllDataByCompany(search);
                  }}
                />
              </View>
            </View>
          )}
          <View
            style={
              {
                // paddingHorizontal: responsiveWidth(1),
              }
            }>
            {fieldBill?.length > 0 ? (
              <View
                style={[
                  {
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(1.5),
                    // backgroundColor: 'white',
                    marginBottom: responsiveHeight(1),
                    marginTop: responsiveHeight(1),
                  },
                ]}>
                <ViewShot
                  ref={ref}
                  options={{quality: 0.8}}
                  style={[
                    {
                      backgroundColor: 'white',
                      height: 600,
                      paddingHorizontal: responsiveWidth(1),
                    },
                    GlobalStyle.shadow,
                  ]}>
                  <View style={{backgroundColor: 'white',marginBottom:responsiveHeight(2)}}>
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
                  <View style={{marginBottom: responsiveHeight(2)}}>
                    <CustomNameInfo
                      first={'Name'}
                      detail={fieldBill[0]?.name}
                    />
                    <CustomNameInfo
                      first={'Company Name'}
                      detail={fieldBill[0]?.company}
                    />
                    <CustomNameInfo
                      first={'Email'}
                      detail={fieldBill[0]?.email}
                    />
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#525260',
                      // marginHorizontal: responsiveWidth(-5),
                    }}
                  />
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        overflow: 'hidden',
                        justifyContent: 'space-between',
                        backgroundColor: '#bbe4e9',
                      },
                    ]}>
                    <View
                      style={[
                        styles.tableHeading,
                        {
                          borderLeftColor: 'gray',
                          borderLeftWidth: 1,
                          width: responsiveWidth(10),
                        },
                      ]}>
                      <Text style={styles.tableHeadingText}>Inv No:</Text>
                      <LineBetween marginLeft={responsiveHeight(0.1)} />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(10)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Date:</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(16)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Bl NO</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(13)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Name</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(15)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Customer</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(7)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Cre</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(7)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Deb</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(8)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Total</Text>
                      <LineBetween />
                    </View>
                  </View>
                  {fieldBill?.slice(0, 39)?.map((item, i) => {
                    //  this is for container price and quantity
                    var totalQuantity = 0;
                    for (let index = 0; index < fieldBill?.length; index++) {
                      // console.log(index, 'asdf');
                      // const element = fieldBill2[index];
                      const quantity = Number(fieldBill[index]?.paidAmount);
                      totalQuantity += quantity;
                      // setGetPaidAmount(totalQuantity);
                    }

                    //  this is for extracharge price and quantity
                    // let totalQuantityCharge = 0;
                    // for (
                    //   let index = 0;
                    //   index < item?.extraChargeData?.length;
                    //   index++
                    // ) {
                    //   // console.log(index, 'asdf');
                    //   // const element = GetExtraCharge[index];
                    //   const quantity =
                    //     Number(item?.extraChargeData[index]?.price) *
                    //     Number(item?.extraChargeData[index]?.Qty);
                    //   totalQuantityCharge += quantity;
                    // }
                    // const addWithExtra = Number(totalQuantity)
                    //   ? Number(totalQuantity)
                    //   : 0 + Number(totalQuantityCharge)
                    //   ? Number(totalQuantityCharge)
                    //   : 0;
                    // const findVatPercentage =
                    //   (Number(item?.vatPercentage) / 100) * addWithExtra;
                    // const addWithVatPercentage =
                    //   findVatPercentage + addWithExtra;
                    const dataItem = -2000;
                    const itemData = `${item?.paidAmount}`;
                    // const getFirst=itemData.c
                    console.log(itemData[0], 'this is the owner');
                    return (
                      <View key={i} style={{overflow: 'hidden'}}>
                        <View
                          style={[
                            GlobalStyle.flexJustify,
                            {
                              backgroundColor: item?.creditAmount
                                ? 'red'
                                : itemData[0] == '-'
                                ? 'red'
                                : 'white',
                            },
                          ]}>
                          <View
                            style={{
                              width: responsiveWidth(8.5),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.invoice_number}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(10),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.date}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(16),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.bl_no}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(13),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(15),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.fieldsData[0]?.customer_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(7.1),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.paidAmount ? item?.paidAmount : 0}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(7.1),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {item?.creditAmount ? item?.creditAmount : 0}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(9),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                              borderRightColor: 'gray',
                              borderRightWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {
                                  color: item?.creditAmount
                                    ? 'white'
                                    : itemData[0] == '-'
                                    ? 'white'
                                    : 'black',
                                },
                              ]}>
                              {Number(item?.paidAmount) -
                                Number(item?.creditAmount)}
                            </Text>
                          </View>
                        </View>
                        <LineBetween />
                      </View>
                    );
                  })}
                  {fieldBill.length < 40 && (
                    <Fragment>
                      <View style={[GlobalStyle.flexJustify, {}]}>
                        <View
                          style={[
                            styles.tableHeading,
                            {
                              width: responsiveWidth(48),
                              borderLeftWidth: 1,
                              borderLeftColor: 'gray',
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
                          style={[styles.tableHeading, {alignItems: 'center'}]}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1),
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              // alignSelf: 'center',
                              width: responsiveWidth(13),
                              // height: responsiveHeight(2.5),
                              // textAlign: 'center',
                              textAlignVertical: 'center',
                              color: 'black',
                              backgroundColor: 'white',
                            }}>
                            {totalQuantity ? totalQuantity : 0}
                          </Text>
                        </View>
                      </View>
                      <LineBetween marginLeft={responsiveWidth(0.1)} />
                    </Fragment>
                  )}
                </ViewShot>
                <View
                  style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#00000010',
                  }}
                />
                {fieldBill?.length > 39 && (
                  <ViewShot
                    ref={secondRef}
                    options={{quality: 0.8}}
                    style={[
                      {
                        height: 600,
                        marginTop: responsiveHeight(1),
                        backgroundColor: 'white',
                        paddingHorizontal: responsiveWidth(1),
                      },
                      GlobalStyle.shadow,
                    ]}>
                    {fieldBill.length > 39 && (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            overflow: 'hidden',
                            justifyContent: 'space-between',
                            backgroundColor: '#bbe4e9',
                          },
                        ]}>
                        <View
                          style={[
                            styles.tableHeading,
                            {
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                              width: responsiveWidth(10),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Bl NO</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(13)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Name</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(15)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Customer</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Cre</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Deb</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(8)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Total</Text>
                          <LineBetween />
                        </View>
                      </View>
                    )}
                    {fieldBill?.slice(39, 90)?.map((item, i) => {
                      let totalQuantity = 0;
                      for (
                        let index = 0;
                        index < item?.fieldsData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = fieldBill2[index];
                        const quantity =
                          Number(item?.fieldsData[index]?.price) *
                          Number(item?.fieldsData[index]?.Qty);
                        totalQuantity += quantity;
                      }
                      //  this is for extracharge price and quantity
                      let totalQuantityCharge = 0;
                      for (
                        let index = 0;
                        index < item?.extraChargeData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = GetExtraCharge[index];
                        const quantity =
                          Number(item?.extraChargeData[index]?.price) *
                          Number(item?.extraChargeData[index]?.Qty);
                        totalQuantityCharge += quantity;
                      }
                      const addWithExtra = Number(totalQuantity)
                        ? Number(totalQuantity)
                        : 0 + Number(totalQuantityCharge)
                        ? Number(totalQuantityCharge)
                        : 0;
                      const findVatPercentage =
                        (Number(item?.vatPercentage) / 100) * addWithExtra;
                      const addWithVatPercentage =
                        findVatPercentage + addWithExtra;
                      return (
                        <View key={i} style={{overflow: 'hidden'}}>
                          <View
                            style={[
                              GlobalStyle.flexJustify,
                              {
                                backgroundColor: item?.creditAmount
                                  ? 'red'
                                  : 'white',
                              },
                            ]}>
                            <View
                              style={{
                                width: responsiveWidth(8.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(10),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(16),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.bl_no}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(13),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(15),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.fieldsData[0]?.customer_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.paidAmount ? item?.paidAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.creditAmount ? item?.creditAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(9),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {Number(item?.paidAmount) -
                                  Number(item?.creditAmount)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length < 91 && (
                      <Fragment>
                        <View style={[GlobalStyle.flexJustify, {}]}>
                          <View
                            style={[
                              styles.tableHeading,
                              {
                                width: responsiveWidth(48),
                                borderLeftWidth: 1,
                                borderLeftColor: 'gray',
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
                            style={[
                              styles.tableHeading,
                              {alignItems: 'center'},
                            ]}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1),
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                // alignSelf: 'center',
                                width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
                                backgroundColor: 'white',
                              }}>
                              {totalQuantity ? totalQuantity : 0}
                            </Text>
                          </View>
                        </View>
                        <LineBetween marginLeft={responsiveWidth(0.1)} />
                      </Fragment>
                    )}
                  </ViewShot>
                )}
                <View
                  style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#00000010',
                  }}
                />
                {/* ----------------third page data */}
                {fieldBill?.length > 90 && (
                  <ViewShot
                    options={{quality: 0.8}}
                    ref={thirdRef}
                    style={[
                      {
                        height: 600,
                        backgroundColor: 'white',
                        marginTop: responsiveHeight(1),
                        paddingHorizontal: responsiveWidth(1),
                      },
                      GlobalStyle.shadow,
                    ]}>
                    {fieldBill.length > 90 && (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            overflow: 'hidden',
                            justifyContent: 'space-between',
                            backgroundColor: '#bbe4e9',
                          },
                        ]}>
                        <View
                          style={[
                            styles.tableHeading,
                            {
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                              width: responsiveWidth(10),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Bl NO</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(13)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Name</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(15)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Customer</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Cre</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Deb</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(8)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Total</Text>
                          <LineBetween />
                        </View>
                      </View>
                    )}
                    {fieldBill?.slice(90, 141)?.map((item, i) => {
                      let totalQuantity = 0;
                      for (
                        let index = 0;
                        index < item?.fieldsData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = fieldBill2[index];
                        const quantity =
                          Number(item?.fieldsData[index]?.price) *
                          Number(item?.fieldsData[index]?.Qty);
                        totalQuantity += quantity;
                      }
                      let totalQuantityCharge = 0;
                      for (
                        let index = 0;
                        index < item?.extraChargeData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = GetExtraCharge[index];
                        const quantity =
                          Number(item?.extraChargeData[index]?.price) *
                          Number(item?.extraChargeData[index]?.Qty);
                        totalQuantityCharge += quantity;
                      }
                      const addWithExtra = Number(totalQuantity)
                        ? Number(totalQuantity)
                        : 0 + Number(totalQuantityCharge)
                        ? Number(totalQuantityCharge)
                        : 0;
                      const findVatPercentage =
                        (Number(item?.vatPercentage) / 100) * addWithExtra;
                      const addWithVatPercentage =
                        findVatPercentage + addWithExtra;
                      return (
                        <View key={i} style={{overflow: 'hidden'}}>
                          <View
                            style={[
                              GlobalStyle.flexJustify,
                              {
                                backgroundColor: item?.creditAmount
                                  ? 'red'
                                  : 'white',
                              },
                            ]}>
                            <View
                              style={{
                                width: responsiveWidth(8.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(10),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(16),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.bl_no}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(13),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(15),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.fieldsData[0]?.customer_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.paidAmount ? item?.paidAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.creditAmount ? item?.creditAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(9),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {Number(item?.paidAmount) -
                                  Number(item?.creditAmount)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length < 142 && (
                      <Fragment>
                        <View style={[GlobalStyle.flexJustify, {}]}>
                          <View
                            style={[
                              styles.tableHeading,
                              {
                                width: responsiveWidth(48),
                                borderLeftWidth: 1,
                                borderLeftColor: 'gray',
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
                            style={[
                              styles.tableHeading,
                              {alignItems: 'center'},
                            ]}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1),
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                // alignSelf: 'center',
                                width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
                                backgroundColor: 'white',
                              }}>
                              {totalQuantity ? totalQuantity : 0}
                            </Text>
                          </View>
                        </View>
                        <LineBetween marginLeft={responsiveWidth(0.1)} />
                      </Fragment>
                    )}
                  </ViewShot>
                )}
                <View
                  style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#00000010',
                  }}
                />
                {fieldBill?.length > 141 && (
                  <ViewShot
                    ref={fourRef}
                    options={{quality: 0.8}}
                    style={[
                      {
                        height: 600,
                        backgroundColor: 'white',
                        marginTop: responsiveHeight(1),
                        paddingHorizontal: responsiveWidth(1),
                      },
                      GlobalStyle.shadow,
                    ]}>
                    {fieldBill.length > 140 && (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            overflow: 'hidden',
                            justifyContent: 'space-between',
                            backgroundColor: '#bbe4e9',
                          },
                        ]}>
                        <View
                          style={[
                            styles.tableHeading,
                            {
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                              width: responsiveWidth(10),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Bl NO</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(13)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Name</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(15)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Customer</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Cre</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Deb</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(8)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Total</Text>
                          <LineBetween />
                        </View>
                      </View>
                    )}
                    {fieldBill?.slice(141, 192)?.map((item, i) => {
                      let totalQuantity = 0;
                      for (
                        let index = 0;
                        index < item?.fieldsData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = fieldBill2[index];
                        const quantity =
                          Number(item?.fieldsData[index]?.price) *
                          Number(item?.fieldsData[index]?.Qty);
                        totalQuantity += quantity;
                      }
                      let totalQuantityCharge = 0;
                      for (
                        let index = 0;
                        index < item?.extraChargeData?.length;
                        index++
                      ) {
                        // console.log(index, 'asdf');
                        // const element = GetExtraCharge[index];
                        const quantity =
                          Number(item?.extraChargeData[index]?.price) *
                          Number(item?.extraChargeData[index]?.Qty);
                        totalQuantityCharge += quantity;
                      }
                      const addWithExtra = Number(totalQuantity)
                        ? Number(totalQuantity)
                        : 0 + Number(totalQuantityCharge)
                        ? Number(totalQuantityCharge)
                        : 0;
                      const findVatPercentage =
                        (Number(item?.vatPercentage) / 100) * addWithExtra;
                      const addWithVatPercentage =
                        findVatPercentage + addWithExtra;
                      return (
                        <View key={i} style={{overflow: 'hidden'}}>
                          <View
                            style={[
                              GlobalStyle.flexJustify,
                              {
                                backgroundColor: item?.creditAmount
                                  ? 'red'
                                  : 'white',
                              },
                            ]}>
                            <View
                              style={{
                                width: responsiveWidth(8.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(10),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(16),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.bl_no}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(13),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(15),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.fieldsData[0]?.customer_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.paidAmount ? item?.paidAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.1),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {item?.creditAmount ? item?.creditAmount : 0}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(9),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {
                                    color: item?.creditAmount
                                      ? 'white'
                                      : 'black',
                                  },
                                ]}>
                                {Number(item?.paidAmount) -
                                  Number(item?.creditAmount)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length > 140 && (
                      <Fragment>
                        <View style={[GlobalStyle.flexJustify, {}]}>
                          <View
                            style={[
                              styles.tableHeading,
                              {
                                width: responsiveWidth(48),
                                borderLeftWidth: 1,
                                borderLeftColor: 'gray',
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
                            style={[
                              styles.tableHeading,
                              {alignItems: 'center'},
                            ]}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1),
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                // alignSelf: 'center',
                                width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
                                backgroundColor: 'white',
                              }}>
                              {totalQuantity ? totalQuantity : 0}
                            </Text>
                          </View>
                        </View>
                        <LineBetween marginLeft={responsiveWidth(0.1)} />
                      </Fragment>
                    )}
                  </ViewShot>
                )}
                <View style={{height: responsiveHeight(3)}} />
                <View
                  style={[
                    {
                      // paddingHorizontal: responsiveWidth(5),
                      backgroundColor: 'white',
                      marginTop: responsiveHeight(2),
                      borderRadius: 8,
                      padding: 6,
                      // margin: 2,
                    },
                    GlobalStyle.shadow,
                  ]}>
                  <CustomInput
                    noIcon={true}
                    placeholder={'Enter File Name'}
                    bgColor={downloadName.length > 4 && '#00000010'}
                    onChangeText={e => setDownloadName(e)}
                    value={downloadName}
                    // style={{marginTop: responsiveHeight(3)}}
                  />
                  <View style={{alignItems: 'flex-end'}}>
                    <CustomButton
                      loading={loadingImage}
                      buttonColor={downloadName.length < 3 && '#00000020'}
                      disabled={downloadName.length < 3 ? true : false}
                      buttonText={!imageUrl ? 'Generate pdf' : 'Download'}
                      width={
                        !imageUrl ? responsiveWidth(50) : responsiveWidth(40)
                      }
                      onPress={() => {
                        getNextLetter();
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

                        // ref.current.capture().then(uri => {
                        //   setImageUrl(uri);
                        //   // console.log('do something with ', uri);
                        // });
                        // secondRef.current.capture().then(uri => {
                        //   setSecond(uri);
                        //   // console.log('do something with ', uri);
                        // });
                        // thirdRef.current.capture().then(uri => {
                        //   setThird(uri);
                        //   // console.log('do something with ', uri);
                        // });
                        // fourRef.current.capture().then(uri => {
                        // setPdfData(uri);
                        const pages4 = [
                          {imagePath: imageUrl},
                          {imagePath: second},
                          {imagePath: third},
                          {imagePath: pdfData},
                        ];
                        const pages3 = [
                          {imagePath: imageUrl},
                          {imagePath: second},
                          {imagePath: third},
                        ];
                        const pages2 = [
                          {imagePath: imageUrl},
                          {imagePath: second},
                        ];
                        const pages = [{imagePath: imageUrl}];
                        const options = {
                          pages:
                            fieldBill?.length > 141
                              ? pages4
                              : fieldBill?.length > 90
                              ? pages3
                              : fieldBill?.length > 39
                              ? pages2
                              : pages,
                          // outputPath: `file://${RNBlobUtil.fs.dirs.DownloadDir}/file.pdf`,
                          outputPath: `file://${downloadPath}`,
                        };
                        imageUrl
                          ? createPdf(options)
                              .then(path => {
                                console.log(
                                  `PDF created successfully: ${path}`,
                                );
                                Alert.alert(
                                  'Success',
                                  'Your file was downloaded',
                                  [
                                    {
                                      text: 'Ok',
                                      onPress: () => {
                                        navigation.navigate('Drawer');
                                      },
                                    },
                                  ],
                                );
                              })
                              .catch(error =>
                                console.log(`Failed to create PDF: ${error}`),
                              )
                          : getImage();
                        // });
                        // amountRef.current.capture().then(uri => {
                        // });
                      }}
                    />
                  </View>
                  {/* {pdfData && (
                    <CustomButton
                      buttonText={'Share'}
                      width={responsiveWidth(40)}
                      onPress={async () => {
                        const option = {
                          message: pdfData,
                          title: 'Hamid Bhai',
                        };
                        await Share.open({urls:[ extraData,pdfData]})
                          .then(res => {
                            console.log(res,'new share');
                          })
                          .catch(err => {
                            err && console.log(err);
                          });
                      }}
                    />
                  )} */}
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: responsiveHeight(8),
                }}>
                <Text style={{color: 'black'}}>
                  No Data available
                  <Text style={{fontWeight: 'bold'}}> {nameSearch}</Text>
                </Text>
              </View>
            )}
          </View>
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
                    setType(item.option);
                    setAllData()
                    setOpenBarType(false);
                    GetAllDataByCompany();
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
                setType('All');
                setAllData(fieldBillData);
                setOpenBarType(false);
                // GetAllDataByCompany();
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
    </View>
  );
};

export default CompanyName;

const styles = StyleSheet.create({
  headingAssign: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1),
    // width: responsiveWidth(30),
  },
  textAssign: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: responsiveFontSize(1.2),
  },
  tableHeading: {
    borderRightColor: 'gray',
    backgroundColor: '#bbe4e9',
    borderRightWidth: 1,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    // borderLeftColor: 'gray',
    // borderLeftWidth: 1,
    // paddingHorizontal: responsiveWidth(1),
    // height: '100%',
    // width: responsiveWidth(14),
  },
  tableHeadingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(0.6),
    // paddingHorizontal: responsiveWidth(1),
    // height: responsiveHeight(2),
    paddingVertical: responsiveHeight(0.2),
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  textDescription: {
    fontSize: responsiveFontSize(0.6),
    textTransform: 'uppercase',
    alignSelf: 'center',
    // width: responsiveWidth(13),
    height: responsiveHeight(1.3),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
});

{
  /* {fieldBill?.map((item, i) => (
                        <View key={i}>
                          <Text style={styles.textDescription}>
                            {item?.bl_no}
                          </Text>
                          <LineBetween />
                        </View>
                      ))} */
}
{
  /* {fieldBill?.map((item, i) => {
                        return (
                          <View key={i}>
                            <Text style={styles.textDescription}>
                              {item?.name}
                            </Text>
                            <LineBetween />
                          </View>
                        );
                      })} */
}
{
  /* {fieldBill?.map((item, i) => {
                        return (
                          <View key={i}>
                            <Text style={styles.textDescription}>
                              {item?.fieldsData[0]?.cutomer_name}
                            </Text>
                            <LineBetween />
                          </View>
                        );
                      })} */
}
{
  /* {fieldBill?.map((item, i) => (
                        <Fragment key={i}>
                          <Text style={styles.textDescription}>
                            {item?.price}
                          </Text>
                          <LineBetween />
                        </Fragment>
                      ))} */
}
{
  /* {fieldBill?.map((item, i) => (
                        <Fragment key={i}>
                          <Text style={styles.textDescription}>
                            {item?.Qty}
                          </Text>
                          <LineBetween />
                        </Fragment>
                      ))} */
}
{
  /* {fieldBill?.map((item, i) => {
                        let totalQuantity = 0;
                        for (
                          let index = 0;
                          index < item?.fieldsData?.length;
                          index++
                        ) {
                          const quantity =
                            Number(item?.fieldsData[index]?.price) *
                            Number(item?.fieldsData[index]?.Qty);
                          totalQuantity += quantity;
                        }

                        return (
                          <Fragment key={i}>
                            <View key={i} style={{alignItems: 'center'}}>
                              <Text style={styles.textDescription}>
                                {totalQuantity ? totalQuantity : '0'}
                              </Text>
                            </View>
                            <LineBetween />
                          </Fragment>
                        );
                      })} */
}
