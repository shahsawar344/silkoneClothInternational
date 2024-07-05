import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import ToastContainer from '../../component/ToastContainer';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';
import {categoryId} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {AddDriverReportApi} from '../../utils/services';
import {GlobalColor} from '../../Color/GlobalColor';

const AddDriverReport = ({navigation}) => {
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
  const [dateModel, setDateModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const AddDataDriver = async () => {
    setLoading(true);
    try {
      const result = await AddDriverReportApi(getDriverReport);
      console.log(result, 'response ');
      if (result.status == true) {
        setGetDriverReport({});
        Toast.show({text1: 'Submitted', text2: 'Status true'});
        setTimeout(() => {
          navigation.navigate('ViewDriverReport');
        }, 1000);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getDriver = useSelector(e => e?.driverData);
  const [textData, setText] = useState('');
  useEffect(() => {
    Number(getDriverReport?.price) < Number(getDriverReport?.fuel)
      ? setText('fuel is greater from price')
      : setText('');
  }, [getDriverReport?.price, getDriverReport?.fuel]);

  const filterSearch = getDriver.filter(e => e?.name == getDriverReport.name);
  const [model, setModel] = useState(false);

  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon marginLeft={responsiveWidth(20)} text={'Add Driver Report'} />
      <ScrollView style={{paddingHorizontal: responsiveWidth(5)}}>
        <TouchableOpacity
          style={{
            paddingVertical: responsiveHeight(0.4),
            paddingHorizontal: responsiveWidth(3),
            borderRadius: responsiveWidth(2),
            backgroundColor: '#00000020',
            alignSelf: 'flex-end',
            marginRight: responsiveWidth(3),
            marginTop: responsiveHeight(1),
          }}
          onPress={() => setDateModel(!dateModel)}>
          <Text style={{color: 'black', fontSize: 13}}>
            {getDriverReport.date?.length > 2
              ? getDriverReport.date
              : new Date().toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <CustomInput
          bgColor={getDriverReport.name?.length > 3 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.name}
          onChangeText={e => {
            e ? setModel(true) : setModel(false);
            setGetDriverReport({...getDriverReport, name: e});
          }}
          noIcon={true}
          titleName="Name:"
        />

        <CustomInput
          bgColor={getDriverReport.location?.length > 3 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.location}
          onChangeText={e =>
            setGetDriverReport({...getDriverReport, location: e})
          }
          noIcon={true}
          titleName="Location:"
        />
        <CustomInput
          bgColor={getDriverReport.customer_name?.length > 3 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.customer_name}
          onChangeText={e =>
            setGetDriverReport({...getDriverReport, customer_name: e})
          }
          noIcon={true}
          keyboardType={'email-address'}
          titleName="Customer Name:"
        />
        <CustomInput
          bgColor={getDriverReport.price?.length > 0 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.price}
          onChangeText={e => setGetDriverReport({...getDriverReport, price: e})}
          noIcon={true}
          keyboardType={'number-pad'}
          titleName="Price:"
        />
        <CustomInput
          bgColor={getDriverReport.fuel?.length > 0 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.fuel}
          onChangeText={e => setGetDriverReport({...getDriverReport, fuel: e})}
          noIcon={true}
          keyboardType={'number-pad'}
          titleName="Fuel:"
        />
        <CustomInput
          bgColor={getDriverReport.container_no?.length > 3 && 'gray'}
          autoCapitalize="characters"
          value={getDriverReport.container_no}
          onChangeText={e =>
            setGetDriverReport({...getDriverReport, container_no: e})
          }
          noIcon={true}
          titleName="Container No:"
        />
        {/* <CustomInput
          value={getDriverReport.amount}
          onChangeText={e =>
            setGetDriverReport({...getDriverReport, amount: e})
          }
          noIcon={true}
          keyboardType={'number-pad'}
          titleName="Amount:"
        /> */}
        <CustomButton
          loading={loading}
          disabled={loading}
          buttonText={'Upload'}
          style={{
            backgroundColor: loading ? '#00000040' : GlobalColor.buttonColor,
          }}
          onPress={() => {
            getDriverReport.name &&
            getDriverReport.location &&
            getDriverReport.price
              ? AddDataDriver()
              : Alert.alert('Alert', 'Fill the option');
          }}
        />
        {model ? (
          <View
            style={[
              {
                paddingHorizontal: responsiveWidth(4),
                backgroundColor: 'white',
                position: 'absolute',
                top: '17%',
                width: responsiveWidth(89),
                borderRadius: 5,
              },
              GlobalStyle.shadow,
            ]}>
            {filterSearch?.map((item, index) => (
              <Fragment key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setGetDriverReport({
                      name: item?.name,
                      location: item?.location,
                      customer_name: item?.customerName,
                    });
                    setModel(!model);
                  }}
                  style={{paddingVertical: responsiveHeight(1)}}>
                  <Text
                    style={{color: 'black', fontWeight: '700', fontSize: 13}}>
                    Name: {item?.name}
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 11, fontWeight: 'bold'}}>
                    Location :
                    <Text style={{fontWeight: 'normal'}}>{item?.location}</Text>
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 11, fontWeight: 'bold'}}>
                    Customer :
                    <Text style={{fontWeight: 'normal'}}>{item?.customerName}</Text>
                  </Text>
                </TouchableOpacity>
                <View style={{backgroundColor: '#00000025', height: 1}} />
              </Fragment>
            ))}
          </View>
        ) : null}
        <DatePicker
          modal
          open={dateModel}
          date={new Date()}
          mode="date"
          onConfirm={date => {
            setGetDriverReport({
              ...getDriverReport,
              date: date.toLocaleDateString(),
            });
          }}
          onCancel={() => {
            setDateModel(false);
          }}
        />
      </ScrollView>
      <ToastContainer />
    </View>
  );
};

export default AddDriverReport;

const styles = StyleSheet.create({});
