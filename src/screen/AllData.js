import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderIcon from '../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomInput from '../component/CustomInput';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {GetAllBillData} from '../utils/services';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {JustIcon} from '../component/CustomIcons';

const AllData = ({navigation, route}) => {
  const {randomNumber} = route?.params ? route?.params : '';
  const [search, setSearch] = useState('');
  const [storageData, setStorageData] = useState('Bill');
  // const Service = async () => {
  //   const Result =await AsyncStorage.getItem('AllData');
  //   setStorageData(Result);
  // };
  // useEffect(() => {
  //   Service();
  // }, []);

  // console.log(storageData, 'new data ');
  const [dataBilling, setDataBilling] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataType = [
    {option: '50'},
    {option: '100'},
    {option: '150'},
    {option: '400'},
  ];
  const [type, setType] = useState('50');
  const [openBarType, setOpenBarType] = useState(false);
  const GetAllData = async (type) => {
    // console.log(type,'new ');
    setLoading(true);
    try {
      const result = await GetAllBillData(type);
      console.log(result, 'new one');
      if (result) {
        setDataBilling(result.result);
        setLoading(false);
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
  }, [randomNumber, focus]);
  // const getAllData = {
  //   name: item.name,
  //   companyName: item.company,
  //   email: item.email,
  //   vatTax: item.vattax,
  // };
  const filterData = search
    ? dataBilling.filter(e =>
        storageData == 'Bill'
          ? e?.bl_no.toLowerCase().includes(search.toLowerCase())
          : storageData == 'Invoice'
          ? e?.invoice_number.toLowerCase().includes(search.toLowerCase())
          : e?.company.toLowerCase().includes(search.toLowerCase()),
      )
    : dataBilling;
  const dataBill = [{text: 'Bill'}, {text: 'Invoice'}, {text: 'Company'}];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderIcon marginLeft={responsiveWidth(29)} text={'View All Bill'} />
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
        style={{position: 'absolute', bottom: '5%', right: '8%', zIndex: 111}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBill')}
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            },
            GlobalStyle.shadow,
          ]}>
          <JustIcon iconName={'add'} size={34} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(5),
        }}>
        {dataBilling.length > 0 && (
          <View>
            <CustomInput
              // style={{width: responsiveWidth(78)}}
              leftIcon={'search'}
              placeholder="Search BL No"
              value={search}
              onChangeText={e => setSearch(e)}
              // rightIcon={'funnel-outline'}
              // offIcon={'funnel-outline'}
              onSubmitEditing={() => {}}
              fontWeight="500"
              style={{}}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {dataBill?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setStorageData(item.text);
                    }}
                    style={{
                      paddingHorizontal: responsiveWidth(2),
                      paddingVertical: 5,
                      backgroundColor:
                        item?.text == storageData ? '#00000030' : 'white',
                      borderWidth: 0.5,
                      borderColor: 'black',
                      marginRight: 4,
                      borderRadius: responsiveWidth(1),
                    }}>
                    <Text style={{color: 'black', fontSize: 10}}>
                      {' '}
                      Search by {item.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
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
          style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              paddingHorizontal: responsiveWidth(5),
            }}>
            {filterData.length > 0 ? (
              filterData.map((item, index) => {
                // console.log(item, 'new thing');
                let totalQuantity = 0;
                for (let index = 0; index < item?.fieldsData?.length; index++) {
                  // console.log(index, 'asdf');
                  // const element = fieldBill2[index];
                  const quantity =
                    item?.fieldsData[index]?.price *
                    item?.fieldsData[index]?.Qty;
                  totalQuantity += quantity;
                }
                return (
                  <TouchableOpacity
                    onPress={() =>
                      // navigation.navigate('ViewDetailBill', {
                      //   fields,
                      //   getAllData,
                      //   extraCharge,
                      // })
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
                      })
                    }
                    key={index}
                    style={[
                      {
                        paddingVertical: responsiveHeight(1),
                        paddingHorizontal: responsiveWidth(2),
                        backgroundColor: 'white',
                        marginBottom: responsiveHeight(1),
                        borderRadius: responsiveHeight(1),
                        marginTop: responsiveHeight(1),
                      },
                      GlobalStyle.shadow,
                    ]}>
                    <View style={GlobalStyle.flexJustify}>
                      <Text style={styles.headingAssign}>
                        Date: <Text style={styles.textAssign}>{item.date}</Text>
                      </Text>
                      <Text style={styles.headingAssign}>
                        Invoice:{' '}
                        <Text style={styles.textAssign}>
                          {item.invoice_number}
                        </Text>
                      </Text>
                    </View>
                    {/* <View
                      style={[
                        GlobalStyle.flexJustify,
                        // {paddingBottom: responsiveHeight(2)},/s
                      ]}> */}
                    <Text style={styles.headingAssign}>
                      BL No: <Text style={styles.textAssign}>{item.bl_no}</Text>
                    </Text>
                    <View style={GlobalStyle.flexJustify}>
                      <Text style={styles.headingAssign}>
                        Company:{' '}
                        <Text style={styles.textAssign}>{item.company}</Text>
                      </Text>
                    </View>
                    {/* </View> */}
                    <View style={GlobalStyle.flexJustify}>
                      <View style={[GlobalStyle.flexJustify, {}]}>
                        <Text style={styles.headingAssign}>Container: </Text>
                        <Text style={styles.textAssign}>
                          {item?.fieldsData?.length}
                        </Text>
                      </View>
                      <View style={[GlobalStyle.flexJustify, {}]}>
                        <Text style={styles.headingAssign}>
                          Remaining Price:{' '}
                        </Text>
                        <Text style={styles.textAssign}>
                          {item?.paidAmount ? item?.paidAmount : 0}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View
                style={{alignItems: 'center', marginTop: responsiveHeight(20)}}>
                <Text style={{color: 'black'}}>No Data Available</Text>
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
          </View>
        </View>
      )}
    </View>
  );
};

export default AllData;

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
});
