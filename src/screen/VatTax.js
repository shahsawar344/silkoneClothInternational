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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import HeaderIcon from '../component/HeaderIcon';
import {Ionicons, JustIcon} from '../component/CustomIcons';
import {GetAllBillData} from '../utils/services';
import {createPdf} from 'react-native-images-to-pdf';
import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import {useIsFocused} from '@react-navigation/native';

const VatTax = ({navigation, route}) => {
  const {getDriverReport} = route.params ? route.params : '';
  const fileName = new Date();
  const getMonthAbbreviation = fileName.toLocaleString('default', {
    month: 'short',
  });
  const [allData, setAllData] = useState();

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
  const findDate = new Date().toLocaleDateString();
  // console.log(findDate, 'finnd month');
  const alsoClear = findDate?.charAt(0);
  const [type, setType] = useState(alsoClear);
  const [openBarType, setOpenBarType] = useState(false);
  // console.log(getMonthAbbreviation);
  const getCurrentDate = fileName.getDate();
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  // Example: Generate a random integer between 1 and 10
  const randomInt = getRandomInt(1, 11);
  const [currentLetter, setCurrentLetter] = useState('aa');
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
  const [dataBilling, setDataBilling] = useState([]);
  // const fieldBill = Array.from({length:190});
  const fieldBillWith = dataBilling?.filter(e => e?.vatNo);
  const fieldBillData = allData
    ? allData
    : fieldBillWith?.filter(e => e?.date?.charAt(0) == type);
  const fieldBill = fieldBillData;
  // const findFirst = fieldBillData[0]?.date?.charAt(0);
  // console.log(fieldBillData[48], 'new things are there');

  const [loading, setLoading] = useState(false);

  const ref = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourRef = useRef();
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [downloadName, setDownloadName] = useState('vatReports');
  const [pdfData, setPdfData] = useState('');
  const getImage = () => {
    fieldBill?.length > 0 &&
      ref.current?.capture().then(uri => {
        setImageUrl(uri);
        console.log('do something with ', uri);
      });
    fieldBill?.length > 45 &&
      secondRef.current?.capture().then(uri => {
        setSecond(uri);
        // console.log('do something with ', uri);
      });
    fieldBill?.length > 96 &&
      thirdRef.current?.capture().then(uri => {
        setThird(uri);
        // console.log('do something with ', uri);
      });
    fieldBill?.length > 147 &&
      fourRef.current?.capture().then(uri => {
        setPdfData(uri);
      });
  };
  const [loadingAds, setLoadingAds] = useState(false);

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
  //     },
  //   );
  //   interStitial.load();
  //   return unsubscribe;
  // }, [loadingAds]);
  // const [limit, setLimit] = useState(50);

  const GetAllData = async type => {
    setLoading(true);
    try {
      const result = await GetAllBillData(type);
      // console.log(result?.result?.length, 'new one');
      if (result.status == true) {
        // setLoadingAds(true);
        setDataBilling(result.result);
        setLoading(false);
        // console.log(new Date(Number(result?.result[0]?.date)), 'date');
        setTimeout(() => {
          getImage();
        }, 2000);
        // console.log('true');
      } else {
        setLoading(false);
        console.log('else');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const focus = useIsFocused();
  useEffect(() => {
    GetAllData(type);
  }, [focus]);

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

  // console.log(imageUrl, 'sdf', second);
  let totalQuantity = 0;
  for (let index = 0; index < fieldBill?.length; index++) {
    const quantity =
      Number(fieldBill[index]?.paidAmount) -
      Number(fieldBill[index]?.creditAmount);
    totalQuantity += quantity;
  }
  // console.log(
  //   totalQuantity,
  //   'new things',
  //   fieldBill?.length,
  //   fieldBill[2]?.paidAmount,
  // );

  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon marginLeft={responsiveWidth(20)} text={'VAT REPORTS'} />
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
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator
            size={'large'}
            color={'black'}
            style={{marginTop: responsiveHeight(30)}}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            // paddingHorizontal: responsiveWidth(4),
            marginTop: responsiveHeight(3),
          }}>
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
                    marginBottom: responsiveHeight(1),
                    marginTop: responsiveHeight(1),
                  },
                ]}>
                <ViewShot
                  options={{quality: 0.8}}
                  ref={ref}
                  style={[
                    {
                      backgroundColor: 'white',
                      height: 600,
                      paddingHorizontal: responsiveWidth(1),
                    },
                    GlobalStyle.shadow,
                  ]}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: responsiveHeight(9),
                    }}
                    source={require('../assets/top.png')}
                  />

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
                          width: responsiveWidth(11),
                        },
                      ]}>
                      <Text style={styles.tableHeadingText}>Date:</Text>
                      <LineBetween marginLeft={responsiveHeight(0.1)} />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(16)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Vat No</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(10)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Inv No:</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(16)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Company Name</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(7)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Exact</Text>
                      <LineBetween />
                    </View>
                    <View
                      style={[
                        styles.tableHeading,
                        {width: responsiveWidth(9)},
                      ]}>
                      <Text style={styles.tableHeadingText}>Amount</Text>
                      <LineBetween />
                    </View>
                  </View>
                  {fieldBill?.slice(0, 45)?.map((item, index) => {
                    const addQty =
                      Number(item?.fieldsData[index]?.price) *
                      Number(item?.fieldsData[index]?.Qty);
                    const addExtra =
                      Number(item?.extraChargeData[index]?.price) *
                      Number(item?.extraChargeData[index]?.Qty);
                    // const findPercentage = Number(item?.vatPercentage) / 100;
                    // const totalAmount = Number(addQty) * Number(findPercentage);
                    //  this is for container price and quantity
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
                    let extraQuantity = 0;
                    for (
                      let index = 0;
                      index < item?.extraChargeData?.length;
                      index++
                    ) {
                      const quantity =
                        Number(item?.extraChargeData[index]?.price) *
                        Number(item?.extraChargeData[index]?.Qty);
                      extraQuantity += quantity;
                    }
                    const addTotal = Number(totalQuantity)
                      ? Number(totalQuantity)
                      : 0;
                    const addQuantityTotal = Number(extraQuantity)
                      ? Number(extraQuantity)
                      : 0;
                    let addQuantity =
                      Number(addTotal) + Number(addQuantityTotal);
                    const findPercentage = Number(item?.vatPercentage) / 100;
                    const addPercentageWith =
                      Number(addQuantity) * findPercentage;
                    const totalAmount = Number(addQuantity) + addPercentageWith;

                    return (
                      <View key={index} style={{overflow: 'hidden'}}>
                        <View style={[GlobalStyle.flexJustify]}>
                          <View
                            style={{
                              width: responsiveWidth(6.5),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {item?.date}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(17),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {item?.vatNo}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(11),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {item?.invoice_number}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(17),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {item?.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(7.7),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {addQuantity ? addQuantity : 0}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: responsiveWidth(14.3),
                              borderLeftColor: 'gray',
                              borderLeftWidth: 1,
                              borderRightColor: 'gray',
                              borderRightWidth: 1,
                            }}>
                            <Text
                              style={[
                                styles.textDescription,
                                {color: 'black'},
                              ]}>
                              {totalAmount.toFixed(1)}
                            </Text>
                          </View>
                        </View>
                        <LineBetween />
                      </View>
                    );
                  })}
                  {fieldBill.length < 47 && (
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
                              alignSelf: 'center',
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
                {fieldBill?.length > 46 && (
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
                    {fieldBill.length > 46 && (
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
                              width: responsiveWidth(11),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Vat No</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>
                            Customer Name
                          </Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Exact</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(9)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Amount</Text>
                          <LineBetween />
                        </View>

                        {/* <View
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
                      </View> */}
                      </View>
                    )}
                    {fieldBill?.slice(46, 96)?.map((item, index) => {
                      const addQty =
                        Number(item?.fieldsData[0]?.price) *
                        Number(item?.fieldsData[0]?.Qty);
                      const findPercentage = Number(item?.vatPercentage) / 100;
                      const totalAmount =
                        Number(addQty) * Number(findPercentage);
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
                        <View key={index} style={{overflow: 'hidden'}}>
                          <View style={[GlobalStyle.flexJustify]}>
                            <View
                              style={{
                                width: responsiveWidth(6.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.vatNo}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(11),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.7),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {/* {item?.fieldsData[0]?.price} */}
                                {Number(item?.fieldsData[0]?.price) *
                                  Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(14.3),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {totalAmount +
                                  Number(item?.fieldsData[0]?.price) *
                                    Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length < 97 && (
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
                                // width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
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
                {fieldBill?.length > 96 && (
                  <ViewShot
                    ref={thirdRef}
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
                    {fieldBill.length > 96 && (
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
                              width: responsiveWidth(11),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Vat No</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>
                            Customer Name
                          </Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Exact</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(9)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Amount</Text>
                          <LineBetween />
                        </View>
                      </View>
                    )}
                    {fieldBill?.slice(96, 147)?.map((item, index) => {
                      const addQty =
                        Number(item?.fieldsData[0]?.price) *
                        Number(item?.fieldsData[0]?.Qty);
                      const findPercentage = Number(item?.vatPercentage) / 100;
                      const totalAmount =
                        Number(addQty) * Number(findPercentage);
                      // let totalQuantity = 0;
                      // for (
                      //   let index = 0;
                      //   index < item?.fieldsData?.length;
                      //   index++
                      // ) {
                      //   // console.log(index, 'asdf');
                      //   // const element = fieldBill2[index];
                      //   const quantity =
                      //     Number(item?.fieldsData[index]?.price) *
                      //     Number(item?.fieldsData[index]?.Qty);
                      //   totalQuantity += quantity;
                      // }
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
                      return (
                        <View key={index} style={{overflow: 'hidden'}}>
                          <View style={[GlobalStyle.flexJustify]}>
                            <View
                              style={{
                                width: responsiveWidth(6.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.vatNo}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(11),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.company}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.7),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {Number(item?.fieldsData[0]?.price) *
                                  Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(14.3),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {totalAmount +
                                  Number(item?.fieldsData[0]?.price) *
                                    Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length < 148 && (
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
                                // width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
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
                {fieldBill?.length > 147 && (
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
                    {fieldBill.length > 147 && (
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
                              width: responsiveWidth(11),
                            },
                          ]}>
                          <Text style={styles.tableHeadingText}>Date:</Text>
                          <LineBetween marginLeft={responsiveHeight(0.1)} />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Vat No</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(10)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Inv No:</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(16)},
                          ]}>
                          <Text style={styles.tableHeadingText}>
                            Customer Name
                          </Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(7)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Exact</Text>
                          <LineBetween />
                        </View>
                        <View
                          style={[
                            styles.tableHeading,
                            {width: responsiveWidth(9)},
                          ]}>
                          <Text style={styles.tableHeadingText}>Amount</Text>
                          <LineBetween />
                        </View>
                      </View>
                    )}
                    {fieldBill?.slice(147, 198)?.map((item, index) => {
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
                      const addQty =
                        Number(item?.fieldsData[0]?.price) *
                        Number(item?.fieldsData[0]?.Qty);
                      const findPercentage = Number(item?.vatPercentage) / 100;
                      const totalAmount =
                        Number(addQty) * Number(findPercentage);
                      return (
                        <View key={index} style={{overflow: 'hidden'}}>
                          <View style={[GlobalStyle.flexJustify]}>
                            <View
                              style={{
                                width: responsiveWidth(6.5),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.vatNo}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(11),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(17),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(7.7),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {Number(item?.fieldsData[0]?.price) *
                                  Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(14.3),
                                borderLeftColor: 'gray',
                                borderLeftWidth: 1,
                                borderRightColor: 'gray',
                                borderRightWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.textDescription,
                                  {color: 'black'},
                                ]}>
                                {totalAmount +
                                  Number(item?.fieldsData[0]?.price) *
                                    Number(item?.fieldsData[0]?.Qty)}
                              </Text>
                            </View>
                          </View>
                          <LineBetween />
                        </View>
                      );
                    })}
                    {fieldBill.length > 147 && (
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
                                // width: responsiveWidth(13),
                                // height: responsiveHeight(2.5),
                                // textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
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
                      buttonColor={downloadName.length < 3 && '#00000020'}
                      disabled={downloadName.length < 3 ? true : false}
                      buttonText={!imageUrl ? 'Generate Pdf' : 'Download'}
                      width={
                        !imageUrl ? responsiveWidth(49) : responsiveWidth(40)
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
                            fieldBill?.length > 147
                              ? pages4
                              : fieldBill?.length > 96
                              ? pages3
                              : fieldBill?.length > 45
                              ? pages2
                              : pages,
                          // ],
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
                                      onPress: () =>
                                        navigation.navigate('Drawer'),
                                    },
                                  ],
                                );
                              })
                              .catch(error =>
                                console.log(`Failed to create PDF: ${error}`),
                              )
                          : getImage();
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: responsiveHeight(8),
                }}>
                <Text style={{color: 'black'}}>
                  No vat report available
                  <Text style={{fontWeight: 'bold'}}></Text>
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
                    setAllData();
                    setOpenBarType(false);
                    GetAllData(item.option);
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
                setAllData(fieldBillWith);
                setType('All')
                setOpenBarType(false);
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

export default VatTax;

const styles = StyleSheet.create({
  headingAssign: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1),
    textTransform: 'uppercase',
    // width: responsiveWidth(30),
  },
  textAssign: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: responsiveFontSize(1.2),
    textTransform: 'uppercase',
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
  /* <View style={[GlobalStyle.flexJustify]}>
            <View style={styles.date}>
              <Text style={styles.headerText}>Date</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.headerText}>Inoice No:</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.headerText}>Customer Name</Text>
            </View>
            <View style={styles.location}>
              <Text style={styles.headerText}>Exact</Text>
            </View>
            <View style={styles.customer}>
              <Text style={styles.headerText}>Total Amount</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.headerText}>Vat No</Text>
            </View>
          </View>
          <View style={{}}>
            {filter.map((item, index) => {
              const addQty =
                Number(item?.fieldsData[index]?.price) *
                Number(item?.fieldsData[index]?.Qty);
              const findPercentage = Number(item?.vatPercentage) / 100;
              const totalAmount = addQty * findPercentage;
              return (
                <View key={index} style={GlobalStyle.flexJustify}>
                  <View style={styles.date}>
                    <Text style={styles.descriptionText}>{item?.date}</Text>
                  </View>
                  <View style={[styles.name, {height: responsiveHeight(3)}]}>
                    <Text style={styles.descriptionText}>
                      {item?.date}
                    </Text>
                  </View>
                  <View style={[styles.container, {}]}>
                    <Text style={styles.descriptionText}>{item?.company}</Text>
                  </View>
                  <View style={[styles.location, {}]}>
                    <Text style={styles.descriptionText}>
                      {Number(item?.fieldsData[index]?.price) *
                        Number(item?.fieldsData[index]?.Qty)}
                    </Text>
                  </View>
                  <View style={[styles.customer, {}]}>
                    <Text style={styles.descriptionText}>
                      {totalAmount +
                        Number(item?.fieldsData[index]?.price) *
                          Number(item?.fieldsData[index]?.Qty)}
                    </Text>
                  </View>
                  <View style={[styles.price, {}]}>
                    <Text style={styles.descriptionText}>{item?.vatNo}</Text>
                  </View>
                </View>
              );
            })}
          </View> */
}
