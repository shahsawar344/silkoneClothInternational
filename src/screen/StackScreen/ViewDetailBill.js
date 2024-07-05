import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import CustomButton from '../../component/CustomButton';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import {DeleteBill, DeleteBillApi} from '../../utils/services';
import {createPdf} from 'react-native-images-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import CustomInput from '../../component/CustomInput';
import {JustIcon} from '../../component/CustomIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CustomModel, CustomModelDelete} from '../../component/CustomModel';
import Share from 'react-native-share';

const ViewDetailBill = ({navigation, route}) => {
  const item = route.params ? route.params : '';
  const companyBill = item?.getAllData;
  const addExtraLine =
    item?.extraCharge?.length > 0 ? item?.extraCharge : Array.from({length: 1});
  const extraCharge = addExtraLine;
  // console.log(item.extraCharge, 'sdf');
  const [imageUrl, setImageUrl] = useState('');
  // const fieldBill = item?.fields;
  const fieldBill2 = item?.fields;
  const setOfArray =
    fieldBill2?.length > 4 ? Array.from({length: 1}) : Array.from({length: 5});
  const fieldBill = fieldBill2;
  const totalSum = fieldBill2?.reduce((acc, item) => {
    // Convert the "total" value to a number and add it to the accumulator
    const totalValue = Number(item?.total);
    return acc + (isNaN(totalValue) ? 0 : totalValue);
  }, 0);
  let totalQuantity = 0;
  for (let index = 0; index < fieldBill2?.length; index++) {
    // console.log(index, 'asdf');
    // const element = fieldBill2[index];
    const quantity = fieldBill2[index]?.price * fieldBill2[index]?.Qty;
    totalQuantity += quantity;
  }
  const GetExtraCharge = item?.extraCharge;
  let totalQuantityCharge = 0;
  for (let index = 0; index < GetExtraCharge?.length; index++) {
    // console.log(index, 'asdf');
    // const element = GetExtraCharge[index];
    const quantity = GetExtraCharge[index]?.price * GetExtraCharge[index]?.Qty;
    totalQuantityCharge += quantity;
  }
  // console.log(totalQuantity, 'new own');
  const addWithExtra = totalQuantity + Number(totalQuantityCharge);
  const findVatPercentage =
    (Number(companyBill?.vatPercentage) / 100) * addWithExtra;
  const addWithVatPercentage = findVatPercentage + addWithExtra;
  const number = addWithVatPercentage;
  const decimalPart = (number % 1).toFixed(3).split('.')[1];
  // console.log(decimalPart,'new party');
  const checkDAta = i =>
    Number(fieldBill[i]?.price) * Number(fieldBill[i]?.Qty);

  const [valueGet, setValueGet] = useState(0);

  // console.log(checkDAta(0));
  // console.log(
  //   addWithExtra,
  //   '<=== with extra charge  ==> vatpercentage',
  //   findVatPercentage,
  //   '=======>',
  //   addWithVatPercentage,
  //   'sdf',
  // );
  const CustomNameInfo = ({first, detail}) => {
    return (
      <View style={[GlobalStyle.flexData]}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: responsiveFontSize(0.78),
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            borderRightColor: 'gray',
            borderRightWidth: 0.5,
            borderLeftColor: 'gray',
            borderLeftWidth: 0.5,
            height: responsiveHeight(1.7),
            textAlignVertical: 'center',
            paddingHorizontal: responsiveWidth(2),
            width: '25%',
            // paddingVertical: 1,
            textTransform: 'uppercase',
            // backgroundColor: '#bbe4e9',
          }}>
          {first}:
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: responsiveFontSize(0.77),
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            borderRightColor: 'gray',
            borderRightWidth: 0.5,
            // borderLeftColor: 'gray',
            // borderLeftWidth: 0.5,
            height: responsiveHeight(1.7),
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
  const DeleteServer = async () => {
    try {
      const result = await DeleteBill();
    } catch (error) {
      console.error(error);
    }
  };
  const ref = useRef();
  const LineBetween = ({marginLeft}) => (
    <View
      style={[
        {
          height: responsiveHeight(0.1),
          backgroundColor: 'gray',
          // width: '100%',
          marginLeft: marginLeft ? marginLeft : responsiveHeight(-3),
        },
      ]}
    />
  );
  function numberToWords(num) {
    const units = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    const teens = [
      '',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const tens = [
      '',
      'ten',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    function convertChunk(chunk) {
      const hundred = Math.floor(chunk / 100);
      const remainder = chunk % 100;

      let result = '';
      if (hundred > 0) {
        result += units[hundred] + ' hundred';
        if (remainder > 0) {
          result += ' and ';
        }
      }

      if (remainder === 10) {
        result += tens[1]; // Special case for 10
      } else if (remainder > 10 && remainder < 20) {
        result += teens[remainder - 10];
      } else {
        const ten = Math.floor(remainder / 10);
        const one = remainder % 10;
        if (ten > 0) {
          result += tens[ten];
          if (one > 0) {
            result += ' ';
          }
        }
        if (one > 0) {
          result += units[one];
        }
      }

      return result;
    }

    if (num === 0) {
      return 'zero';
    }

    const chunks = [];
    let remaining = num;

    while (remaining > 0) {
      chunks.push(remaining % 1000);
      remaining = Math.floor(remaining / 1000);
    }

    const chunkWords = chunks.map((chunk, index) => {
      const chunkWord = convertChunk(chunk);
      const suffix =
        index > 0 ? ` ${['', 'thousand', 'million', 'billion'][index]}` : '';
      return chunkWord + suffix;
    });

    return chunkWords.reverse().join(' ').trim();
  }

  // Example usage:
  const zeroWithout = Math.trunc(addWithVatPercentage);
  const result = numberToWords(zeroWithout);
  const paisa = numberToWords(decimalPart);
  console.log(decimalPart, 'new things', paisa);
  // console.log(result); // Output: ten
  const [withTop, setWithTop] = useState(false);
  const [secondHeader, setSecondHeader] = useState(false);
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
  // useEffect(() => {
  //   getNextLetter();
  // }, []);
  // console.log(
  //   currentLetter + getCurrentDate + getMonthAbbreviation + randomInt,
  // );

  function generateAlphabetSequence() {
    const result = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < characters?.length; i++) {
      result.push(characters[i]);
    }

    for (let i = 0; i < characters.length; i++) {
      for (let j = 0; j < characters.length; j++) {
        result.push(characters[i] + characters[j]);
      }
    }

    return result;
  }
  const [currentAlphabet, setCurrentAlphabet] = useState('a');

  const generateNextAlphabet = () => {
    // Function to generate the next alphabet
    const nextAlphabet = current => {
      const lastChar = current.slice(-1);

      if (lastChar !== 'z') {
        // If the last character is not 'z', increment it
        return (
          current.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1)
        );
      } else {
        // If the last character is 'z', append 'a' to it
        return current + 'a';
      }
    };

    // Update the state with the next alphabet
    setCurrentAlphabet(nextAlphabet(currentAlphabet));
  };
  const [loadingDelete, setLoadingDelete] = useState(false);

  const DeleteBillId = async () => {
    setLoadingDelete(true);
    try {
      const result = await DeleteBillApi(item?.delete);
      // console.log(result, 'new things');
      if (result.status == true) {
        setLoadingDelete(false);
        Alert.alert('Alert', 'Bill deleted', [
          {text: 'Ok', onPress: () => navigation.navigate('AllData')},
        ]);
      } else {
        setLoadingDelete(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };
  const alphabetSequence = generateAlphabetSequence();
  const [downloadName, setDownloadName] = useState(
    companyBill?.invoice_no ? companyBill?.invoice_no : '',
  );
  const shareImage = async () => {
    ref.current.capture().then(async uri => {
      await Share.open({url: uri});
    });
  };
  const [stampOn, setStampOn] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);
  // console.log(alphabetSequence);
  // console.log(getMonth, 'fasdf', getCurrentDate);
  const customButton = [
    {iconName: 'create-outline', nav: 'Download', title: 'Else'},
    {iconName: 'download-outline', nav: 'Download', title: 'Else'},
    {iconName: 'heading', nav: 'Header', title: 'headingFirst'},
    {iconName: 'stamp', nav: 'Header', title: 'Else'},
    {iconName: 'heading', nav: 'Header', title: 'two'},
    {iconName: 'share', nav: 'Download', title: 'Else'},
    {iconName: 'trash-outline', nav: 'Download', title: 'Else'},
  ];
  const [topInvoice, setTopInvoice] = useState(false);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff30'}}>
      <HeaderIcon marginLeft={responsiveWidth(25)} text={'View Invoice'} />
      {/* <CustomButton
        buttonText={'With LetterHead'}
        onPress={() => {
          setWithTop(!withTop);
        }}
      /> */}
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
              // withTop == true && setTopInvoice(false);
              // secondHeader == true && setTopInvoice(false);
              itemMap?.iconName == 'create-outline'
                ? navigation.navigate('AddBill', {item})
                : itemMap?.iconName == 'download-outline'
                ? setDownloadModel(true)
                : itemMap?.title == 'headingFirst'
                ? (setWithTop(!withTop), setSecondHeader(false))
                : itemMap?.title == 'two'
                ? (setSecondHeader(!secondHeader), setWithTop(false))
                : itemMap?.iconName == 'stamp'
                ? setStampOn(!stampOn)
                : itemMap?.iconName == 'share'
                ? shareImage()
                : DeleteBillId();
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
      <ViewShot
        options={{quality: 0.8}}
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(1.5),
          marginTop: responsiveHeight(1),
          backgroundColor: '#fff',
          height: 580,
        }}
        ref={ref}>
        <View
          style={{
            backgroundColor: 'white',
            // marginTop: responsiveHeight(2),
          }}>
          <View
            style={{
              marginBottom: responsiveHeight(2),
              // paddingHorizontal: responsiveWidth(5),
            }}>
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
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                color: '#d3d3d3',
                alignSelf: 'center',
                fontWeight: '900',
                marginTop: !topInvoice
                  ? responsiveHeight(9)
                  : !secondHeader
                  ? -11
                  : -3,
              }}>
              INVOICE
            </Text>
            <View style={GlobalStyle.flexJustify}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  color: 'black',
                  borderWidth: 0.5,
                  borderColor: '#00000090',
                  borderRadius: 3,
                  paddingHorizontal: responsiveWidth(1),
                  paddingVertical: 2,
                  // alignSelf: 'flex-end',
                }}>
                Invoice :
                <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                  {' '}
                  {companyBill?.invoice_no}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  color: 'black',
                  borderWidth: 0.5,
                  borderColor: '#00000090',
                  borderRadius: 3,
                  paddingHorizontal: responsiveWidth(1),
                  paddingVertical: 2,
                  // alignSelf: 'flex-end',
                }}>
                Date :
                <Text style={{fontWeight: 'bold'}}> {companyBill?.date}</Text>
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#525260',
                marginTop: responsiveHeight(2),
                width: '60%',
              }}
            />
            <View
              style={{
                borderRightColor: 'gray',
                borderRightWidth: 0.5,
                borderLeftColor: 'gray',
                borderLeftWidth: 0.5,
                width: '60%',
                backgroundColor: '#bbe4e990',
                textTransform: 'uppercase',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1),
                  color: 'black',
                  alignSelf: 'center',

                  // paddingLeft: responsiveWidth(3),
                }}>
                Bill To:
              </Text>
            </View>
            <CustomNameInfo first={'Name'} detail={companyBill?.name} />
            <CustomNameInfo
              first={'Company Name'}
              detail={companyBill?.company}
            />
            <CustomNameInfo first={'Email'} detail={companyBill?.email} />
            <CustomNameInfo
              first={'Vat IN Number'}
              detail={companyBill?.vattax}
            />
          </View>

          {/* --------------invoice for ---------- */}
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
              fontSize: responsiveFontSize(0.9),
              marginVertical: '0.2%',
            }}>
            BL NO :{' '}
            <Text
              style={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: responsiveFontSize(0.96),
              }}>
              {companyBill?.bl_no}
            </Text>
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#525260',
              // marginHorizontal: responsiveWidth(-5),
            }}
          />
          <View
            style={[
              GlobalStyle.flexJustify,
              {
                backgroundColor: '#bbe4e990',
                borderRightColor: 'gray',
                borderRightWidth: 0.5,
              },
            ]}>
            <View
              style={[
                styles.tableHeading,
                {
                  width: responsiveWidth(21),
                  borderLeftColor: 'gray',
                  borderLeftWidth: 0.5,
                },
              ]}>
              <Text style={styles.tableHeadingText}>Container NO</Text>
              <LineBetween marginLeft={responsiveHeight(0.1)} />
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(14)}]}>
              <Text style={styles.tableHeadingText}>Location</Text>
              <LineBetween />
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(21)}]}>
              <Text style={styles.tableHeadingText}>Customer Name</Text>
              <LineBetween />
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(7)}]}>
              <Text style={styles.tableHeadingText}>Price</Text>
              <LineBetween />
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(6)}]}>
              <Text style={styles.tableHeadingText}>Qty</Text>
              <LineBetween />
            </View>
            <View style={[{width: responsiveWidth(9)}]}>
              <View
                style={{
                  backgroundColor: '#bbe4e990',
                }}>
                <Text style={styles.tableHeadingText}>Total</Text>
              </View>
              <LineBetween />
            </View>
          </View>
          <View
            style={[
              GlobalStyle.flexJustify,
              {borderRightWidth: 0.5, borderRightColor: 'gray'},
            ]}>
            <View
              style={[
                styles.tableHeading,
                {
                  width: responsiveWidth(21),
                  borderLeftColor: 'gray',
                  borderLeftWidth: 0.5,
                },
              ]}>
              {fieldBill?.map((item, i) => (
                <View key={i}>
                  <Text style={styles.textDescription}>
                    {item?.container_no}
                  </Text>
                  <LineBetween marginLeft={responsiveHeight(0.1)} />
                </View>
              ))}
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(14)}]}>
              {fieldBill?.map((item, i) => (
                <View key={i}>
                  <Text style={styles.textDescription}>{item?.location}</Text>
                  <LineBetween />
                </View>
              ))}
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(21)}]}>
              {fieldBill?.map((item, i) => (
                <View key={i}>
                  <Text style={styles.textDescription}>
                    {item?.customer_name}
                  </Text>
                  <LineBetween />
                </View>
              ))}
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(7)}]}>
              {fieldBill?.map((item, i) => (
                <View key={i}>
                  <Text style={styles.textDescription}>{item?.price}</Text>
                  <LineBetween />
                </View>
              ))}
            </View>
            <View style={[styles.tableHeading, {width: responsiveWidth(6)}]}>
              {fieldBill?.map((item, i) => (
                <View key={i}>
                  <Text style={styles.textDescription}>{item?.Qty}</Text>
                  <LineBetween />
                </View>
              ))}
            </View>
            <View style={[{width: responsiveWidth(9)}]}>
              {fieldBill?.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <View key={i} style={{alignItems: 'center'}}>
                      <Text style={styles.textDescription}>
                        {checkDAta(i) ? checkDAta(i) : ''}
                      </Text>
                    </View>
                    <LineBetween />
                  </Fragment>
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderLeftWidth: 0.5,
              borderLeftColor: 'gray',
              borderRightWidth: 0.5,
              borderRightColor: 'gray',
              top: -1,
            }}>
            <View style={[GlobalStyle.flexData, {width: responsiveWidth(40)}]}>
              <Text
                style={[
                  styles.tableHeadingText,
                  {
                    // backgroundColor: 'white',
                    // borderLeftWidth: 0.5,
                    // borderLeftColor: 'black',
                  },
                ]}>
                Extra Charge:
              </Text>
              <Text
                style={[
                  // styles.tableHeadingText,
                  {
                    // textAlignVertical: 'center',
                    fontSize: responsiveFontSize(0.7),
                    marginLeft: responsiveWidth(1),
                    color: 'black',
                  },
                ]}>
                {companyBill?.extraCharge ? companyBill?.extraCharge : ''}
              </Text>
            </View>
            {/* <View style={[{}]}> */}
            {/* <View
                style={{
                  borderLeftColor: 'gray',
                  borderLeftWidth: 0.5,
                  width: '24.5%',
                  height: responsiveHeight(4),
                }}> */}
            {/* {extraCharge?.Qty ? extraCharge?.Qty : '0'} */}
            <View
              style={[{width: responsiveWidth(33.6)}, GlobalStyle.flexData]}>
              <View
                style={[
                  // styles.tableHeading,
                  {
                    width: responsiveWidth(10.9),
                    borderLeftColor: 'gray',
                    borderLeftWidth: 0.5,
                    height: '100%',
                  },
                ]}>
                {/* <Text style={styles.tableHeadingText}>Qty</Text>
                <LineBetween /> */}

                {extraCharge.map((item, i) => (
                  <Fragment key={i}>
                    <Text style={styles.textDescription}>{item?.price}</Text>
                    {extraCharge?.length - 1 !== i && (
                      <View style={{height: 0.5, backgroundColor: 'gray'}} />
                    )}
                  </Fragment>
                ))}
              </View>
              <View
                style={[
                  styles.tableHeading,
                  {
                    width: responsiveWidth(9.8),
                    borderLeftColor: 'gray',
                    borderLeftWidth: 0.5,
                    height: '100%',
                  },
                ]}>
                {/* <Text style={styles.tableHeadingText}>Qty</Text>
                <LineBetween /> */}

                {extraCharge.map((item, i) => (
                  <Fragment key={i}>
                    <Text style={styles.textDescription}>{item?.Qty}</Text>
                    {extraCharge?.length - 1 !== i && (
                      <View style={{height: 0.5, backgroundColor: 'gray'}} />
                    )}
                  </Fragment>
                ))}
              </View>
              <View
                style={[
                  // styles.tableHeading,
                  {
                    width: responsiveWidth(17),
                  },
                ]}>
                {/* <Text style={styles.tableHeadingText}>Qty</Text>
                <LineBetween /> */}

                {extraCharge.map((item, i) => {
                  const addCharge =
                    Number(item?.price) * Number(item?.Qty ? item?.Qty : 1);
                  return (
                    <Fragment key={i}>
                      <Text style={styles.textDescription}>
                        {addCharge ? addCharge : ''}
                      </Text>
                      {extraCharge?.length - 1 !== i && (
                        <View
                          style={{
                            height: 0.5,
                            backgroundColor: 'gray',
                            width: responsiveWidth(13),
                          }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </View>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: 'gray',
              top: -1,
            }}
          />
          <View
            style={[
              GlobalStyle.flexJustify,
              {
                borderLeftWidth: 0.5,
                borderLeftColor: 'gray',
                borderRightWidth: 0.5,
                borderRightColor: 'gray',
                top: -1,
              },
            ]}>
            <Text
              style={[
                styles.tableHeadingText,
                {
                  textAlignVertical: 'center',
                  // backgroundColor: 'white',
                },
              ]}>
              Vat Tax:
            </Text>
            <View
              style={[
                GlobalStyle.flexData,
                {justifyContent: 'flex-end', width: responsiveWidth(20.2)},
              ]}>
              <View
                style={{
                  borderLeftColor: 'gray',
                  borderLeftWidth: 0.5,
                  width: responsiveWidth(9.6),
                }}>
                <Text
                  style={[
                    styles.textDescription,
                    {
                      height: responsiveHeight(1.9),
                    },
                  ]}>
                  {companyBill?.vatPercentage
                    ? companyBill?.vatPercentage
                    : '0'}
                  %
                </Text>
              </View>
              <View
                style={{
                  borderLeftColor: 'gray',
                  borderLeftWidth: 0.5,
                  width: responsiveWidth(13.1),
                  height: responsiveHeight(1.9),
                }}>
                <Text style={styles.textDescription}>
                  {findVatPercentage.toFixed(3)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: 'gray',
              top: -1.5,
            }}
          />
          <View
            style={[
              GlobalStyle.flexJustify,
              {
                borderLeftWidth: 0.5,
                borderLeftColor: 'gray',
                borderRightWidth: 0.5,
                borderRightColor: 'gray',
                top: -2,
              },
            ]}>
            <Text
              style={[
                styles.tableHeadingText,
                {
                  // textAlignVertical: 'center',
                  // backgroundColor: 'white',
                },
              ]}>
              Total Amount:
            </Text>
            <View
              style={{
                borderLeftColor: 'gray',
                borderLeftWidth: 0.5,
                width: responsiveWidth(13.1),
                height: responsiveHeight(1.8),
              }}>
              <Text style={styles.textDescription}>
                {addWithVatPercentage?.toFixed(3)}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: 'gray',
              top: -3,
            }}
          />
          <View
            style={[
              GlobalStyle.flexData,
              {
                borderLeftWidth: 0.5,
                borderLeftColor: 'gray',
                borderRightWidth: 0.5,
                borderRightColor: 'gray',
                top: -3,
              },
            ]}>
            <Text
              style={[
                styles.tableHeadingText,
                {
                  // textAlignVertical: 'center',
                  // backgroundColor: 'white',
                },
              ]}>
              Total Amount in WORDS:
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(0.5),
                color: 'black',
                textTransform: 'uppercase',
                marginLeft: responsiveWidth(1),
              }}>
              {result}
              <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                {' '}
                {'RIAL'}{' '}
              </Text>
              {paisa && (
                <>
                  & {paisa}
                  <Text
                    style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                    {' '}
                    {'BZ'}
                  </Text>
                </>
              )}
            </Text>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: 'gray',
              top: -3,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: '16%',
            position: 'absolute',
            left: '7%',
            alignItems: 'center',
            marginHorizontal: responsiveWidth(-3),
          }}>
          <View style={{width: '25%'}}>
            {stampOn ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 50, height: 50}}
                  resizeMode="contain"
                  source={require('../../assets/stamp.png')}
                />
                <Image
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                  source={require('../../assets/sign.png')}
                />
              </View>
            ) : (
              <View style={{width: 50, height: 50}} />
            )}
            <View style={{height: 1, backgroundColor: 'black'}} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: responsiveFontSize(0.7)}}>
              If you have any questions or concerns regarding this invoice,
              please contact at:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(0.7),
                fontWeight: 'bold',
              }}>
              Ph: 96440835,{' '}
              <Text style={{color: 'black', fontSize: responsiveFontSize(0.7)}}>
                {' '}
                Email:
              </Text>{' '}
              Fmtsohar@gmail.com
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          {withTop && (
            <>
              <View style={{height: 1, backgroundColor: 'gray'}} />
              <Image
                resizeMode="contain"
                source={require('../../assets/bottom.png')}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(8),
                  marginHorizontal: responsiveWidth(-3),
                }}
              />
            </>
          )}
          {secondHeader && (
            <>
              <View style={{height: 1, backgroundColor: 'gray'}} />
              <Image
                resizeMode="contain"
                source={require('../../assets/2ndBottom.jpeg')}
                style={{
                  width: 450,
                  height: 50,
                  // height: responsiveHeight(8),
                  marginLeft: responsiveWidth(-15),
                }}
              />
            </>
          )}
        </View>
      </ViewShot>

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
            buttonColor={downloadName.length < 5 && '#00000020'}
            disabled={downloadName.length < 5 ? true : false}
            buttonText={'Download'}
            width={responsiveWidth(40)}
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

              ref.current.capture().then(uri => {
                setImageUrl(uri);
                const options = {
                  pages: [{imagePath: uri}],
                  // outputPath: `file://${RNBlobUtil.fs.dirs.DownloadDir}/file.pdf`,
                  outputPath: `file://${downloadPath}`,
                };
                createPdf(options)
                  .then(path => {
                    console.log(`PDF created successfully: ${path}`);
                    Alert.alert('Success', 'Your file was downloaded', [
                      {
                        text: 'Ok',
                        onPress: () => {
                          setDownloadModel(false);
                          navigation.navigate('AllData');
                        },
                      },
                    ]);
                  })
                  .catch(error =>
                    console.log(`Failed to create PDF: ${error}`),
                  );
                console.log('do something with ', uri);
              });
            }}
          />
        </View>
      </CustomModel>
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          backgroundColor: 'white',
          marginTop: responsiveHeight(2),
        }}>
        {/* <CustomInput
          noIcon={true}
          placeholder={'Enter File Name'}
          bgColor={downloadName.length > 4 && '#00000010'}
          onChangeText={e => setDownloadName(e)}
          value={downloadName}
          style={{marginTop: responsiveHeight(3)}}
        />
        <View style={{alignItems: 'flex-end'}}>
          <CustomButton
            buttonColor={downloadName.length < 5 && '#00000020'}
            disabled={downloadName.length < 5 ? true : false}
            buttonText={'Download'}
            width={responsiveWidth(40)}
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

              ref.current.capture().then(uri => {
                setImageUrl(uri);
                const options = {
                  pages: [{imagePath: uri}],
                  // outputPath: `file://${RNBlobUtil.fs.dirs.DownloadDir}/file.pdf`,
                  outputPath: `file://${downloadPath}`,
                };
                createPdf(options)
                  .then(path => {
                    console.log(`PDF created successfully: ${path}`);
                    Alert.alert('Success', 'Your file was downloaded', [
                      {
                        text: 'Ok',
                        // onPress: () => navigation.navigate('AllData'),
                      },
                    ]);
                  })
                  .catch(error =>
                    console.log(`Failed to create PDF: ${error}`),
                  );
                console.log('do something with ', uri);
              });
            }}
          />
        </View> */}

        {/* {item?.delete && (
          <View>
            <CustomButton
              loading={loadingDelete}
              buttonColor="#1589FF"
              style={{marginTop: responsiveHeight(3)}}
              buttonText={'Update the Bl'}
              onPress={() => {
                // generateNextAlphabet();
                navigation.navigate('AddBill', {item});
                // setCurrentLetter('aa')
              }}
            />
            <CustomButton
              loading={loadingDelete}
              buttonColor="red"
              style={{marginTop: responsiveHeight(3)}}
              buttonText={'Delete'}
              onPress={() => {
                // generateNextAlphabet();
                DeleteBillId();
                // setCurrentLetter('aa')
              }}
            />
          </View>
        )} */}
      </View>
      {/* <Image
        source={{uri: imageUrl}}
        style={{width: responsiveWidth(50), height: responsiveHeight(50)}}
      /> */}
    </ScrollView>
  );
};

export default ViewDetailBill;

const styles = StyleSheet.create({
  tableHeading: {
    borderRightColor: 'gray',
    borderRightWidth: 0.5,
    // paddingHorizontal: responsiveWidth(1),
    // height: '100%',
  },
  tableHeadingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(0.75),
    paddingHorizontal: responsiveWidth(1),
    // width: '100%',
    // height: responsiveHeight(2),
    paddingVertical: responsiveHeight(0.4),
    textTransform: 'uppercase',
    alignItems: 'center',
    // backgroundColor: '#bbe4e9',
  },
  textDescription: {
    fontSize: responsiveFontSize(0.75),
    textTransform: 'uppercase',
    alignSelf: 'center',
    letterSpacing: 0.3,
    // width: responsiveWidth(13),
    // height: responsiveHeight(1.3),
    paddingVertical: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
});
