"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Input,
  Textarea,
  Button,
  Avatar,
  Autocomplete,
  AutocompleteItem,
  Select,
  Divider,
  SelectItem,
  Card,
  CardBody,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit, FaCamera } from "react-icons/fa";
import { regions } from "@/lib/constants";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";
import { updateFarmerDetails } from "@/services/farmportalService";
import { loginAction } from "@/services/authService";
import { Role } from "@prisma/client";
import axios from "axios";

interface FarmDetails {
  image: string;
  name: string;
  bio: string;
  about: string;
  region: string;
  town: string;
}

interface EditingState {
  name: boolean;
  bio: boolean;
  about: boolean;
  region: boolean;
  town: boolean;
  image: boolean;
  paystackSubAccountCode: boolean;
}

interface FarmerProfileProps {
  farmerDetails: {
    id: string;
    name: string;
    bio: string;
    region: string;
    about: string;
    town: string;
    image: string;
    paystackSubAccountCode: string | null;
  } | null;
  username: string;
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({
  farmerDetails,
  username,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<keyof EditingState | null>(
    null
  );
  const [farmDetails, setFarmDetails] = useState<FarmDetails>({
    image: farmerDetails?.image || "",
    name: farmerDetails?.name || "",
    bio: farmerDetails?.bio || "",
    about: farmerDetails?.about || "",
    region: farmerDetails?.region || "",
    town: farmerDetails?.town || "",
  });

  const [isEditing, setIsEditing] = useState<EditingState>({
    name: false,
    bio: false,
    about: false,
    region: false,
    town: false,
    image: false,
    paystackSubAccountCode: false,
  });

  const [paystackSubAccountCode, setPaystackSubAccountCode] = useState<
    string | null
  >(farmerDetails?.paystackSubAccountCode || null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [hasCreated, setHasCreated] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    async function loadBanks() {
      try {
        const response = await axios.get("/api/payment/banks");
        if (response.data.success) {
          setBanks(response.data.banks);
        } else {
          toast.error("Failed to load banks");
        }
      } catch (error) {
        toast.error("Error loading banks");
      }
    }
    loadBanks();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFarmDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (field: keyof EditingState) => {
    if (!farmerDetails) return;
    setIsLoading(true);
    setLoadingState(field);
    try {
      const updatedDetails = {
        [field]: farmDetails[field as keyof FarmDetails],
      };

      if (field === "paystackSubAccountCode" && paystackSubAccountCode) {
        updatedDetails.paystackSubAccountCode = paystackSubAccountCode;
      }

      const response = await updateFarmerDetails(
        farmerDetails?.id,
        updatedDetails
      );
      if (response.success) {
        toast.success("Details updated successfully");
        await loginAction(username, "123456", Role.FARMER, true);
        window.location.reload();
      } else {
        toast.error("Failed to update details");
      }
    } catch (error) {
      toast.error("An error occurred while updating details");
    } finally {
      setIsLoading(false);
      setLoadingState(null);
      if (field === "paystackSubAccountCode") {
        onOpenChange();
      }
      setHasCreated(false);
    }
  };

  const handleCancel = (field: keyof EditingState) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false,
    }));
  };

  const handlePaystackSubAccountCodeChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPaystackSubAccountCode(e.target.value);
  };

  const handleUpload = async (result: any) => {
    try {
      const imageUrl = result.info.secure_url;
      setFarmDetails((prevDetails) => ({
        ...prevDetails,
        image: imageUrl,
      }));
      setIsEditing((prevEditing) => ({
        ...prevEditing,
        image: true,
      }));
    } catch (error) {
      toast.error("Error uploading profile picture");
    }
  };

  const handleCreateSubaccount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/payment/subaccount", {
        businessName,
        bankCode,
        accountNumber,
      });

      if (response.data.success) {
        const subaccountCode = response.data.subaccountCode;
        setPaystackSubAccountCode(subaccountCode);
        setHasCreated(true);
        toast.success("Subaccount created successfully");
      } else {
        toast.error("Error creating subaccount");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error creating subaccount");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paystackSubAccountCode && hasCreated) {
      handleSave("paystackSubAccountCode");
    }
  }, [paystackSubAccountCode, hasCreated]);

  useEffect(() => {
    if (isEditing.image) {
      handleSave("image");
    }
  }, [isEditing.image]);

  return (
    <div className="p-6">
      <section className="mb-8">
        <h2 className="text-3xl text-gray-500 text-center font-bold mb-8">
          Profile Overview
        </h2>
        <div className="mb-4 flex flex-col items-center">
          <div className="relative">
            <Avatar
              src={farmDetails.image || ""}
              alt="Profile"
              className="mb-2 w-32 h-32 object-cover rounded-full"
            />
            {isLoading && loadingState === "image" ? (
              <div className="absolute bottom-0 right-0">
                <Spinner color="primary" size="sm" />
              </div>
            ) : (
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                className="absolute bottom-0 right-0"
              >
                <FaCamera className="text-xl cursor-pointer hover:opacity-75" />
              </CldUploadButton>
            )}
          </div>
        </div>
        {["name", "bio", "about", "region", "town"].map((field) => (
          <Card key={field} className="mb-4">
            <CardBody>
              <label className="font-semibold text-lg text-gray-500 mb-1 capitalize">
                {field}
              </label>
              <div
                className={`flex gap-2 items-start ${
                  isEditing[field as keyof EditingState]
                    ? "flex-col"
                    : "flex-row"
                }`}
              >
                {isEditing[field as keyof EditingState] ? (
                  <>
                    {field === "about" ? (
                      <Textarea
                        name={field}
                        value={farmDetails[field as keyof FarmDetails] || ""}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : field === "region" ? (
                      <Select
                        name={field}
                        selectedKeys={[
                          farmDetails[field as keyof FarmDetails] || "",
                        ]}
                        onSelectionChange={(keys: any) => {
                          setFarmDetails((prevDetails) => ({
                            ...prevDetails,
                            [field]: keys.currentKey,
                          }));
                        }}
                        fullWidth
                      >
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        name={field}
                        value={farmDetails[field as keyof FarmDetails] || ""}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    )}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSave(field as keyof EditingState)}
                        color="primary"
                        isLoading={isLoading && loadingState === field}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          handleCancel(field as keyof EditingState)
                        }
                        color="danger"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base font-medium flex-1">
                      {farmDetails[field as keyof FarmDetails]}
                    </p>
                    <FaEdit
                      className="cursor-pointer text-gray-500 hover:opacity-75"
                      size={20}
                      onClick={() =>
                        setIsEditing((prev) => ({ ...prev, [field]: true }))
                      }
                    />
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
      <Divider className="my-4" />
      <section className="mt-8">
        <p className="text-3xl text-gray-500 font-bold text-center mb-8">
          Payment Information
        </p>
        <Card className="mb-4">
          <CardBody>
            {paystackSubAccountCode ? (
              <div
                className={`flex w-full gap-2 items-start ${
                  isEditing.paystackSubAccountCode ? "flex-col" : "flex-row"
                }`}
              >
                {isEditing.paystackSubAccountCode ? (
                  <>
                    <Input
                      name="paystackAccountId"
                      value={paystackSubAccountCode || ""}
                      onChange={handlePaystackSubAccountCodeChange}
                      fullWidth
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSave("paystackSubAccountCode")}
                        color="primary"
                        isLoading={
                          isLoading && loadingState === "paystackSubAccountCode"
                        }
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => handleCancel("paystackSubAccountCode")}
                        color="danger"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base font-medium flex-1">
                      {paystackSubAccountCode}
                    </p>
                    {/* <FaEdit
                      className="cursor-pointer text-gray-500 hover:opacity-75"
                      size={20}
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          paystackSubAccountCode: true,
                        }))
                      }
                    /> */}
                  </>
                )}
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <Button
                  onClick={onOpen}
                  color="primary"
                  className="max-w-md"
                  fullWidth
                >
                  Add PayStack Sub Account
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add PayStack Sub Account</ModalHeader>
          <ModalBody>
            <Input
              label="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              fullWidth
            />
            <Autocomplete
              label="Bank"
              selectedKey={bankCode}
              onSelectionChange={(keys: any) => setBankCode(keys)}
              fullWidth
            >
              {banks.map((bank: any) => (
                <AutocompleteItem key={bank.code} value={bank.code}>
                  {bank.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Input
              label="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              fullWidth
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCreateSubaccount}
              color="primary"
              isLoading={isLoading}
              isDisabled={!businessName || !bankCode || !accountNumber}
            >
              Create Subaccount
            </Button>
            <Button onClick={onOpenChange} color="danger">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FarmerProfile;
