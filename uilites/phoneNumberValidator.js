import { parsePhoneNumberFromString} from "libphonenumber-js";


export default{
  validatePhone(phoneNo,countryCode){
    const fullNumber = countryCode + phoneNo;
    const phoneNumber = parsePhoneNumberFromString(fullNumber);
    if(!phoneNumber || !phoneNumber.isValid()){
        return {isValid:false,message : "Invalid PhoneNumber"}
    }
    return {isValid:true,formatedNumber:phoneNumber.number}
    
  }
}