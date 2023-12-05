import axios from "axios";
const allProvinceURL = `https://provinces.open-api.vn/api/p/`
const searchProvinceURL = (str: String) => `${allProvinceURL}search/?q=${str}`
const allDistrictURL = (province_code: Number)=>`https://provinces.open-api.vn/api/p/${province_code}?depth=2`
const searchDistrictURL = (str: String, pCode: Number) => `https://provinces.open-api.vn/api/d/search/?q=${str}&p=${pCode}`
const allWardURL =(district_code: Number)=> `https://provinces.open-api.vn/api/d/${district_code}?depth=2`

function getAllProvince(){
  return axios.get(allProvinceURL, {withCredentials: false})
}

function searchProvince(str: String){
  return axios.get(searchProvinceURL(str), {withCredentials: false})
}

function getAllDistrict(pCode: Number){
  if (pCode){
    return axios.get(allDistrictURL(pCode), {withCredentials: false})
  }else{
    return new Promise(()=>[])
  }
}

function searchDistrict(str: String, pCode: Number){
  return axios.get(searchDistrictURL(str, pCode), {withCredentials: false})
}

function getAllWard(dCode: Number){
  return axios.get(allWardURL(dCode), {withCredentials: false})
}

export {getAllDistrict, searchDistrict, searchProvince, getAllProvince, getAllWard}