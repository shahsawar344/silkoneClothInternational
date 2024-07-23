import {Alert, ScrollView,  StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomButton from '../../component/CustomButton';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
const DetailOfItem = ({navigation, route}) => {
  const item = route?.params ? route?.params : '';
  const viewRef = useRef();
  const Line = () => <View style={{height: 1, backgroundColor: 'black'}} />;
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
  const SavePdf = () => {
    getNextLetter();
    const dirs = RNFetchBlob.fs.dirs;
    const fileNameInfo =
      downloadName + getMonthAbbreviation + getCurrentDate + '-' + randomInt;
    const downloadPath = Platform.select({
      android: `${dirs.PictureDir}/${fileNameInfo}.pdf`,
    });

    ref.current.capture().then(uri => {
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
        .catch(error => console.log(`Failed to create PDF: ${error}`));
      console.log('do something with ', uri);
    });
  };

  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon text={'Info'} marginLeft={responsiveWidth(28)} />
      <ViewShot ref={viewRef} style={GlobalStyle.container}>
        <View style={{marginTop: responsiveHeight(5)}}>
          <Text
            style={{fontSize: 20, color: 'black', fontFamily: 'Poppins-Bold'}}>
            Item Detail
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: responsiveWidth(2),
            // paddingVertical: 10,
            paddingHorizontal: responsiveWidth(3),
            width: responsiveWidth(88),
          }}>
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(40),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
              }}>
              Item Name
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(35)}}>{item.name}</Text>
          </View>
          <Line />
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(40),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
              }}>
              Company Name
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(35)}}>{item.company}</Text>
          </View>
          <Line />
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(40),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
              }}>
              Lot No
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(35)}}>{item.LotNo}</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: responsiveWidth(2),
            // paddingVertical: 10,
            paddingHorizontal: responsiveWidth(3),
            width: responsiveWidth(80),
            marginTop: responsiveHeight(3),
          }}>
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(45),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              No of Taan
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(15)}}>{item.taan}</Text>
          </View>
          <Line />

          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(45),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              Total Meter
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(15)}}>{item.meter}</Text>
          </View>
          <Line />
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(45),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              Purchasing Amount
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(15)}}>{item.purchasing}</Text>
          </View>
          <Line />
          <View style={[GlobalStyle.flexJustify]}>
            <Text
              style={{
                width: responsiveWidth(45),
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
              }}>
              Sale Amount
            </Text>
            <View
              style={{height: '100%', backgroundColor: 'black', width: 1}}
            />
            <Text style={{width: responsiveWidth(15)}}>{item.sale}</Text>
          </View>
        </View>
      </ViewShot>
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginBottom: responsiveHeight(2),
        }}>
        <CustomButton
          buttonText={'Download'}
          onPress={() => {
            viewRef.current.capture().then(async uri => {
              await Share.open({url: uri});
            });
          }}
        />
      </View>
    </View>
  );
};

export default DetailOfItem;

const styles = StyleSheet.create({});
