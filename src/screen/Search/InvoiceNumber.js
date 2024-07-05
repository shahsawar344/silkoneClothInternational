import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {
  GetBillDataByCompanyName,
  GetBillDataByInvoiceNumber,
  UpdatePayment,
} from '../../utils/services';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import {GlobalColor} from '../../Color/GlobalColor';
import LottieView from 'lottie-react-native';

const InvoiceNumber = ({navigation, route}) => {
  const {randomNumber} = route?.params ? route?.params : '';
  const [search, setSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [dataBilling, setDataBilling] = useState([]);
  const fieldBill = dataBilling;
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
  const [imageUrl, setImageUrl] = useState('');
  const [extraDataUrl, setExtraDataUrl] = useState('');
  const [downloadName, setDownloadName] = useState('');
  const totalQuantities = fieldBill?.map((item, i) => {
    let totalQuantity = 0;

    for (let index = 0; index < item?.fieldsData?.length; index++) {
      // console.log(item?.fieldsData[1], 'map data');
      const quantity =
        Number(item?.fieldsData[index]?.price) *
        Number(item?.fieldsData[index]?.Qty);
      totalQuantity += quantity;
    }

    return isNaN(totalQuantity) ? 0 : totalQuantity;
  });
  const animationRef = useRef(null);
  // console.log(totalQuantities, 'new thing');

  const sumOfTotalQuantities = totalQuantities.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const UpdatePaymentApi = async (price, id) => {
    setUpdateLoading(true);
    try {
      const result = await UpdatePayment(price, id);
      console.log(result, 'new things');
      if (result.status == true) {
        setSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
        setUpdateLoading(false);
      } else {
        setUpdateLoading(false);
        Alert.alert('Alert', result.message);
      }
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
    }
  };
  // console.log(sumOfTotalQuantities, 'new thing');
  const GetAllDataByCompany = async () => {
      // setLoadingAds(true);
    setLoading(true);
    try {
      const result = await GetBillDataByInvoiceNumber(search);
      // console.log(result, 'new one');
      if (result.status == true) {
        // if (result.result?.length>0) {
        // }
        setDataBilling(result.result);
        setSearch('');
        setLoading(false);
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
  useEffect(() => {
    animationRef.current?.play();
    // console.log('not playing');
  }, [success]);

  const [dataQuantity, setDataQuantity] = useState(
    sumOfTotalQuantities ? sumOfTotalQuantities : 0,
  );
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
  const extraData = useRef();
  const amountRef = useRef();


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
                marginLeft: responsiveWidth(19),
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

      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'black'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{backgroundColor: 'white', flex: 1}}>
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
                  placeholder="Enter invoice number"
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
                      GetAllDataByCompany();
                      setNameSearch(search);
                    }}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                paddingHorizontal: responsiveWidth(1),
              }}>
              {fieldBill?.length > 0 ? (
                <View
                  style={[
                    {
                      paddingVertical: responsiveHeight(1),
                      paddingHorizontal: responsiveWidth(2.5),
                      backgroundColor: 'white',
                      marginBottom: responsiveHeight(1),
                      marginTop: responsiveHeight(1),
                    },
                  ]}>
                  <View style={{marginBottom: responsiveHeight(2)}}>
                    <CustomNameInfo
                      first={'Invoice Number'}
                      detail={fieldBill[0]?.invoice_number}
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
                  {fieldBill?.map((item, i) => (
                    <View
                      key={i}
                      style={[
                        GlobalStyle.shadow,
                        {
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          margin: 2,
                          borderTopRightRadius: 20,
                          borderBottomLeftRadius: 20,
                          paddingHorizontal: responsiveWidth(13),
                          paddingVertical: responsiveHeight(2),
                        },
                      ]}>
                      {success ? (
                        <LottieView
                          style={{width: 170, height: 170, alignSelf: 'center'}}
                          ref={animationRef}
                          source={require('../../assets/loader.json')}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ViewDetailBill', {
                              getAllData: {
                                name: item?.name,
                                company: item?.company,
                                email: item?.email,
                                vattax: item?.vatNo,
                                bl_no: item?.bl_no,
                                extraCharge: item?.extraChargeDescription,
                                vatPercentage: item?.vatPercentage,
                                date: item?.date,
                                invoice_no: item?.invoice_number,
                              },
                              fields: item?.fieldsData,
                              delete: item?._id,
                              extraCharge: item?.extraChargeData,
                            });
                          }}
                          style={[{paddingHorizontal: responsiveWidth(4)}]}>
                          <ImageBackground
                            blurRadius={1}
                            resizeMode="contain"
                            // style={{width: 40, height: 40}}
                            source={
                              item?.creditAmount
                                ? require('../../assets/paid.png')
                                : require('../../assets/unpaid.png')
                            }>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                marginRight: responsiveWidth(-14),
                              }}>
                              <TouchableOpacity
                                disabled={updateLoading}
                                onPress={() => {
                                  item?.creditAmount
                                    ? UpdatePaymentApi(0, item?._id)
                                    : UpdatePaymentApi(
                                        item?.paidAmount,
                                        item?._id,
                                      );
                                }}
                                style={[
                                  GlobalStyle.shadow,
                                  {
                                    paddingHorizontal: responsiveWidth(6),
                                    paddingVertical: 3,
                                    borderTopRightRadius: 8,
                                    borderRadius: 2,
                                    backgroundColor: item?.creditAmount
                                      ? 'white'
                                      : GlobalColor.textColor,
                                    marginBottom: 6,
                                  },
                                ]}>
                                {updateLoading ? (
                                  <ActivityIndicator
                                    size={'small'}
                                    color={
                                      item?.creditAmount ? 'black' : 'white'
                                    }
                                  />
                                ) : (
                                  <Text
                                    style={{
                                      color: item?.creditAmount
                                        ? 'black'
                                        : 'white',
                                      fontSize: 12,
                                    }}>
                                    {item?.creditAmount ? 'Paid' : 'Pay'}
                                  </Text>
                                )}
                              </TouchableOpacity>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>
                                Invoice No:
                              </Text>
                              <Text style={[styles.textDescription]}>
                                {item?.invoice_number}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>Date:</Text>
                              <Text style={[styles.textDescription]}>
                                {item?.date}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>BL No:</Text>
                              <Text style={[styles.textDescription]}>
                                {item?.bl_no}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>Name:</Text>
                              <Text style={[styles.textDescription]}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>
                                Company:
                              </Text>
                              <Text style={[styles.textDescription]}>
                                {item?.company}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>
                                Customer Name:
                              </Text>
                              <Text style={[styles.textDescription]}>
                                {item?.fieldsData[0].customer_name}
                              </Text>
                            </View>
                            <View
                              style={[
                                GlobalStyle.flexJustify,
                                {paddingVertical: responsiveHeight(0.6)},
                              ]}>
                              <Text style={[styles.headingAssign]}>
                                Total Price
                              </Text>
                              <Text style={[styles.textDescription]}>
                                {item?.paidAmount}
                              </Text>
                            </View>
                            {/* {item?.creditAmount && (
                            <Image
                              style={{width: 40, height: 40}}
                              source={require('../../assets/paid.png')}
                            />
                          )} */}
                          </ImageBackground>
                        </TouchableOpacity>
                      )}
                      {/* <LineBetween /> */}
                    </View>
                  ))}
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
        </View>
      )}
    </View>
  );
};

export default InvoiceNumber;

const styles = StyleSheet.create({
  headingAssign: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7),
    // width: responsiveWidth(30),
  },
  textAssign: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: responsiveFontSize(1.2),
  },
  tableHeading: {
    borderRightColor: 'gray',
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
    backgroundColor: '#bbe4e9',
    alignSelf: 'center',
  },
  textDescription: {
    fontSize: responsiveFontSize(1.4),
    textTransform: 'uppercase',
    alignSelf: 'center',
    // width: responsiveWidth(13),
    // height: responsiveHeight(1.3),
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
