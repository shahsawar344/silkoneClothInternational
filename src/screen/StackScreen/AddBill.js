import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddBl} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddBillData,
  AddDriverReportApi,
  UpdateBillData,
} from '../../utils/services';
import {Ionicons} from '../../component/CustomIcons';
import {CustomModel, CustomModelDelete} from '../../component/CustomModel';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';
import ToastContainer from '../../component/ToastContainer';
import {GlobalColor} from '../../Color/GlobalColor';

const AddBill = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item, 'nws');
  const [fields, setFields] = useState(item?.fields ? item?.fields : []);
  const [extraCharge, setExtraCharge] = useState(
    item?.extraCharge ? item?.extraCharge : [],
  );
  // console.log(extraCharge, 'new things');

  // console.log(getAllData, 'sdfs');
  const dispatch = useDispatch();
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [selectedFieldTypeCharge, setSelectedFieldTypeCharge] = useState(null);
  const [dateModel, setDateModel] = useState(false);
  const addField = type => {
    const newIndex = fields.length;
    setFields([...fields, {type, container_no: ''}]);
    setSelectedFieldType(type);
    // if (newIndex >= 0 && newIndex < fields.length) {
    // }
  };
  const updateFieldValue = (index, newData) => {
    const updatedFields = [...fields];
    updatedFields[index] = newData; // Replace the entire object with the new data
    setFields(updatedFields);
  };
  const addFieldCharge = type => {
    const newIndex = extraCharge.length;
    setExtraCharge([...extraCharge, {type, price: 0}]);
    // selectedFieldTypeCharge(type);
    // if (newIndex >= 0 && newIndex < fields.length) {
    // }
  };
  const updateExtraCharge = (index, newData) => {
    const updatedFields = [...extraCharge];
    updatedFields[index] = newData; // Replace the entire object with the new data
    setExtraCharge(updatedFields);
  };
  const [model, setModel] = useState(false);
  const renderField = (item, index) => {
    switch (item.type) {
      case 'heading':
        return (
          <View
            key={index}
            style={{
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(3),
            }}>
            <CustomInput
              autoCapitalize={'characters'}
              iconClose={true}
              onPressRightIcon={() => {
                setModel(true),
                  setGetDriverReport({
                    customer_name: item.customer_name,
                    container_no: item.container_no,
                    location: item.location,
                  });
              }}
              rightIcon="car"
              noIcon={true}
              value={item.container_no}
              iconName={'remove-outline'}
              // keyboardType={'number-pad'}
              onPressClose={() => {
                if (fields.length < 2) {
                  setModelContainer(false);
                  fields.splice(index, 1), setFields([...fields]);
                } else {
                  fields.splice(index, 1), setFields([...fields]);
                }
              }}
              onChangeText={e => {
                updateFieldValue(index, {...item, container_no: e});
              }}
              titleName="Container No:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              noIcon={true}
              value={item.location}
              onChangeText={e => {
                updateFieldValue(index, {...item, location: e});
              }}
              titleName="Location:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              noIcon={true}
              value={item.customer_name}
              onChangeText={e => {
                updateFieldValue(index, {...item, customer_name: e});
              }}
              titleName="Customer Name:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              noIcon={true}
              value={item.price}
              onChangeText={e => {
                updateFieldValue(index, {...item, price: e});
              }}
              keyboardType={'number-pad'}
              titleName="Price:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              noIcon={fields.length > 7 ? false : true}
              value={item.Qty}
              onChangeText={e => {
                updateFieldValue(index, {...item, Qty: e});
              }}
              keyboardType={'number-pad'}
              iconName={'add'}
              titleName="Qty:"
              iconClose={true}
              onPressClose={() =>
                fields.length > 7
                  ? {}
                  : item?.container_no && addField('heading')
              }
            />
            <View
              style={{
                height: responsiveHeight(3),
                width: responsiveWidth(70),
                backgroundColor: 'gray',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: responsiveHeight(9),
              }}>
              <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
                {fields.length}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  const [modelExtra, setModelExtra] = useState(false);

  const renderExtraCharge = (item, index) => {
    switch (item.type) {
      case 'heading':
        return (
          <View
            key={index}
            style={{
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(3),
            }}>
            <CustomInput
              autoCapitalize={'characters'}
              iconClose={true}
              // rightIcon="car"
              noIcon={true}
              value={item.price}
              iconName={'remove-outline'}
              keyboardType={'number-pad'}
              onPressClose={() => {
                if (extraCharge.length < 2) {
                  setModelExtra(false);
                  extraCharge.splice(index, 1),
                    setExtraCharge([...extraCharge]);
                } else {
                  extraCharge.splice(index, 1),
                    setExtraCharge([...extraCharge]);
                }
              }}
              onChangeText={e => {
                updateExtraCharge(index, {...item, price: e});
              }}
              titleName="Price:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              iconClose={extraCharge.length > 4 ? false : true}
              // rightIcon="car"
              noIcon={true}
              value={item.Qty}
              iconName={'add'}
              keyboardType={'number-pad'}
              onPressClose={() => {
                extraCharge.length > 4
                  ? {}
                  : item.price && addFieldCharge('heading');
              }}
              onChangeText={e => {
                updateExtraCharge(index, {...item, Qty: e});
              }}
              titleName="Qty:"
            />

            <View
              style={{
                height: responsiveHeight(3),
                width: responsiveWidth(70),
                backgroundColor: 'gray',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: responsiveHeight(9),
              }}>
              <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
                {extraCharge.length}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  // const fieldDataArray = fields.map((item, index) => ({
  //   container_no: item.container_no,
  //   location: item.location,
  //   customer_name: item.customer_name,
  //   price: item.price,
  //   Qty: item.Qty,
  //   // total: item.total,
  //   // rate: 222,
  // }));
  const [getAllData, setGetAllData] = useState({
    name: item?.getAllData ? item?.getAllData?.name : '',
    company: item?.getAllData ? item?.getAllData?.company : '',
    email: item?.getAllData ? item?.getAllData?.email : '',
    vattax: item?.getAllData ? item?.getAllData?.vattax : '',
    bl_no: item?.getAllData ? item?.getAllData?.bl_no : '',
    extraCharge: item?.getAllData ? item?.getAllData?.extraCharge : '',
    vatPercentage: item?.getAllData ? item?.getAllData?.vatPercentage : '',
    date: item?.getAllData
      ? item?.getAllData?.date
      : new Date().toLocaleDateString(),
    invoice_no: item?.getAllData ? item?.getAllData?.invoice_no : '',
  });
  const newDate = new Date().toLocaleDateString();
  const [getDriverReport, setGetDriverReport] = useState({
    name: '',
    location: '',
    customer_name: '',
    price: '',
    container_no: '',
    fuel: '',
    date: newDate,
  });

  const gatherAllData = {getAllData, fields, extraCharge};
  const price = 0;
  // console.log(getDriverReport, 'new thing');
  const [loadingBill, setLoadingBill] = useState(false);
  let totalQuantity = 0;
  for (let index = 0; index < fields?.length; index++) {
    // console.log(index, 'asdf');
    // const element = fieldBill2[index];
    const quantity = fields[index]?.price * fields[index]?.Qty;
    totalQuantity += quantity;
  }
  const GetExtraCharge = extraCharge;
  let totalQuantityCharge = 0;
  for (let index = 0; index < GetExtraCharge?.length; index++) {
    // console.log(index, 'asdf');
    // const element = GetExtraCharge[index];
    const quantity =
      Number(GetExtraCharge[index]?.price) * Number(GetExtraCharge[index]?.Qty);
    totalQuantityCharge += quantity;
  }
  // console.log(totalQuantity, 'new own');
  const addWithExtra = Number(totalQuantity) + Number(totalQuantityCharge);
  const findVatPercentage =
    (Number(getAllData?.vatPercentage) / 100) * Number(addWithExtra);
  const addWithVatPercentage = Number(findVatPercentage) + Number(addWithExtra);
  // console.log(addWithVatPercentage,'new generated');ss
  const AddToServer = async () => {
    // dispatch(AddBl(gatherAllData));
    setLoadingBill(true);
    try {
      const result = await AddBillData(gatherAllData, addWithVatPercentage);
      console.log(result, 'new things');
      if (result.status == true) {
        setLoadingBill(false);
        navigation.navigate('ViewDetailBill', {
          fields,
          getAllData,
          extraCharge,
        });
        setFields([]);
        setGetAllData({});
        setExtraCharge([]);
      } else {
        setLoadingBill(false);
        Alert.alert('Alert', result.message);
        // console.log('error', result);
      }
    } catch (error) {
      setLoadingBill(false);
      console.log(error);
    }
    // navigation.navigate('ViewDetailBill', {
    //   fields,
    //   getAllData,
    //   type: 'Driver',
    //   date: new Date().toLocaleDateString(),
    // });
  };
  const UpdateToServer = async () => {
    setLoadingBill(true);
    try {
      const result = await UpdateBillData(
        gatherAllData,
        item?.delete,
        addWithVatPercentage,
      );
      console.log(result);
      if (result.status == true) {
        setLoadingBill(false);
        navigation.navigate('ViewDetailBill', {
          fields,
          getAllData,
          extraCharge,
        });
        setFields([]);
        setGetAllData({});
        setExtraCharge([]);
      } else {
        setLoadingBill(false);
        Alert.alert('Alert', result.message);
        console.log('error', result);
      }
    } catch (error) {
      setLoadingBill(false);
      console.log(error);
    }
    // navigation.navigate('ViewDetailBill', {
    //   fields,
    //   getAllData,
    //   type: 'Driver',
    //   date: new Date().toLocaleDateString(),
    // });
  };
  const [checkBillTo, setCheckBillTo] = useState(false);
  const [modelContainer, setModelContainer] = useState(false);
  // const [getDriverReport, setGetDriverReport] = useState({
  //   name: '',
  //   location: '',
  //   customer_name: '',
  //   price: '',
  //   container_no: '',
  //   fuel: '',
  //   date: new Date().toLocaleDateString(),
  // });
  const [loading, setLoading] = useState(false);
  const AddDataDriver = async () => {
    setLoading(true);
    try {
      const result = await AddDriverReportApi(getDriverReport);
      console.log(result, 'new things');
      if (result.status == true) {
        Toast.show({text1: 'Submitted', text2: 'Status true'});
        setModel(false);
        setGetDriverReport({});
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const [textData, setText] = useState('');
  useEffect(() => {
    Number(getDriverReport?.price) < Number(getDriverReport?.fuel)
      ? setText('fuel is greater from price')
      : setText('');
  }, [getDriverReport?.price, getDriverReport?.fuel]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderIcon
        marginLeft={responsiveWidth(29)}
        onPress={() => navigation.goBack()}
        text={'Add Bill'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: responsiveWidth(5)}}>
        <View style={{marginBottom: responsiveHeight(3)}} />
        <View style={GlobalStyle.flexJustify}>
          <CustomInput
            autoCapitalize={'characters'}
            style={{
              width: responsiveWidth(70),
            }}
            bgColor={getAllData?.invoice_no?.length > 4 && '#00000020'}
            colorText="black"
            value={getAllData.invoice_no}
            onChangeText={e => setGetAllData({...getAllData, invoice_no: e})}
            noIcon={true}
            disabled={item?.getAllData ? true : false}
            titleName="Invoice No:"
          />
          <TouchableOpacity
            style={{
              paddingVertical: responsiveHeight(1.3),
              paddingHorizontal: responsiveWidth(2),
              backgroundColor: '#00000050',
              borderRadius: 8,
            }}
            onPress={() => setDateModel(true)}>
            <Text style={{fontSize: 7, color: 'white'}}>{getAllData.date}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setCheckBillTo(!checkBillTo)}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: responsiveFontSize(3),
              color: 'black',
              marginBottom: responsiveHeight(2),
            }}>
            {getAllData.company && getAllData.email && getAllData.name
              ? 'Bill To'
              : 'Add Bill to'}
            :
          </Text>
        </TouchableOpacity>
        {checkBillTo && (
          <View
            style={{
              paddingHorizontal: responsiveWidth(4),
              borderWidth: 1,
              borderColor: '#000000',
              borderRadius: responsiveWidth(3),
              // paddingVertical: responsiveHeight(2),
            }}>
            <CustomInput
              autoCapitalize={'characters'}
              value={getAllData.name}
              onChangeText={e => setGetAllData({...getAllData, name: e})}
              bgColor={getAllData.name?.length > 4 && '#00000020'}
              noIcon={true}
              titleName="Name:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              value={getAllData.company}
              onChangeText={e => setGetAllData({...getAllData, company: e})}
              bgColor={getAllData.company?.length > 4 && '#00000020'}
              noIcon={true}
              titleName="Company Name:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              value={getAllData.email}
              onChangeText={e => setGetAllData({...getAllData, email: e})}
              bgColor={getAllData.email?.length > 4 && '#00000020'}
              noIcon={true}
              keyboardType={'email-address'}
              titleName="Email:"
            />
            <CustomInput
              autoCapitalize={'characters'}
              value={getAllData.vattax}
              onChangeText={e => setGetAllData({...getAllData, vattax: e})}
              bgColor={getAllData.vattax?.length > 4 && '#00000020'}
              noIcon={true}
              // keyboardType={'number-pad'}
              titleName="Vat No:"
            />
          </View>
        )}
        <View
          style={{
            marginTop: responsiveHeight(4),
            // paddingHorizontal: responsiveWidth(4),
            // borderWidth: 1,
            // borderColor: '#000000',
            // borderRadius: responsiveWidth(3),
            // paddingVertical: responsiveHeight(2),
          }}>
          <CustomInput
            autoCapitalize={'characters'}
            value={getAllData.bl_no}
            onChangeText={e => setGetAllData({...getAllData, bl_no: e})}
            noIcon={true}
            disabled={item?.getAllData ? true : false}
            titleName="BL No:"
            bgColor={getAllData.bl_no?.length > 4 && '#00000020'}
          />
          {/* {!fields.length > 0 && ( */}
          <TouchableOpacity
            onPress={() => {
              item?.fields
                ? setModelContainer(true)
                : (setModelContainer(true), addField('heading'));
            }}
            style={{
              paddingVertical: responsiveHeight(1),
              alignItems: 'center',
              backgroundColor: 'gray',
              borderRadius: responsiveWidth(4),
              marginBottom: responsiveHeight(2),
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              {fields?.length > 0
                ? item?.fields
                  ? `${fields?.length}` + '  ' + 'View more container'
                  : `${fields?.length}` + '  ' + 'Add more container'
                : 'Add Container'}
            </Text>
          </TouchableOpacity>
          {/* )} */}

          <TouchableOpacity
            onPress={() => {
              item?.extraCharge.length > 0
                ? setModelExtra(true)
                : (setModelExtra(true), addFieldCharge('heading'));
            }}
            style={{
              paddingVertical: responsiveHeight(1),
              alignItems: 'center',
              backgroundColor: 'gray',
              borderRadius: responsiveWidth(4),
              marginBottom: responsiveHeight(2),
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              {extraCharge?.length > 0
                ? item?.extraCharge
                  ? `${extraCharge?.length}` + '  ' + 'View ExtraCharge'
                  : `${extraCharge?.length}` + '  ' + 'Add another'
                : 'Add Extra Charge'}
            </Text>
          </TouchableOpacity>
          {/* <CustomInput
          autoCapitalize={'characters'}
            value={getAllData.extraCharge}
            // onChangeText={e => setGetAllData({...getAllData, extraCharge: e})}
            noIcon={true}
            iconClose={true}
            onPressRightIcon={() => {
              setModel(true),
                setGetDriverReport({
                  customer_name: item.customer_name,
                  container_no: item.container_no,
                  location: item.location,
                });
            }}
            rightIcon="car"
            // value={item.container_no || ''}
            iconName={'remove-outline'}
            keyboardType={'number-pad'}
            onPressClose={() => {
              if (fields.length < 2) {
                setModelContainer(false);
                fields.splice(index, 1), setFields([...fields]);
              } else {
                fields.splice(index, 1), setFields([...fields]);
              }
            }}
            onChangeText={e => {
              updateFieldValue(index, {...item, container_no: e});
            }}
            // iconName={'remove-outline'}
            titleName="Extra Charge:"
          /> */}
          <CustomInput
            autoCapitalize={'characters'}
            value={getAllData.vatPercentage}
            onChangeText={e => setGetAllData({...getAllData, vatPercentage: e})}
            noIcon={true}
            keyboardType={'number-pad'}
            bgColor={getAllData.vatPercentage?.length > 4 && '#00000020'}
            titleName="Vat Tax(%):"
          />
        </View>
        {/* {fields.length > 0 && ( */}
        {/* <View style={GlobalStyle.flexJustify}> */}
        {/* <CustomButton
            width={responsiveWidth(40)}
            style={{
              marginTop: responsiveHeight(3),
              marginBottom: responsiveHeight(5),
            }}
            buttonText={'All Data'}
            onPress={() => {
              navigation.navigate('ViewDetailBill', {
                fields,
                getAllData,
                extraCharge,
              });
            }}
          /> */}
        <CustomButton
          disabled={loadingBill}
          loading={loadingBill}
          // width={responsiveWidth(40)}
          style={{
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(5),
            width: responsiveWidth(40),
            backgroundColor: loadingBill
              ? '#00000040'
              : GlobalColor.buttonColor,
          }}
          buttonText={item?.getAllData ? 'Update Bill' : 'Generate Bill'}
          onPress={async () => {
            getAllData.company &&
            getAllData.bl_no &&
            getAllData.name &&
            getAllData.name
              ? item?.getAllData
                ? UpdateToServer()
                : AddToServer()
              : Alert.alert('Alert', 'Please fill the form');
            // navigation.navigate('ViewDetailBill')
          }}
        />
        {/* </View> */}
        <CustomModelDelete open={modelExtra} close={setModelExtra}>
          <View
            style={{
              paddingHorizontal: responsiveWidth(4),
              flex: 1,
              // marginBottom: responsiveHeight(2),
            }}>
            <View style={GlobalStyle.flexJustify}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  // marginBottom: responsiveHeight(2),
                  alignSelf: 'center',
                }}>
                Extra Charge:
              </Text>
              <TouchableOpacity
                onPress={() => setModelExtra(false)}
                style={{
                  marginVertical: responsiveHeight(3),
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                }}>
                <Ionicons
                  onPress={() => setModelExtra(false)}
                  iconName={'close'}
                  size={25}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
            <CustomInput
              autoCapitalize={'characters'}
              value={getAllData.extraCharge}
              onChangeText={e => setGetAllData({...getAllData, extraCharge: e})}
              noIcon={true}
              multiline
              height={responsiveHeight(14)}
              // keyboardType={'number-pad'}
              titleName="Description:"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              {extraCharge.map((item, index) => renderExtraCharge(item, index))}
            </ScrollView>
            <CustomButton
              onPress={() => setModelExtra(false)}
              buttonText={'Save Data'}
            />
          </View>
        </CustomModelDelete>
        <CustomModelDelete open={modelContainer} close={setModelContainer}>
          <View
            style={{
              paddingHorizontal: responsiveWidth(2),
              flex: 1,
              // marginBottom: responsiveHeight(2),
            }}>
            <View style={GlobalStyle.flexJustify}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  // marginBottom: responsiveHeight(2),
                  alignSelf: 'center',
                }}>
                Container Data:
              </Text>
              <TouchableOpacity
                onPress={() => setModelContainer(false)}
                style={{
                  marginVertical: responsiveHeight(3),
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                }}>
                <Ionicons
                  onPress={() => setModelContainer(false)}
                  iconName={'close'}
                  size={25}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {fields.map((item, index) => renderField(item, index))}
            </ScrollView>
            <CustomButton
              onPress={() => setModelContainer(false)}
              buttonText={'Save Data'}
            />
          </View>
        </CustomModelDelete>
        {/* )} */}
        <CustomModelDelete open={model} close={setModel}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
                color: 'black',
                // marginBottom: responsiveHeight(2),
                alignSelf: 'center',
              }}>
              Driver Reports:
            </Text>
            <View
              style={{
                paddingHorizontal: responsiveWidth(4),
                borderRadius: responsiveWidth(3),
                // paddingVertical: responsiveHeight(2),
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={GlobalStyle.flexJustify}>
                  <TouchableOpacity
                    style={{
                      paddingVertical: responsiveHeight(0.4),
                      paddingHorizontal: responsiveWidth(3),
                      borderRadius: responsiveWidth(2),
                      backgroundColor: '#00000010',
                      // alignSelf: 'flex-end',
                      marginRight: responsiveWidth(3),
                      marginTop: responsiveHeight(1),
                      marginBottom: responsiveHeight(1.5),
                    }}
                    onPress={() => setModel(false)}>
                    <Ionicons
                      onPress={() => setModel(false)}
                      iconName={'close'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: responsiveHeight(0.4),
                      paddingHorizontal: responsiveWidth(3),
                      borderRadius: responsiveWidth(2),
                      backgroundColor: '#00000010',
                      alignSelf: 'flex-end',
                      marginRight: responsiveWidth(3),
                      marginTop: responsiveHeight(1),
                      marginBottom: responsiveHeight(1.5),
                    }}
                    onPress={() => setDateModel(true)}>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {getDriverReport.date
                        ? getDriverReport.date
                        : new Date().toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                </View>
                <CustomInput
                  autoCapitalize={'characters'}
                  bgColor={getDriverReport.name?.length > 4 && '#00000020'}
                  value={getDriverReport.name}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, name: e})
                  }
                  noIcon={true}
                  titleName="Name:"
                />
                <CustomInput
                  autoCapitalize={'characters'}
                  bgColor={getDriverReport.location?.length > 4 && '#00000020'}
                  value={getDriverReport.location}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, location: e})
                  }
                  noIcon={true}
                  titleName="Location:"
                />
                <CustomInput
                  autoCapitalize={'characters'}
                  bgColor={
                    getDriverReport.customer_name?.length > 4 && '#00000020'
                  }
                  value={getDriverReport.customer_name}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, customer_name: e})
                  }
                  noIcon={true}
                  keyboardType={'email-address'}
                  titleName="Customer Name:"
                />
                <CustomInput
                  autoCapitalize={'characters'}
                  value={getDriverReport.container_no}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, container_no: e})
                  }
                  noIcon={true}
                  titleName="Container No:"
                />
                <CustomInput
                  autoCapitalize={'characters'}
                  bgColor={getDriverReport.price?.length > 4 && '#00000020'}
                  value={getDriverReport.price}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, price: e})
                  }
                  noIcon={true}
                  keyboardType={'number-pad'}
                  titleName="Price:"
                />
                <CustomInput
                  autoCapitalize={'characters'}
                  value={getDriverReport.fuel}
                  bgColor={getDriverReport.fuel?.length > 4 && '#00000020'}
                  onChangeText={e =>
                    setGetDriverReport({...getDriverReport, fuel: e})
                  }
                  noIcon={true}
                  keyboardType={'number-pad'}
                  titleName="Fuel:"
                />
                <Text style={{color: 'black', fontSize: 11}}>{textData}</Text>
              </ScrollView>
              {/* <CustomInput
              autoCapitalize={'characters'}
                value={getDriverReport.amount}
                onChangeText={e =>
                  setGetDriverReport({...getDriverReport, amount: e})
                }
                noIcon={true}
                keyboardType={'number-pad'}
                titleName="Amount:"
              /> */}
              <CustomButton
                disabled={loading}
                loading={loading}
                onPress={() => {
                  AddDataDriver();
                }}
                buttonText={'Upload'}
              />
            </View>
          </View>
        </CustomModelDelete>
        <DatePicker
          modal
          open={dateModel}
          date={new Date()}
          mode="date"
          onConfirm={date => {
            setDateModel(false);
            setGetDriverReport({
              ...getDriverReport,
              date: date.toLocaleDateString(),
            });
            setGetAllData({
              ...getAllData,
              date: date.toLocaleDateString(),
            });
          }}
          onCancel={() => {
            setDateModel(false);
          }}
        />
        <ToastContainer />
      </ScrollView>
    </View>
  );
};

export default AddBill;

const styles = StyleSheet.create({});
