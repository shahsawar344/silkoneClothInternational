import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GetBillDataByCompanyName,
  GetBillDataByVatNumber,
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

const VatTaxNumber = ({navigation, route}) => {
  const {randomNumber} = route?.params ? route?.params : '';
  const [search, setSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataBilling, setDataBilling] = useState([]);
  const GetAllDataByCompany = async () => {
    setLoading(true);
    try {
      const result = await GetBillDataByVatNumber(search);
      console.log(result, 'new one');
      if (result.status == true) {
        setDataBilling(result.result);
        setSearch('');
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderIcon
        fontSize={responsiveFontSize(1.5)}
        marginLeft={responsiveWidth(21)}
        text={`Bill by Vat:${nameSearch}`}
      />
      <View
        style={{
          marginTop: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(5),
        }}>
        <CustomInput
          // style={{width: responsiveWidth(78)}}
          leftIcon={'search'}
          placeholder="Enter vat no"
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
              GetAllDataByCompany();
              setNameSearch(search);
            }}
          />
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
            <View
              style={{
                paddingHorizontal: responsiveWidth(1),
              }}>
              {dataBilling?.length > 0 ? (
                dataBilling.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewDetailBill', {
                        getAllData: {
                          name: item?.name,
                          company: item?.company,
                          email: item?.email,
                          vattax: item?.vatNo,
                          bl_no: item?.bl_no,
                          extraCharge: item?.extraCharge,
                          vatPercentage: item?.vatPercentage,
                          date: item?.date,
                          invoice_no: item?.invoice_number,
                        },
                        fields: item?.fieldsData,
                        delete: true,
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
                    <Text style={styles.headingAssign}>
                      Date: <Text style={styles.textAssign}>{item?.date}</Text>
                    </Text>
                    <View
                      style={[
                        GlobalStyle.flexJustify,
                        // {paddingBottom: responsiveHeight(2)},/s
                      ]}>
                      <Text style={styles.headingAssign}>
                        BL No:{' '}
                        <Text style={styles.textAssign}>{item?.bl_no}</Text>
                      </Text>
                      <View style={GlobalStyle.flexJustify}>
                        <Text style={styles.headingAssign}>Company: </Text>
                        <Text style={styles.textAssign}>{item.company}</Text>
                      </View>
                    </View>
                    <View style={GlobalStyle.flexJustify}>
                      <View style={[GlobalStyle.flexJustify, {}]}>
                        <Text style={styles.headingAssign}>VatIN No: </Text>
                        <Text style={styles.textAssign}>{item?.vatNo}</Text>
                      </View>
                      <View style={[GlobalStyle.flexJustify, {}]}>
                        <Text style={styles.headingAssign}>
                          Remaining Price:
                        </Text>
                        <Text style={styles.textAssign}>new things</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View>
                  <Text style={{color: 'black'}}>
                    No Data available ={' '}
                    <Text style={{fontWeight: 'bold'}}> {nameSearch}</Text>
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default VatTaxNumber;

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
