import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserData, setStep, setData } from "../redux/userSlice";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";

const UserRegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { step, userData, storeData } = useSelector(
    (state: RootState) => state.user
  );
  console.log(userData, "userData");

  const handleSubmitStep1 = (data: any) => {
    dispatch(setData(data));
    dispatch(setStep(2));
  };

  const handleSubmitStep2 = (data: any) => {
    let payload = {
      ...storeData,
      address: data?.address,
      state: data?.state,
      city: data?.city,
      country: data?.country,
      pincode: data?.pincode,
    };
    dispatch(setUserData([...userData, payload]));
    dispatch(setStep(1));
  };

  return (
    <div>
      {step === 1 && <Step1Form onSubmit={handleSubmitStep1} />}
      {step === 2 && <Step2Form onSubmit={handleSubmitStep2} />}
    </div>
  );
};

export default UserRegistrationForm;
