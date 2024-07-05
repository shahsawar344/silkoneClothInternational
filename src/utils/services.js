export const BaseUrl = 'https://import-export-iisi.vercel.app/bill/';
export const BaseUrlDriver =
  'https://import-export-iisi.vercel.app/driverReport/';

export const AddBillData = async (getTake, price) => {
  // console.log(getTake.getAllData,'sdfsd');
  const data = {
    name: getTake.getAllData.name,
    email: getTake.getAllData.email,
    vatNo: getTake.getAllData.vattax,
    company: getTake.getAllData.company,
    bl_no: getTake.getAllData.bl_no,
    invoice_number: getTake.getAllData.invoice_no,
    vatPercentage: getTake.getAllData.vatPercentage,
    extraChargeDescription: getTake.getAllData.extraCharge,
    paidStatus: false,
    paidAmount: price,
    fieldsData: getTake.fields,
    date: getTake.getAllData.date,
    extraChargeData: getTake.extraCharge,
  };
  console.log(data, 'new one');
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const result = await fetch(`${BaseUrl}create-bill`, requestOptions);
  return result.json();
};
export const UpdateBillData = async (getTake, billId, price) => {
  // console.log(getTake.getAllData,'sdfsd');
  const data = {
    name: getTake.getAllData.name,
    email: getTake.getAllData.email,
    vatNo: getTake.getAllData.vattax,
    company: getTake.getAllData.company,
    bl_no: getTake.getAllData.bl_no,
    invoice_number: getTake.getAllData.invoice_no,
    vatPercentage: getTake.getAllData.vatPercentage,
    extraChargeDescription: getTake.getAllData.extraCharge,
    paidStatus: false,
    paidAmount: price,
    fieldsData: getTake.fields,
    date: getTake.getAllData.date,
    extraChargeData: getTake.extraCharge,
    bill_id: billId,
  };
  // console.log(data, 'new one');
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const result = await fetch(`${BaseUrl}updatePaidAmount`, requestOptions);
  return result.json();
};
export const UpdatePayment = async (getTake, billId) => {
  // console.log(getTake.getAllData,'sdfsd');
  const data = {
    creditAmount: getTake,
    bill_id: billId,
  };
  // console.log(data, 'new one');
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}updateBillCreditAmount`,
    requestOptions,
  );
  return result.json();
};
export const GetAllBillData = async limit => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}getAllBills?page=1&limit=700`,
    requestOptions,
  );
  return result.json();
};
export const AddDriverReportApi = async getData => {
  // console.log(getData);
  const data = {
    containerNo: getData.container_no,
    name: getData.name,
    location: getData.location,
    customerName: getData.customer_name,
    price: getData.price,
    fuel: getData.fuel,
    balance: Number(getData.price) - Number(getData.fuel),
    date: getData.date ? getData.date : new Date().toLocaleDateString(),
  };
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(`${BaseUrlDriver}addDriverReport`, requestOptions);
  return result.json();
};
export const GetAllDriverReport = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrlDriver}getAllDriverReports?page=1&limit=400`,
    requestOptions,
  );
  return result.json();
};
export const GetAllDriverName = async driverName => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrlDriver}getDriverReportsNyName?name=${driverName}&page=1&limit=400`,
    requestOptions,
  );
  return result.json();
};

export const GetBillDataByCompanyName = async billId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}getAllBillsByCompanyName?page=1&limit=400&companyName=${billId}`,
    requestOptions,
  );
  return result.json();
};
export const GetBillDataByInvoiceNumber = async billId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}getAllBillsByInvoiceNumber?page=1&limit=500&invoice_number=${billId}`,
    requestOptions,
  );
  return result.json();
};
export const GetBillDataByVatNumber = async billId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}getAllBillsByVatNo?page=1&limit=400&vatNo=${billId}`,
    requestOptions,
  );
  return result.json();
};
export const DeleteBillApi = async billId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrl}deleteBill?bill_id=${billId}`,
    requestOptions,
  );
  return result.json();
};
export const SignUpApiApi = async formdata => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  };
  const result = await fetch(
    `https://beep.hssolsdemos.com/api/register`,
    requestOptions,
  );
  return result.json();
};

export const deleteDriver = async billId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `${BaseUrlDriver}deleteDriver?bill_id=${billId}`,
    requestOptions,
  );
  return result.json();
};
