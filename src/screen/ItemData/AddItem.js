import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import CustomLoader from '../../component/CustomLoader';

const AddItem = ({navigation, route}) => {
  const [item, setItem] = useState({
    name: '',
    company: '',
    tan: '',
    meter: '',
    purchasing: '',
    sale: '',
    lotNo: '',
    date: new Date().toLocaleDateString(),
  });
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [dateModel, setDateModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Submit = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        setLoadingConfirm(true);
        setTimeout(() => {
          setItem({
            name: '',
            company: '',
            tan: '',
            meter: '',
            purchasing: '',
            sale: '',
            lotNo: '',
            date: new Date().toLocaleDateString(),
          });
          setLoadingConfirm(false);
        }, 3000);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  return loadingConfirm ? (
    <CustomLoader />
  ) : (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon text={'Add Data'} marginLeft={responsiveWidth(25)} />
      <View
        style={[GlobalStyle.container, {paddingBottom: responsiveHeight(2)}]}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Bold',
            alignSelf: 'center',
            fontSize: responsiveFontSize(5),
          }}>
          Add your data
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <CustomInput
            noIcon={true}
            titleName={'Item Name:'}
            value={item.name}
            onChangeText={e => setItem({...item, name: e})}
          />
          {/* <CustomInput
            noIcon={true}
            titleName={'Date:'}
            value={item.name}
            onChangeText={e => setItem({...item,name: e})}
          /> */}
          <View style={{marginBottom: responsiveHeight(2)}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
              }}>
              Date:
            </Text>
            <TouchableOpacity
              onPress={() => {
                setDateModel(true);
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: responsiveWidth(30),
                paddingVertical: responsiveHeight(1.1),
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                  paddingHorizontal: responsiveWidth(5),
                }}>
                {item.date}
              </Text>
            </TouchableOpacity>
          </View>
          <CustomInput
            noIcon={true}
            titleName={'Company Name:'}
            value={item.company}
            onChangeText={e => setItem({...item, company: e})}
          />
          <CustomInput
            noIcon={true}
            titleName={'No Of Tan:'}
            value={item.tan}
            keyboardType={'number-pad'}
            onChangeText={e => setItem({...item, tan: e})}
          />
          <CustomInput
            noIcon={true}
            titleName={'Meter (m):'}
            value={item.meter}
            keyboardType={'number-pad'}
            onChangeText={e => setItem({...item, meter: e})}
          />
          <CustomInput
            noIcon={true}
            titleName={'Purchasing Amount:'}
            value={item.purchasing}
            keyboardType={'number-pad'}
            onChangeText={e => setItem({...item, purchasing: e})}
          />
          <CustomInput
            noIcon={true}
            titleName={'Sale Amount:'}
            value={item.sale}
            keyboardType={'number-pad'}
            onChangeText={e => setItem({...item, sale: e})}
          />
          <CustomInput
            noIcon={true}
            titleName={'Lot No:'}
            value={item.lotNo}
            autoCapitalize={'characters'}
            onChangeText={e => setItem({...item, lotNo: e})}
          />
          <CustomButton
            buttonText={'Submit'}
            loading={loading}
            disabled={loading}
            onPress={() => {
              item.company &&
              item.name &&
              item.purchasing &&
              item.lotNo &&
              item.sale &&
              item.tan &&
              item.meter
                ? Submit()
                : Alert.alert('Alert', 'Please fill the required fields');
            }}
          />
        </ScrollView>
      </View>
      <DatePicker
        modal
        open={dateModel}
        date={new Date()}
        confirmText="Ok"
        onConfirm={e => {
          console.log(e, 'confirm'), setItem({date: e.toLocaleDateString()});
        }}
        onCancel={e => console.log(e, 'cancel')}
      />
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
