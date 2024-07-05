import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Ionicons, JustIcon} from '../../component/CustomIcons';
import {useSelector} from 'react-redux';
import {GetAllDriverReport, deleteDriver} from '../../utils/services';
import CustomInput from '../../component/CustomInput';

const ViewDriverReport = ({navigation, route}) => {
  const {randomNumber} = route?.params ? route?.params : '';
  const {getDriverReport} = route.params ? route.params : '';
  const [dataDriver, setDataDriver] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [loadingDriver, setLoadingDriver] = useState(false);
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
  const findDate = new Date().toLocaleDateString();
  // console.log(findDate, 'finnd month');
  const alsoClear = findDate?.charAt(0);
  const [type, setType] = useState(alsoClear);
  const [openBarType, setOpenBarType] = useState(false);
  const GetDriverData = async () => {
    setLoading(true);
    try {
      const result = await GetAllDriverReport();
      // console.log(result, 'new thing');
      if (result.status == true) {
        setLoading(false);
        setDataDriver(result.result);
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
  }, [randomNumber]);
  
  const fieldBillData = dataDriver?.filter(e => {
    const date = new Date(e?.date).toLocaleDateString();
    return date?.charAt(0) == type;
  });
  const filterData = search
    ? fieldBillData.filter(e =>
        e?.name.toLowerCase().includes(search.toLowerCase()),
      )
    : fieldBillData;
  const [takeIndex, setTakeIndex] = useState();
  const deleteDriverDetail = async item => {
    setLoadingDriver(true);
    try {
      const result = await deleteDriver(item);
      console.log(result, 'new things');
      if (result.status == true) {
        setLoadingDriver(false);
        GetDriverData();
      } else {
        setLoadingDriver(false);
      }
    } catch (error) {
      setLoadingDriver(false);
      console.log(error);
    }
  };

  // console.log(filterData, 'new things');
  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon marginLeft={responsiveWidth(20)} text={'View All Driver'} />
      {/* <View
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
      </View> */}
      <View
        style={{
          paddingVertical: responsiveHeight(1),
          paddingHorizontal: responsiveWidth(3),
        }}>
        <CustomInput
          value={search}
          autoCapitalize={'characters'}
          onChangeText={e => setSearch(e)}
          // noIcon={true}
          leftIcon={'search'}
          // keyboardType={'number-pad'}
          // bgColor={getAllData.vatPercentage?.length > 4 && '#00000020'}
          // titleName="Vat Tax(%):"
          placeholder={'Search ...'}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          right: 30,
          bottom: 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDriverReport')}
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            },
            GlobalStyle.shadow,
          ]}>
          <Ionicons
            onPress={() => navigation.navigate('AddDriverReport')}
            iconName={'add'}
            size={22}
            color={'black'}
          />
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
            // paddingHorizontal: responsiveWidth(4),
            marginTop: responsiveHeight(1),
          }}>
          <View
            style={{
              paddingHorizontal: responsiveWidth(2),
            }}>
            {dataDriver.length > 0 ? (
              filterData?.map((item, index) => {
                const name = item?.name;
                // console.log(item, 'new things');
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewOneDriver', {name})}
                    key={index}
                    style={[
                      GlobalStyle.shadow,
                      {
                        backgroundColor: 'white',
                        borderRadius: 8,
                        marginVertical: 3,
                        paddingHorizontal: responsiveWidth(3),
                        width: '96%',
                        paddingVertical: responsiveHeight(1),
                      },
                    ]}>
                    <View style={GlobalStyle.flexJustify}>
                      <View style={styles.date}>
                        <Text style={[styles.descriptionText, {}]}>
                          <Text style={{color: 'black'}}>Date:</Text>{' '}
                          {new Date(item?.date).toLocaleDateString()}
                        </Text>
                      </View>
                      <TouchableOpacity
                        disabled={loadingDriver}
                        onPress={() =>
                          Alert.alert(
                            'Warning',
                            `Would you want to delete the Driver: ${item.name}`,
                            [
                              {
                                text: 'Ok',
                                onPress: () => {
                                  deleteDriverDetail(item?._id),
                                    setTakeIndex(index);
                                },
                              },
                              {text: 'Cancel'},
                            ],
                          )
                        }
                        style={[
                          {
                            width: responsiveWidth(8),
                            height: responsiveWidth(8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 6,
                            backgroundColor: 'red',
                          },
                          GlobalStyle.shadow,
                        ]}>
                        {loadingDriver ? (
                          takeIndex == index ? (
                            <ActivityIndicator size={'small'} color={'white'} />
                          ) : (
                            <JustIcon
                              size={17}
                              color={'white'}
                              iconName={'trash-outline'}
                            />
                          )
                        ) : (
                          <JustIcon
                            size={17}
                            color={'white'}
                            iconName={'trash-outline'}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={GlobalStyle.flexJustify}>
                      <View style={[styles.name, {width: responsiveWidth(30)}]}>
                        <Text style={styles.descriptionText}>
                          <Text style={{color: 'black'}}>Driver:</Text>{' '}
                          {item.name}
                        </Text>
                      </View>
                      {/* <View style={[styles.container, {width:responsiveWidth(30)}]}>
                <Text style={styles.descriptionText}>{item?.containerNo}</Text>
              </View> */}
                      <View
                        style={[styles.location, {width: responsiveWidth(30)}]}>
                        <Text style={styles.descriptionText}>
                          <Text style={{color: 'black'}}>Location:</Text>{' '}
                          {item?.location}
                        </Text>
                      </View>
                    </View>
                    <View style={GlobalStyle.flexJustify}>
                      <View
                        style={[styles.customer, {width: responsiveWidth(45)}]}>
                        <Text style={styles.descriptionText}>
                          <Text style={{color: 'black'}}>Customer:</Text>{' '}
                          {item?.customerName}
                        </Text>
                      </View>
                      <View
                        style={[styles.price, {width: responsiveWidth(30)}]}>
                        <Text style={styles.descriptionText}>
                          <Text style={{color: 'black'}}>Balance:</Text>{' '}
                          {Number(item?.price) - Number(item?.fuel)}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={[styles.fuel, {}]}>
                <Text style={styles.descriptionText}>{item?.fuel}</Text>
              </View> */}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View
                style={{alignItems: 'center', marginTop: responsiveHeight(10)}}>
                <Text style={{color: 'black'}}>No Data available</Text>
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
          </View>
        </View>
      )}
    </View>
  );
};

export default ViewDriverReport;

const styles = StyleSheet.create({
  headerText: {
    color: 'black',
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  descriptionText: {
    color: 'gray',
    fontSize: responsiveFontSize(1),
    textTransform: 'uppercase',
    // alignSelf: 'center',
  },
  date: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
    // borderRightWidth: 1,
    // borderRightColor: 'black',
    // height: '100%',
  },
  name: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
  container: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
  location: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
  customer: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
  price: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
  fuel: {
    // width: responsiveWidth(14),
    // alignItems: 'center',
  },
});

{
  /* <View style={[GlobalStyle.flexJustify]}>
          <View style={styles.date}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.headerText}>Name</Text>
          </View> */
}
{
  /* <View style={styles.container}>
            <Text style={styles.headerText}>Container</Text>
          </View> */
}
{
  /* <View style={styles.location}>
            <Text style={styles.headerText}>location</Text>
          </View>
          <View style={styles.customer}>
            <Text style={styles.headerText}>customer</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.headerText}>Balance</Text>
          </View> */
}
{
  /* <View style={styles.fuel}>
            <Text style={styles.headerText}>Fuel</Text>
          </View> */
}
{
  /* </View>
        <View style={{}}>
          {dataDriver.map((item, index) => (
            <View key={index} style={GlobalStyle.flexJustify}>
              <View style={styles.date}>
                <Text style={styles.descriptionText}>
                  {new Date(item?.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={[styles.name, {height: responsiveHeight(3)}]}>
                <Text style={styles.descriptionText}>{item.name}</Text>
              </View> */
}
{
  /* <View style={[styles.container, {}]}>
                <Text style={styles.descriptionText}>{item?.containerNo}</Text>
              </View> */
}
{
  /* <View style={[styles.location, {}]}>
                <Text style={styles.descriptionText}>{item?.location}</Text>
              </View>
              <View style={[styles.customer, {}]}>
                <Text style={styles.descriptionText}>{item?.customerName}</Text>
              </View>
              <View style={[styles.price, {}]}>
                <Text style={styles.descriptionText}>
                  {Number(item?.price) - Number(item?.fuel)}
                </Text>
              </View> */
}
{
  /* <View style={[styles.fuel, {}]}>
                <Text style={styles.descriptionText}>{item?.fuel}</Text>
              </View> */
}
{
  /* </View>
          ))}
        </View> */
}
