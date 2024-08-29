"use client";
import React, { useState } from "react";
import { CustomButton, FormField } from "@/components";
import Image from "next/image";
import { useStateContext } from "@/context";

const Page = () => {
  const { createCampaign, contract } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { title, description, target, deadline, image } = form;

    try {
      console.log("Creating campaign with: ", form)
      await createCampaign(title, description, target, new Date(deadline).getTime(), image);
      console.log("Campaign created successfully");
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader...."}
      <div className="flex flex-col justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name"
            placeholder="Enter Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />

          <FormField
            labelName="Campaign Title"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story"
          placeholder="Write your story behind the campaign"
          inputType="text"
          isTextArea={true}
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <Image
            src="/money.svg"
            width={50}
            height={50}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal"
            placeholder="EDU 0.05"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date"
            placeholder=""
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        <div className="flex justify-center mt-[40px] items-center">
          <CustomButton
            btnType={"submit"}
            title="Submit New Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
