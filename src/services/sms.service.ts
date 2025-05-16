import db from "../config/db";
import { Scheduledvisit, Scheduledvisitreminder } from "../entities/sms";
import { UserService } from "./user.service";

export class SmsService {
  sendOtp = async (smsdata: { name: string; mobile_number: string }) => {
    const { name, mobile_number } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/otp/send`;

    const data = {
      api_key: process.env.TERMIIKEY,
      message_type: "ALPHANUMERIC",
      to: `${mobile_number}`,
      from: "N-Alert",
      channel: "dnd",
      pin_attempts: 10,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: "<>",
      message_text: `Hi ${name}, Your Opticcs authentication pin is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
      pin_type: "NUMERIC",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  voiceOtp = async (smsdata: { mobile_number: string }) => {
    const { mobile_number } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/otp/send/voice`;

    const data = {
      api_key: process.env.TERMIIKEY,
      phone_number: `${mobile_number}`,
      pin_attempts: 10,
      pin_time_to_live: 5,
      pin_length: 6,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  confirmOtp = async (smsdata: { otp: string; pinId: string }) => {
    const { otp, pinId } = smsdata;
    var data = {
      api_key: process.env.TERMIIKEY,
      pin_id: pinId,
      pin: otp,
    };
    const url = `https://api.ng.termii.com/api/sms/otp/verify`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  sendPasswordresetOtp = async (smsdata: { mobile_number: string }) => {
    const { mobile_number } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/otp/send`;
    const data = {
      api_key: process.env.TERMIIKEY,
      message_type: "ALPHANUMERIC",
      to: `${mobile_number}`,
      from: "N-Alert",
      channel: "dnd",
      pin_attempts: 10,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: "<>",
      message_text: `Your Opticcs Password reset code is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
      pin_type: "NUMERIC",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  confirmpasswordresetOtp = async (smsdata: { otp: string; pinId: string }) => {
    const { otp, pinId } = smsdata;
    var data = {
      api_key: process.env.TERMIIKEY,
      pin_id: pinId,
      pin: otp,
    };
    const url = `https://api.ng.termii.com/api/sms/otp/verify`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  verifyPhone = async ({ phone }: { phone: string }) => {
    const apiKey = process.env.TERMIIKEY;
    const phoneNumber = phone;
    const countryCode = "NG";

    const queryParams = new URLSearchParams({
      api_key: apiKey ?? "",
      phone_number: phoneNumber,
      country_code: countryCode,
    });

    const url = `https://v3.api.termii.com/api/insight/number/query?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch phone verification");
      }
      const res = await response.json();
      console.log(res);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  async scheduledvisitSMSforPatient(smsdata: Scheduledvisit) {
    const {
      mobile_number,
      firstname,
      lastname,
      day,
      date,
      healthfacilityname,
    } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/send`;

    const data = {
      api_key: process.env.TERMIIKEY,
      type: "plain",
      to: `${mobile_number}`,
      from: "opticcs",
      channel: "generic",
      sms: `${firstname} ${lastname} you have been scheduled for antenatal visit on ${day} ${date} at ${healthfacilityname}`,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async scheduledvisitmissedSMSforPatient(smsdata: Scheduledvisit) {
    const {
      mobile_number,
      firstname,
      lastname,
      day,
      date,
      healthfacilityname,
    } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/send`;

    const data = {
      api_key: process.env.TERMIIKEY,
      type: "plain",
      to: `${mobile_number}`,
      from: "opticcs",
      channel: "generic",
      sms: `${firstname} ${lastname} You missed your scheduled antenatal visit on ${day}, ${date} at ${healthfacilityname}`,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async scheduledvisitreminderSMSforPatient(smsdata: Scheduledvisitreminder) {
    const {
      mobile_number,
      firstname,
      lastname,
      date,
      healthfacilityname,
      state,
    } = smsdata;
    const url = `https://api.ng.termii.com/api/sms/send`;

    const data = {
      api_key: process.env.TERMIIKEY,
      type: "plain",
      to: `${mobile_number}`,
      from: "opticcs",
      channel: "generic",
      sms: `Hello ${firstname} ${lastname}, this is to remind you of your scheduled antenatal visit tomorrow ${date} at ${healthfacilityname} health facility in ${state} state`,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}
